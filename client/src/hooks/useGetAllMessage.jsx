import { setMessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  const BACKEND_URI = "http//:localhost8000";
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URI}/${selectedUser?._id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, [selectedUser]);
};
export default useGetAllMessage;
