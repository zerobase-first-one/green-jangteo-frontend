import axios from 'axios';
import { IAddressDto } from '../store/atom/userDataState';

interface IChangeAddress {
  userId: string;
  addressDto: IAddressDto;
  navigate: (path: string) => void;
}

export const changeAddress = async ({
  userId,
  addressDto,
  navigate,
}: IChangeAddress) => {
  const data = { userId, addressDto, navigate };

  try {
    const response = await axios.patch(`/users/${userId}/address`, data);
    if (response.status === 204) {
      alert('주소가 성공적으로 변경되었습니다.');
      navigate(`/users/${userId}/profile`);
    }
  } catch (error) {
    console.error('주소 변경 시 에러가 발생했습니다:', error);
  }
};
