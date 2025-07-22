import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "../hooks/useGetAllPost";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";
import UploadStory from "./uploadStory";
import StoriesBar from "./StoriesBar";
import LeftSidebar from "./LeftSidebar"; // Assuming you have this

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar (Optional) */}
      <div className="hidden md:block w-[250px] border-r">
        <LeftSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-3xl mx-auto px-4 py-4 space-y-6">
        <StoriesBar />
        <UploadStory />
        <Feed />
        <Outlet />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[300px]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
