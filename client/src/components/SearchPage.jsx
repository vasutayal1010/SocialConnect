import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "sonner";
import {
  addFollowingToUser,
  removeFollowingFromUser,
  setAuthUser,
} from "../redux/authSlice";
import { Button } from "./ui/button";

const BACKEND_URI = "http://localhost:8000";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BACKEND_URI}/api/v1/user/search?query=${query}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const filtered = res.data.users.filter((u) => u._id !== user._id);
        setResults(filtered);
      }
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URI}/api/v1/user/suggested`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const filtered = res.data.users.filter((u) => u._id !== user._id);
        setSuggestedUsers(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowToggle = async (targetUserId) => {
    try {
      const res = await axios.post(
        `${BACKEND_URI}/api/v1/user/follow/${targetUserId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        const isFollowing = user.following.includes(targetUserId);
        if (isFollowing) {
          dispatch(removeFollowingFromUser(targetUserId));
        } else {
          dispatch(addFollowingToUser(targetUserId));
        }
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Follow action failed");
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const debounce = setTimeout(() => {
        searchUsers();
      }, 500);
      return () => clearTimeout(debounce);
    } else {
      setResults([]);
    }
  }, [query]);

  const renderUserCard = (u) => {
    const isFollowing = user.following.includes(u._id);
    return (
      <div
        key={u._id}
        className="flex items-center justify-between py-3 border-b"
      >
        <div className="flex items-center gap-4">
          <Link to={`/profile/${u._id}`}>
            <Avatar>
              <AvatarImage src={u.profilePicture} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/profile/${u._id}`}>
              <h2 className="font-semibold hover:underline">{u.username}</h2>
            </Link>
            <p className="text-sm text-gray-600">{u.bio || "No bio yet"}</p>
            <div className="text-xs text-gray-500 mt-1">
              <span>{u.followers.length} followers</span> ·{" "}
              <span>{u.following.length} following</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => handleFollowToggle(u._id)}
          variant={isFollowing ? "secondary" : "default"}
          className="text-sm px-4 py-1"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto my-10 px-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search users..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="text-center text-gray-500">Searching...</p>}

      {!query && suggestedUsers.length > 0 && (
        <div className="mb-4">
          <h2 className="text-gray-700 font-semibold mb-2">Suggested Users</h2>
          {suggestedUsers.map(renderUserCard)}
        </div>
      )}

      {query && results.length > 0 && (
        <div>
          <h2 className="text-gray-700 font-semibold mb-2">Search Results</h2>
          {results.map(renderUserCard)}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-center text-gray-400">No users found.</p>
      )}
    </div>
  );
};

export default SearchPage;
