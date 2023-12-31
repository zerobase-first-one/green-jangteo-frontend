import customAxios from './customAxios';

interface IChangePassword {
  userId: string;
  currentPassword: string;
  passwordToChange: string;
  passwordToChangeConfirm: string;
  navigate: (path: string) => void;
}

export const changePassword = async ({
  userId,
  currentPassword,
  passwordToChange,
  passwordToChangeConfirm,
  navigate,
}: IChangePassword) => {
  const data = { currentPassword, passwordToChange, passwordToChangeConfirm };

  try {
    if (passwordToChange !== passwordToChangeConfirm) {
      alert('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    const response = await customAxios.patch(`/users/${userId}/password`, data);

    if (response.status === 204) {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/users/login');
    }
  } catch (error) {
    console.error('비밀번호 변경 시 에러가 발생했습니다:', error);
  }
};
