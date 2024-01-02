import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IBoard, postState } from '../../store/atom/postState';
import BoardListForm from './BoardListForm';
import customAxios from '../../apiFetcher/customAxios';

export default function AllBoardList() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPost] = useRecoilState<IBoard[]>(postState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get(`/posts`);
        const postData = response.data || [];
        setPost(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPost]);

  return isLoading ? (
    <div>로딩중...</div>
  ) : (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => <BoardListForm key={post.postId} {...post} />)
      ) : (
        <div>게시물이 없습니다</div>
      )}
    </>
  );
}
