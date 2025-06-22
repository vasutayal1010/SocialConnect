import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  const BACKEND_URI = "http//:localhost8000";
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URI}/api/v1/post/all`,
          { withCredentials: true }
        );
        if (res.data.success) {
          console.log(res.data.posts);
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;
