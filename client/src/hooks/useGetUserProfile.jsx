import { setUserProfile } from "../redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  // const [userProfile, setUserProfile] = useState(null);
  const BACKEND_URI = "http://localhost:8000";
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URI}/api/v1/user/${userId}/profile`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [userId]);
};
export default useGetUserProfile;
