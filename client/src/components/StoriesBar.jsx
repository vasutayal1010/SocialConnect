import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStories from "../hooks/useStories";
import StoryViewer from "./StoryViewer"; // Modal for fullscreen viewing

const StoriesBar = () => {
  const { fetchStories } = useStories();
  const stories = useSelector((state) => state.stories.allStories);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="bg-white p-3 border rounded shadow w-full mb-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
        {stories.map((story) => (
          <div
            key={story._id}
            onClick={() => setSelectedStory(story)}
            className="cursor-pointer text-center min-w-[70px]"
          >
            <img
              src={story.user.profilePic}
              className="w-14 h-14 rounded-full border-2 border-pink-600 mx-auto"
              alt="Story"
            />
            <p className="text-sm mt-1 truncate">{story.user.username}</p>
          </div>
        ))}
      </div>

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );

};

export default StoriesBar;
