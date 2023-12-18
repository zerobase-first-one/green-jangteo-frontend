import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';

export const useGetProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>({
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
        const userProfile = response.data;

        setUserData({
          username: userProfile.username || '',
          address: userProfile.addressDto || {
            city: '',
            detailedAddress: '',
            street: '',
            zipcode: '',
          },
          createdAt: userProfile.createdAt || '',
          email: userProfile.email || '',
          fullName: userProfile.fullName || '',
          modifiedAt: userProfile.modifiedAt || '',
          phone: userProfile.phone || '',
          roles: userProfile.roles || [],
          loading: false,
        });
      } catch (error) {
        console.error('사용자 프로필을 불러오는 중 오류 발생:', error);
        // console.log('error.config:', error.config);
        // console.log('error.request:', error.request);
        // console.log('error.response:', error.response);

        setUserData({
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

  return userData;
};
