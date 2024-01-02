import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postState } from '../../store/atom/postState';
import BoardListForm from './BoardListForm';
import customAxios from '../../apiFetcher/customAxios';
import { userIdState } from '../../store/atom/auth';

export default function MyBoardList() {
  const userId = useRecoilValue(userIdState);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customAxios.get(`/posts/my`, {
        params: { userId },
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
  }, [userId]);

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
