const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$$$$$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173", // Ensure this matches your frontend URL
    },
  });

  // Store active calls
  const activeCalls = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " joined Room : " + roomId);
      socket.join(roomId);
      
      // Store user info for video calls
      socket.userId = userId;
      socket.targetUserId = targetUserId;
      socket.roomId = roomId;
      socket.firstName = firstName; // Fix: Saving name so it can be sent in calls
    });

    // Video Call Signaling Events
    socket.on("video-call-offer", ({ offer, targetUserId }) => {
      const roomId = getSecretRoomId(socket.userId, targetUserId);
      
      // Store call info
      activeCalls.set(roomId, {
        caller: socket.userId,
        callee: targetUserId,
        status: 'ringing'
      });

      // Send offer to the target user
      socket.to(roomId).emit("incoming-video-call", {
        offer,
        callerId: socket.userId,
        callerName: socket.firstName || "Unknown User" // Fallback added
      });
    });

    socket.on("video-call-answer", ({ answer, callerId }) => {
      const roomId = getSecretRoomId(callerId, socket.userId);
      
      // Update call status
      if (activeCalls.has(roomId)) {
        activeCalls.get(roomId).status = 'connected';
      }

      // Send answer back to caller
      socket.to(roomId).emit("video-call-answered", {
        answer,
        calleeId: socket.userId
      });
    });

    socket.on("ice-candidate", ({ candidate, targetUserId }) => {
      const roomId = getSecretRoomId(socket.userId, targetUserId);
      
      // Forward ICE candidate to the other user
      socket.to(roomId).emit("ice-candidate", {
        candidate,
        senderId: socket.userId
      });
    });

    socket.on("end-call", ({ targetUserId }) => {
      const roomId = getSecretRoomId(socket.userId, targetUserId);
      
      // Remove call from active calls
      activeCalls.delete(roomId);
      
      // Notify the other user
      socket.to(roomId).emit("call-ended", {
        endedBy: socket.userId
      });
    });

    socket.on("reject-call", ({ callerId }) => {
      const roomId = getSecretRoomId(callerId, socket.userId);
      
      // Remove call from active calls
      activeCalls.delete(roomId);
      
      // Notify caller
      socket.to(roomId).emit("call-rejected", {
        rejectedBy: socket.userId
      });
    });

    // Chat Message Handler
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " sent: " + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          
          const savedMessage = chat.messages[chat.messages.length - 1];

          socket.to(roomId).emit("messageReceived", { 
            senderId: userId,
            firstName, 
            lastName, 
            text: savedMessage.text,
            timestamp: savedMessage.createdAt
          });
          
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      
      // Clean up active calls when user disconnects
      if (socket.roomId && activeCalls.has(socket.roomId)) {
        const call = activeCalls.get(socket.roomId);
        socket.to(socket.roomId).emit("call-ended", {
          endedBy: socket.userId,
          reason: "user_disconnected"
        });
        activeCalls.delete(socket.roomId);
      }
    });
  });
};

module.exports = initializeSocket;