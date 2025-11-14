import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

// --- Icons for the NavBar ---
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
// --- End Icons ---

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      dispatch(removeUser());
      navigate("/");
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <nav className="w-full bg-gray-800 border-b border-gray-700 shadow-lg z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/feed" className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              TechBuddy
            </span>
          </Link>
          <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse"></div>
        </div>
      </nav>
    );
  }

  const onPhotoError = (e) => {
    const initials = user.firstName?.charAt(0) + user.lastName?.charAt(0) || 'U';
    e.target.src = `https://placehold.co/40x40/60a5fa/ffffff?text=${initials}`;
    e.target.onerror = null;
  };

  return (
    <nav className="w-full bg-gray-800 border-b border-gray-700 shadow-lg z-50 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/feed" className="text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                TechBuddy
              </span>
            </Link>
          </div>

          {/* Main Nav Links - Hidden on small screens */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/feed" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Feed
            </Link>
            <Link to="/connections" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Connections
            </Link>
            <Link to="/requests" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Requests
            </Link>
            <Link to="/premium" className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-bold transition-colors">
              Premium
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-700"
                  src={user.photoUrl}
                  alt="User avatar"
                  onError={onPhotoError}
                />
                <span className="hidden md:block ml-3 text-gray-300 font-medium">
                  {user.firstName}
                </span>
                <ChevronDownIcon className="hidden md:block w-4 h-4 ml-1 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="py-1" role="none">
                    <div className="px-4 py-3 border-b border-gray-600">
                      <p className="text-sm text-white font-medium truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email || 'No email provided'}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center text-gray-300 hover:bg-gray-600 hover:text-white px-4 py-3 text-sm"
                      role="menuitem"
                    >
                      <UserIcon className="w-5 h-5 mr-3" />
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full text-left text-red-400 hover:bg-red-500/20 hover:text-red-300 px-4 py-3 text-sm"
                      role="menuitem"
                    >
                      <LogoutIcon className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Nav Links - Hidden on medium+ screens */}
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around items-center px-2 py-2 space-x-1">
            <Link to="/feed" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Feed
            </Link>
            <Link to="/connections" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Connections
            </Link>
            <Link to="/requests" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Requests
            </Link>
            <Link to="/premium" className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-bold transition-colors">
              Premium
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;