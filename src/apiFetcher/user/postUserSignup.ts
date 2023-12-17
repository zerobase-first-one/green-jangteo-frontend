import axios from 'axios';
import { IForm } from '../../store/atom/userDataState';

export const postUserSignup = async (userData: IForm) => {
  try {
    const response = await axios.post(`/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};
