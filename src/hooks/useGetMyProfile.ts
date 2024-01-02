import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';

export const useGetMyProfile = () => {
  const { userId } = useParams();
  const [myInfo, setMyInfo] = useState<any>({
    username: '',
    address: {
      city: '',
      detailedAddress: '',
      street: '',
      zipcode: '',
    },
    createdAt: '',
    email: '',
    fullName: '',
    modifiedAt: '',
    phone: '',
    roles: [],
    loading: true,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await customAxios.get(`/users/${userId}/profile`);

        setMyInfo({
          username: response.data.username || '',
          address: response.data.addressDto || {
            city: '',
            detailedAddress: '',
            street: '',
            zipcode: '',
          },
          createdAt: response.data.createdAt || '',
          email: response.data.email || '',
          fullName: response.data.fullName || '',
          modifiedAt: response.data.modifiedAt || '',
          phone: response.data.phone || '',
          roles: response.data.roles || [],
          loading: false,
        });
      } catch (error) {
        console.error('사용자 프로필을 불러오는 중 오류 발생:', error);

        setMyInfo({
          username: '',
          address: {
            city: '',
            detailedAddress: '',
            street: '',
            zipcode: '',
          },
          createdAt: '',
          email: '',
          fullName: '',
          modifiedAt: '',
          phone: '',
          roles: [],
          loading: false,
        });
      }
    };

    if (!userId) {
      return;
    }

    getData();
  }, []);

  return { myInfo };
};
