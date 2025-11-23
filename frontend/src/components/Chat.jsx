import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  PaperAirplaneIcon,
  UserCircleIcon,
  CheckBadgeIcon,
  VideoCameraIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  // Video call states
  const [isInCall, setIsInCall] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStatus, setCallStatus] = useState('idle'); // idle, ringing, connected

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- CRITICAL FIX: Attach video streams when the UI renders ---
  useEffect(() => {
    if (isInCall) {
      // 1. Attach Local Stream
      const localVideo = document.getElementById('localVideo');
      if (localVideo && localStreamRef.current) {
        localVideo.srcObject = localStreamRef.current;
      }

      // 2. Attach Remote Stream (if exists)
      const remoteVideo = document.getElementById('remoteVideo');
      if (remoteVideo && remoteStreamRef.current) {
        remoteVideo.srcObject = remoteStreamRef.current;
      }
    }
  }, [isInCall]);
  // ------------------------------------------------------------

  const fetchChatMessages = async () => {
    setIsLoading(true);
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
  
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
       
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          timestamp: createdAt || new Date(),
          isOwn: senderId?._id === userId,
        };
      });
      setMessages(chatMessages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  // Video Call Functions
  const initializeSocketForCalls = () => {
    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }

    socketRef.current.on('incoming-video-call', (data) => {
      handleIncomingCall(data);
    });

    socketRef.current.on('video-call-answered', (data) => {
      handleCallAnswered(data);
    });

    socketRef.current.on('ice-candidate', (data) => {
      handleIceCandidate(data);
    });

    socketRef.current.on('call-ended', (data) => {
      handleCallEnded(data);
    });

    socketRef.current.on('call-rejected', (data) => {
      handleCallRejected(data);
    });

    return socketRef.current;
  };

  const createPeerConnection = async () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    const peerConnection = new RTCPeerConnection(configuration);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStreamRef.current);
      });
    }

    peerConnection.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
      const remoteVideo = document.getElementById('remoteVideo');
      if (remoteVideo) {
        remoteVideo.srcObject = remoteStreamRef.current;
      }
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          targetUserId: targetUserId
        });
      }
    };

    return peerConnection;
  };

  const startVideoCall = async () => {
    try {
      setIsCalling(true);
      setCallStatus('ringing');

      // 1. Get user media first
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      // 2. Set isInCall to true immediately to render the UI
      // The useEffect added above will handle attaching the stream to the video tag
      setIsInCall(true);

      // 3. Initialize socket and peer connection
      initializeSocketForCalls();
      peerConnectionRef.current = await createPeerConnection();

      // 4. Create and send offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socketRef.current.emit('video-call-offer', {
        offer,
        targetUserId: targetUserId
      });

    } catch (error) {
      console.error('Error starting video call:', error);
      alert('Failed to start video call. Check permissions.');
      endCall();
    }
  };

  const handleIncomingCall = (data) => {
    setIncomingCall({
      offer: data.offer,
      callerId: data.callerId,
      callerName: data.callerName || 'User'
    });
    setCallStatus('ringing');
  };

  const acceptCall = async () => {
    try {
      setIncomingCall(null);
      
      // 1. Get media
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      // 2. Show UI (useEffect will attach video stream)
      setIsInCall(true);
      setCallStatus('connected');

      // 3. Init connections
      initializeSocketForCalls();
      peerConnectionRef.current = await createPeerConnection();

      // 4. Handle signaling
      await peerConnectionRef.current.setRemoteDescription(incomingCall.offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socketRef.current.emit('video-call-answer', {
        answer,
        callerId: incomingCall.callerId
      });

    } catch (error) {
      console.error('Error accepting call:', error);
      alert('Failed to accept call.');
      endCall();
    }
  };

  const rejectCall = () => {
    if (socketRef.current && incomingCall) {
      socketRef.current.emit('reject-call', {
        callerId: incomingCall.callerId
      });
    }
    setIncomingCall(null);
    setCallStatus('idle');
  };

  const handleCallAnswered = async (data) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(data.answer);
      setCallStatus('connected');
    }
  };

  const handleIceCandidate = async (data) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.addIceCandidate(data.candidate);
    }
  };

  const handleCallEnded = (data) => {
    endCall();
    if (data.endedBy !== userId) {
      // alert('Call ended'); 
    }
  };

  const handleCallRejected = (data) => {
    endCall();
    alert('Call was rejected');
  };

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    remoteStreamRef.current = null;

    setIsInCall(false);
    setIsCalling(false);
    setIncomingCall(null);
    setCallStatus('idle');

    if (socketRef.current) {
      // Don't disconnect socket entirely as it breaks chat, just emit end event
      socketRef.current.emit('end-call', {
        targetUserId: targetUserId
      });
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
    }
  };

  // --- Main Socket Logic for Chat ---
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    initializeSocketForCalls();

    socket.on("messageReceived", ({ senderId, firstName, lastName, text, timestamp }) => {
      if (senderId === userId) return;
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          lastName,
          text,
          timestamp: timestamp || new Date(),
          isOwn: false,
        },
      ]);
    });

    socket.on("userOnline", () => setIsOnline(true));
    socket.on("userOffline", () => setIsOnline(false));

    return () => {
      socket.disconnect();
      endCall();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        text: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true,
      },
    ]);

    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const getTargetUserInfo = () => {
    if (messages.length === 0) return { name: "User", initials: "U" };
    const otherUserMsg = messages.find(msg => !msg.isOwn);
    if (otherUserMsg) {
      return {
        name: `${otherUserMsg.firstName} ${otherUserMsg.lastName}`,
        initials: getInitials(otherUserMsg.firstName, otherUserMsg.lastName)
      };
    }
    return { name: "User", initials: "U" };
  };

  const targetUser = getTargetUserInfo();

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      {/* Video Call UI */}
      {isInCall && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <video 
            id="remoteVideo" 
            autoPlay 
            playsInline
            className="flex-1 w-full h-full object-cover"
          />
          <video 
            id="localVideo" 
            autoPlay 
            muted 
            playsInline
            className="absolute bottom-4 right-4 w-48 h-36 rounded-lg border-2 border-white shadow-lg object-cover"
          />
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button onClick={toggleAudio} className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full">
              <PhoneIcon className="w-6 h-6" />
            </button>
            <button onClick={endCall} className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full">
              <PhoneIcon className="w-6 h-6" />
            </button>
            <button onClick={toggleVideo} className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full">
              <VideoCameraIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
            {callStatus === 'ringing' ? 'Ringing...' : 'Connected'}
          </div>
        </div>
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {getInitials(incomingCall.callerName.split(' ')[0], incomingCall.callerName.split(' ')[1] || '')}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Incoming Video Call</h3>
            <p className="text-gray-600 mb-6">{incomingCall.callerName} is calling you...</p>
            <div className="flex gap-4 justify-center">
              <button onClick={rejectCall} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" /> Decline
              </button>
              <button onClick={acceptCall} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2">
                <VideoCameraIcon className="w-5 h-5" /> Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {targetUser.initials}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{targetUser.name}</h2>
              <p className="text-sm text-gray-500">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isInCall && !incomingCall && (
              <button onClick={startVideoCall} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                <VideoCameraIcon className="w-5 h-5" /> Video Call
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${msg.isOwn ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
                    {!msg.isOwn && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {getInitials(msg.firstName, msg.lastName)}
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-2 shadow-sm ${msg.isOwn ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none border border-gray-200"}`}>
                      {!msg.isOwn && <p className="text-xs font-medium text-gray-600 mb-1">{msg.firstName} {msg.lastName}</p>}
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-400"}`}>
                        <span className="text-xs">{formatTime(msg.timestamp)}</span>
                        {msg.isOwn && <CheckBadgeIcon className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-4">
          <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className="w-full px-4 py-3 bg-transparent border-none resize-none focus:outline-none text-gray-800"
            />
          </div>
          <button onClick={sendMessage} disabled={!newMessage.trim()} className={`p-3 rounded-full transition-all ${newMessage.trim() ? "bg-blue-500 text-white hover:scale-105" : "bg-gray-300 text-gray-400"}`}>
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;