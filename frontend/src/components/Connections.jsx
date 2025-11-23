import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";
import Chat from "./Chat.jsx";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
     
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Filter connections based on search
  const filteredConnections = connections?.filter(connection =>
    connection.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.about?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-8">
        <div className="container mx-auto px-4">
        
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Connections</h1>
            <p className="text-gray-600">Loading your network...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-full p-8 inline-block mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">No Connections Yet</h1>
              <p className="text-gray-600 text-lg mb-8">
                Start connecting with other developers by exploring the feed and sending connection requests!
              </p>
              <Link to="/feed">
                <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Explore Feed
                </button>
              </Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Connections</h1>
          <p className="text-gray-600 text-lg">
            Your network of {connections.length} developer{connections.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-900 px-6 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pl-12 shadow-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Connection Count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {filteredConnections.length} of {connections.length} connections
            </p>
          </div>
        )}

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => {
            console.log(connection);
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;

            const handleImageError = (e) => {
              const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
              e.target.src = `https://placehold.co/200x200/f3f4f6/6b7280?text=${initials}`;
              e.target.onerror = null;
            };

            return (
              <div
                key={_id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                      src={photoUrl}
                      onError={handleImageError}
                    />
                    <div>
                      <h2 className="font-bold text-xl text-gray-900">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <p className="text-pink-500 text-sm">
                          {age} years • {gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                {about && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {about}
                    </p>
                  </div>
                )}

                {/* Skills (if available) */}
                {skills && skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-pink-500/20 text-pink-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link 
                  
                    to={`/chat/${_id}`} 
                    className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>chat</span>
                    </div>
                  </Link>
                  
                  <Link 
                    to={`/profile/${_id}`} 
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl text-center hover:bg-gray-300 transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>View</span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results for search */}
        {searchTerm && filteredConnections.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-gray-200">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">
                No connections match "{searchTerm}". Try a different search term.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;