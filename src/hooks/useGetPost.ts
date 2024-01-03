import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import { useEffect, useState } from 'react';

export default function useGetPost() {
  const { postId } = useParams();
  const userId = useRecoilValue(userIdState);

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');

  const fetchPost = async () => {
    try {
      const response = await customAxios.get(`/posts/${postId}`, {
        params: { writerId: userId },
      });

      setSubject(response.data.subject);
      setContent(response.data.content);
      setUsername(response.data.username);
      setDate(response.data.createdAt);
    } catch (error) {
      console.error('게시글을 조회하는데 에러가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return { subject, content, username, date };
}
