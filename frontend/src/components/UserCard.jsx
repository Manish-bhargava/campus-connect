// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
//   const dispatch = useDispatch();

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(userId));
//     } catch (err) {}
//   };

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl">
//       <figure>
//         <img src={user.photoUrl} alt="photo" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p>{age + ", " + gender}</p>}
//         <p>{about}</p>
//         <div className="card-actions justify-center my-4">
//           <button
//             className="btn btn-primary"
//             onClick={() => handleSendRequest("ignored", _id)}
//           >
//             Ignore
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => handleSendRequest("interested", _id)}
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserCard;


// This is now a "dumb" UI component.
// It just receives data (user) and functions (onSendRequest) as props.
// const UserCard = ({ user, onSendRequest }) => {
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

//   // Fallback for missing images
//   const handleError = (e) => {
//     e.target.src = `https://placehold.co/600x400/1f2937/9ca3af?text=${firstName.charAt(0)}`;
//     e.target.onerror = null;
//   };

//   return (
//     <div className="max-w-md w-full bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden flex flex-col transition-all duration-300">
      
//       {/* Card Image */}
//       <figure className="w-full h-80 overflow-hidden">
//         <img
//           src={photoUrl}
//           alt={`${firstName}'s profile picture`}
//           className="w-full h-full object-cover"
//           onError={handleError}
//         />
//       </figure>

//       {/* Card Body */}
//       <div className="p-6 flex flex-col flex-grow">
//         <h2 className="text-3xl font-bold text-white mb-1">
//           {firstName} {lastName}
//         </h2>

//         {age && gender && (
//           <p className="text-md text-blue-400 mb-4">
//             {age} years old · {gender}
//           </p>
//         )}

//         {/* Truncate long "about" text */}
//         <p className="text-gray-300 leading-relaxed mb-6 flex-grow line-clamp-3">
//           {about || "No bio provided."}
//         </p>

//         {/* Card Actions */}
//         <div className="grid grid-cols-2 gap-4">
//           <button
//             onClick={() => onSendRequest("ignored", _id)}
//             className="w-full px-4 py-3 bg-gray-700/50 text-gray-300 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-white"
//           >
//             Ignore
//           </button>
//           <button
//             onClick={() => onSendRequest("interested", _id)}
//             className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-lg shadow-blue-500/20"
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
const UserCard = ({ user, onSendRequest }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, bio, headline, currentRole } = user;

  // Fallback for missing images
  const handleError = (e) => {
    e.target.src = `https://placehold.co/600x400/f3f4f6/6b7280?text=${firstName?.charAt(0) || 'U'}`;
    e.target.onerror = null;
  };

  // Use bio if available, otherwise fall back to about
  const userBio = bio || about;

  return (
    <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-3xl hover:scale-105">
      
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold truncate">
              {firstName} {lastName}
            </h2>
            {(headline || currentRole) && (
              <p className="text-white/90 text-sm truncate mt-1">
                {headline || currentRole}
              </p>
            )}
          </div>
          {(age || gender) && (
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {age && `${age} · `}{gender}
            </div>
          )}
        </div>
      </div>

      {/* Card Image */}
      <figure className="w-full h-72 overflow-hidden relative">
        <img
          src={photoUrl}
          alt={`${firstName}'s profile picture`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={handleError}
        />
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
      </figure>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        {/* Bio/About Section */}
        <div className="mb-6 flex-grow">
          <p className="text-gray-700 leading-relaxed line-clamp-4 text-sm">
            {userBio || "No bio provided yet. This developer is ready to connect and collaborate!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSendRequest("ignored", _id)}
            className="group px-4 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 hover:shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Pass</span>
            </div>
          </button>
          
          <button
            onClick={() => onSendRequest("interested", _id)}
            className="group px-4 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl transition-all duration-300 hover:from-pink-600 hover:to-orange-600 hover:shadow-2xl shadow-lg shadow-pink-500/25 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Connect</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>💼 TechBuddy</span>
            <span>✨ Find your match</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;