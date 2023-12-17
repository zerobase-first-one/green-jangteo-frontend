import axios from 'axios';

interface IChangePhone {
  userId: string;
  password: string;
  phone: string;
  navigate: (path: string) => void;
}

export const changePhone = async ({
  userId,
  password,
  phone,
  navigate,
}: IChangePhone) => {
  const data = { password, phone };

  try {
    const response = await axios.patch(`/users/${userId}/phone`, data);

    if (response.status === 204) {
      alert('전화번호가 성공적으로 변경되었습니다.');
      navigate(`/users/${userId}/profile`);
    }
  } catch (error) {
    console.error('전화번호 변경 시 에러가 발생했습니다:', error);
  }
};
