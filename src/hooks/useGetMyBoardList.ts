import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import { postState } from '../store/atom/postState';
import customAxios from '../apiFetcher/customAxios';

export default function useGetMyBoardList() {
  const userId = useRecoilValue(userIdState);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postState);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customAxios.get(`/posts/my`, {
        params: { userId, page, paged: true, size: 4, sort: 'createdAt,desc' },
      });
      const postData = response.data || [];
      console.log(postData);
      setPosts(postData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, page]);

  return { isLoading, posts, setPage, page };
}
