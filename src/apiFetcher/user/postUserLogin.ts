import customAxios from '../customAxios';

interface ILogin {
  emailOrUsername: string;
  password: string;
}

export const postUserLogin = async ({ emailOrUsername, password }: ILogin) => {
  const data = { emailOrUsername, password };

  try {
    const response = await customAxios.post(`/users/login`, data);
    const { token, userId, roleDescriptions } = response.data;
    return { token, userId, roleDescriptions };
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};
