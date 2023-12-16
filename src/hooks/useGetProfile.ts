import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom/auth";

export const useGetProfile = () => {
  const { userId } = useParams();
  const token = useRecoilValue(tokenState);
  const [userData, setUserData] = useState({
    username: "",
    userId: userId || null,
    loading: true,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/users/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          username: response.data.fullName,
          userId,
          loading: false,
        });
      } catch (error) {
        console.error("사용자 프로필을 불러오는 중 오류 발생:", error);
        setUserData({
          username: "",
          userId,
          loading: false,
        });
      }
    };

    if (!userId) {
      return;
    }

    getData();
  }, [userId, token]);

  return userData;
};
