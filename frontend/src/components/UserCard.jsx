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
const UserCard = ({ user, onSendRequest }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  // Fallback for missing images
  const handleError = (e) => {
    e.target.src = `https://placehold.co/600x400/1f2937/9ca3af?text=${firstName.charAt(0)}`;
    e.target.onerror = null;
  };

  return (
    <div className="max-w-md w-full bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden flex flex-col transition-all duration-300">
      
      {/* Card Image */}
      <figure className="w-full h-80 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName}'s profile picture`}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </figure>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-3xl font-bold text-white mb-1">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-md text-blue-400 mb-4">
            {age} years old · {gender}
          </p>
        )}

        {/* Truncate long "about" text */}
        <p className="text-gray-300 leading-relaxed mb-6 flex-grow line-clamp-3">
          {about || "No bio provided."}
        </p>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSendRequest("ignored", _id)}
            className="w-full px-4 py-3 bg-gray-700/50 text-gray-300 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-white"
          >
            Ignore
          </button>
          <button
            onClick={() => onSendRequest("interested", _id)}
            className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-lg shadow-blue-500/20"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
