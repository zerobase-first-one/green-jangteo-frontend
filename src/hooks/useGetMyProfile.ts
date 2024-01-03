import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';
import { useRecoilState } from 'recoil';
import { userDataState } from '../store/atom/userDataState';

export const useGetMyProfile = () => {
  const { userId } = useParams();
  const [myInfo, setMyInfo] = useRecoilState(userDataState);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await customAxios.get(`/users/${userId}/profile`);

        setMyInfo({
          username: response.data.username || '',
          city: response.data.addressDto.city || '',
          detailedAddress: response.data.addressDto.detailedAddress || '',
          street: response.data.addressDto.street || '',
          zipcode: response.data.addressDto.zipcode || '',
          isLoading: false,
        });
      } catch (error) {
        console.error('사용자 프로필을 불러오는 중 오류 발생:', error);

        setMyInfo({
          username: '',
          city: '',
          detailedAddress: '',
          street: '',
          zipcode: '',
          isLoading: false,
        });
      }
    };

    if (!userId) {
      return;
    }

    getData();
  }, [userId]);

  return myInfo;
};
