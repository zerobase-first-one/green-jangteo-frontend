import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IForm } from '../store/atom/userDataState';
import customAxios from '../apiFetcher/customAxios';

export default function useGetUserProfile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<IForm>();

  const fetchUserInfo = async () => {
    const response = await customAxios.get(`/users/${userId}`);
    setUserInfo(response.data);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { userInfo };
}
