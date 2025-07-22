import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const StoryViewer = ({ story, onClose }) => {
  const loggedInUser = useSelector((state) => state.auth.user);

  if (!story) return null;

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8000/api/v1/user/deletestories", {
        data: { storyId: story._id }, // ✅ send storyId in body
        withCredentials: true,
      });
      alert("Story deleted");
      onClose();
    } catch (err) {
      console.error("Failed to delete story", err);
      alert("Failed to delete story");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative max-w-md w-full p-4 bg-gray-900 rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={story.user?.profilePic}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <p className="text-white text-lg font-semibold">
              {story.user?.username}
            </p>
          </div>

          {/* Story Image */}
          <img
            src={story.mediaUrl}
            alt="Story"
            className="max-h-[70vh] max-w-full rounded-lg object-contain"
          />

          {/* Delete Button (only for owner) */}
          {loggedInUser?._id === story.user?._id && (
            <button
              onClick={handleDelete}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
            >
              Delete Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
