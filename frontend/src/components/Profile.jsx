import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((store) => store.user);
  
  if (!user) {
    // This should ideally be handled by your protected route,
    // but it's good practice to have a fallback.
    return (
      <div className="text-center text-gray-400">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 font-inter p-4 md:p-8 selection:bg-blue-500 selection:text-white">
      <EditProfile user={user} />
    </div>
  );
};
export default ProfilePage;

