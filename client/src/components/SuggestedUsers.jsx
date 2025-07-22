// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// const SuggestedUsers = () => {
//   const { suggestedUsers } = useSelector((store) => store.auth);
//   return (
//     <div className="my-10">
//       <div className="flex items-center justify-between text-sm">
//         <h1 className="font-semibold text-gray-600">Suggested for you</h1>
//         <span className="font-medium cursor-pointer"> </span>
//       </div>
//       {suggestedUsers.map((user) => {
//         return (
//           <div
//             key={user._id}
//             className="flex items-center justify-between my-5"
//           >
//             <div className="flex items-center gap-2">
//               <Link to={`/profile/${user?._id}`}>
//                 <Avatar>
//                   <AvatarImage src={user?.profilePicture} alt="post_image" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </Link>
//               <div>
//                 <h1 className="font-semibold text-sm">
//                   <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
//                 </h1>
//                 <span className="text-gray-600 text-sm">
//                   {user?.bio || "Bio here..."}
//                 </span>
//               </div>
//             </div>
//             <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]">
//               Follow
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SuggestedUsers;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   setAuthUser,
//   addFollowingToUser,
//   removeFollowingFromUser,
// } from "../redux/authSlice";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// const SuggestedUsers = () => {
//   const dispatch = useDispatch();
//   const { suggestedUsers, user } = useSelector((store) => store.auth);

//   const handleFollowToggle = async (targetUserId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/user/follow/${targetUserId}`,
//         {},
//         { withCredentials: true }
//       );

//       const { updatedUser } = res.data;

//       // Update global auth user
//       dispatch(setAuthUser(updatedUser));

//       // Also update following in case you're using it elsewhere
//       if (user.following.includes(targetUserId)) {
//         dispatch(removeFollowingFromUser(targetUserId));
//       } else {
//         dispatch(addFollowingToUser(targetUserId));
//       }
//     } catch (error) {
//       console.error(
//         "Follow toggle failed:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   return (
//     <div className="my-10">
//       <div className="flex items-center justify-between text-sm">
//         <h1 className="font-semibold text-gray-600">Suggested for you</h1>
//       </div>
//       {suggestedUsers.map((userItem) => {
//         const isFollowing = user.following?.some(
//           (id) => id === userItem._id || id._id === userItem._id
//         );

//         return (
//           <div
//             key={userItem._id}
//             className="flex items-center justify-between my-5"
//           >
//             <div className="flex items-center gap-2">
//               <Link to={`/profile/${userItem._id}`}>
//                 <Avatar>
//                   <AvatarImage src={userItem.profilePicture} alt="profile" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </Link>
//               <div>
//                 <h1 className="font-semibold text-sm">
//                   <Link to={`/profile/${userItem._id}`}>
//                     {userItem.username}
//                   </Link>
//                 </h1>
//                 <span className="text-gray-600 text-sm">
//                   {userItem.bio || "Bio here..."}
//                 </span>
//               </div>
//             </div>
//             <button
//               onClick={() => handleFollowToggle(userItem._id)}
//               className={`text-xs font-bold hover:text-[#3495d6] ${
//                 isFollowing ? "text-red-500" : "text-[#3BADF8]"
//               }`}
//             >
//               {isFollowing ? "Unfollow" : "Follow"}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SuggestedUsers;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  setAuthUser,
  addFollowingToUser,
  removeFollowingFromUser,
} from "../redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const { suggestedUsers, user } = useSelector((store) => store.auth);

  if (!user || !suggestedUsers) {
    return null; // or show loading placeholder
  }

  const handleFollowToggle = async (targetUserId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/follow/${targetUserId}`,
        {},
        { withCredentials: true }
      );

      const { updatedUser } = res.data;
      dispatch(setAuthUser(updatedUser));

      if (user.following.includes(targetUserId)) {
        dispatch(removeFollowingFromUser(targetUserId));
      } else {
        dispatch(addFollowingToUser(targetUserId));
      }
    } catch (error) {
      console.error(
        "Follow toggle failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="my-10 bg-white shadow-lg rounded-xl p-5">
      <div className="flex items-center justify-between text-sm mb-4">
        <h1 className="font-semibold text-gray-800 text-lg">
          Suggested for you
        </h1>
      </div>

      {suggestedUsers.map((userItem) => {
        const isFollowing = user.following?.some(
          (id) => id === userItem._id || id._id === userItem._id
        );

        return (
          <div
            key={userItem._id}
            className="flex items-center justify-between py-3 border-b last:border-none"
          >
            <div className="flex items-center gap-3">
              <Link to={`/profile/${userItem._id}`}>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={userItem.profilePicture} alt="profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm text-gray-800">
                  <Link to={`/profile/${userItem._id}`}>
                    {userItem.username}
                  </Link>
                </h1>
                <span className="text-gray-500 text-xs">
                  {userItem.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleFollowToggle(userItem._id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md border transition-colors duration-200
                ${
                  isFollowing
                    ? "text-red-600 border-red-500 hover:bg-red-50"
                    : "text-blue-600 border-blue-500 hover:bg-blue-50"
                }
              `}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
};


export default SuggestedUsers;
