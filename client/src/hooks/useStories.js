import axios from "axios";
import { useDispatch } from "react-redux";
import { setStories, setLoading } from "../redux/storySlice";

const useStories = () => {
  const dispatch = useDispatch();

  const fetchStories = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get("http://localhost:8000/api/v1/user/stories", {
        withCredentials: true,
      });
      dispatch(setStories(data));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchStories };
};

export default useStories;
