import axios from "axios";

export const postUserSignup = async (userData) => {
  try {
    const response = await axios.post(`/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 에러:", error);

    if (error.response) {
      console.error("서버 응답 데이터:", error.response.data);
    }

    throw error;
  }
};
