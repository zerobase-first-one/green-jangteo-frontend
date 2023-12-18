import { IForm } from '../../store/atom/userDataState';
import customAxios from '../customAxios';

export const postUserSignup = async (userData: IForm) => {
  try {
    const response = await customAxios.post(`/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};
