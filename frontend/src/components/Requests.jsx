import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  const reviewRequest = async (status, requestId, fromUserId) => {
    try {
      setProcessingIds(prev => new Set(prev).add(requestId));
      
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Failed to process request:", err);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Connection Requests</h1>
            <p className="text-gray-600">Loading your requests...</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-gray-300 rounded flex-1"></div>
                  <div className="h-10 bg-gray-300 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-full p-8 inline-block mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">No Pending Requests</h1>
              <p className="text-gray-600 text-lg mb-8">
                You're all caught up! When someone sends you a connection request, it will appear here.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={fetchRequests}
                  className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-300"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Connection Requests</h1>
          <p className="text-gray-600 text-lg">
            You have {requests.length} pending request{requests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;
            const isProcessing = processingIds.has(request._id);

            const handleImageError = (e) => {
              const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
              e.target.src = `https://placehold.co/200x200/f3f4f6/6b7280?text=${initials}`;
              e.target.onerror = null;
            };

            return (
              <div
                key={request._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
              >
                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mx-auto mb-2"></div>
                      <p className="text-gray-700 text-sm">Processing...</p>
                    </div>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                    src={photoUrl}
                    onError={handleImageError}
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-xl text-gray-900 mb-1">
                      {firstName} {lastName}
                    </h2>
                    {(age || gender) && (
                      <p className="text-pink-500 text-sm mb-2">
                        {age && `${age} years`}{age && gender && ' • '}{gender}
                      </p>
                    )}
                    {about && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skills (if available) */}
                {skills && skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-pink-500/20 text-pink-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 4 && (
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Request Time (if available) */}
                <div className="mb-4">
                  <p className="text-gray-500 text-xs">
                    Sent {new Date().toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => reviewRequest("rejected", request._id, request.fromUserId._id)}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none transition-all duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Decline</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => reviewRequest("accepted", request._id, request.fromUserId._id)}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none transition-all duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Accept</span>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchRequests}
            className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-300"
          >
            Refresh Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requests;