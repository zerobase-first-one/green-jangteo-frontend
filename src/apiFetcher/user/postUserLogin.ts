import axios from "axios";

interface ILogin {
  emailOrUsername: string;
  password: string;
}

export const postUserLogin = async ({ emailOrUsername, password }: ILogin) => {
  const data = { emailOrUsername, password };

  try {
    const response = await axios.post(`/users/login`, data);
    const { token, userId } = response.data;
    console.log(response);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { token, userId };
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error;
  }
};
