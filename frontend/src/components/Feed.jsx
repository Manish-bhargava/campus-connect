import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

// Loading spinner component
const LoadingFeed = () => (
  <div className="flex flex-col items-center justify-center p-10 text-center min-h-[70vh]">
    <div className="relative">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-red-500 mb-6"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="h-8 w-8 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">Finding Tech Buddies...</h2>
    <p className="text-gray-400">Loading awesome developers near you</p>
  </div>
);

// Empty feed component
const EmptyFeed = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 min-h-[70vh]">
    <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-full p-8 mb-6 shadow-2xl">
      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
    <h1 className="text-4xl font-bold text-white mb-4">No More Profiles!</h1>
    <p className="text-xl text-gray-300 mb-6 max-w-md">
      You've seen all the developers in your area. Check back later for new connections!
    </p>
    <button 
      onClick={() => window.location.reload()}
      className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
    >
      Refresh Feed
    </button>
  </div>
);

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const [exitDirection, setExitDirection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getFeed = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Drag handlers for swipe functionality
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const swipeDistance = currentX;
    const swipeThreshold = 100;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - Interested
        handleSendRequest("interested", feed[0]._id);
      } else {
        // Swipe left - Ignore
        handleSendRequest("ignored", feed[0]._id);
      }
    }
    
    setIsDragging(false);
    setCurrentX(0);
  };

  const handleSendRequest = async (status, userId) => {
    setExitDirection(status === "ignored" ? "left" : "right");
    
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Error sending request:", err);
    }
  };

  const handleAnimationEnd = () => {
    if (feed && feed[0] && exitDirection) {
      dispatch(removeUserFromFeed(feed[0]._id));
      setExitDirection(null);
    }
  };

  // Loading State
  if (isLoading) {
    return <LoadingFeed />;
  }

  // Empty State
  if (!feed || feed.length === 0) {
    return <EmptyFeed />;
  }

  // Active State
  const currentUser = feed[0];
  const rotation = (currentX / 20); // Rotation based on drag
  const opacity = 1 - Math.min(Math.abs(currentX) / 300, 0.3); // Fade during drag

  const animationClass = exitDirection === "left" 
    ? "animate-swipe-left" 
    : exitDirection === "right" 
    ? "animate-swipe-right" 
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-full shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">TechBuddy</h1>
          </div>
          <div className="text-white">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {feed.length} {feed.length === 1 ? 'Profile' : 'Profiles'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card Area */}
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Action Buttons */}
          <div className="flex justify-center space-x-8 mb-8">
            <button
              onClick={() => handleSendRequest("ignored", currentUser._id)}
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transform hover:scale-110 transition-all duration-200"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button
              onClick={() => handleSendRequest("interested", currentUser._id)}
              className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200"
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transform hover:scale-110 transition-all duration-200"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* User Card with Drag */}
          <div className="relative">
            {/* Swipe Indicators */}
            {isDragging && (
              <>
                {currentX > 50 && (
                  <div className="absolute top-8 left-8 z-20 bg-green-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12 shadow-lg">
                    LIKE
                  </div>
                )}
                {currentX < -50 && (
                  <div className="absolute top-8 right-8 z-20 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 shadow-lg">
                    PASS
                  </div>
                )}
              </>
            )}

            {/* User Card */}
            <div
              className={`transform-gpu transition-transform duration-300 ${animationClass}`}
              style={{
                transform: `translateX(${currentX}px) rotate(${rotation}deg)`,
                opacity: opacity
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onAnimationEnd={handleAnimationEnd}
            >
              <UserCard
                user={currentUser}
                onSendRequest={handleSendRequest}
              />
            </div>

            {/* Next Card Preview */}
            {feed.length > 1 && (
              <div className="absolute top-4 -z-10 w-full h-full">
                <div className="bg-gray-800 rounded-2xl h-full transform scale-95 opacity-60 border-2 border-gray-700"></div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Swipe right to like • Swipe left to pass
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Or use the buttons above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;