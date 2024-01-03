import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IBoard, postState } from '../store/atom/postState';
import customAxios from '../apiFetcher/customAxios';

export default function useGetAllBoardList() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPost] = useRecoilState<IBoard[]>(postState);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get(`/posts`, {
          params: {
            page,
            paged: true,
            size: 4,
            sort: 'createdAt,desc',
          },
        });
        const postData = response.data || [];
        setPost(postData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPost, page]);

  return { posts, isLoading, setPage, page };
}
