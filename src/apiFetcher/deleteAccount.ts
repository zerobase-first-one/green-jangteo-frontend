import customAxios from './customAxios';

interface IDeleteAccount {
  userId: string;
  setUserId: (value: React.SetStateAction<string | null>) => void;
  password: string;
  navigate: (path: string) => void;
}

export const deleteAccount = async ({
  userId,
  setUserId,
  password,
  navigate,
}: IDeleteAccount) => {
  try {
    const response = await customAxios.delete(`/users/${userId}`, {
      data: { password },
    });
    if (response.status === 204) {
      alert('회원탈퇴가 완료되었습니다.');
      localStorage.removeItem('token');
      setUserId(null);
      navigate('/');
    }
  } catch (error) {
    console.error('회원탈퇴 시 에러가 발생했습니다:', error);
  }
};
