import customAxios from './customAxios';

interface IChangeAddress {
  userId: string;
  city: string;
  detailedAddress: string;
  street: string;
  zipcode: string;
  navigate: (path: string) => void;
}

export const changeAddress = async ({
  userId,
  city,
  detailedAddress,
  street,
  zipcode,
  navigate,
}: IChangeAddress) => {
  const data = { userId, city, detailedAddress, street, zipcode, navigate };

  try {
    const response = await customAxios.patch(`/users/${userId}/address`, data);
    if (response.status === 204) {
      alert('주소가 성공적으로 변경되었습니다.');
      navigate(`/users/${userId}/profile`);
    }
  } catch (error) {
    console.error('주소 변경 시 에러가 발생했습니다:', error);
  }
};
