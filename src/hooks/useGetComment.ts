import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';
import { useEffect, useState } from 'react';

export interface IComment {
  commentId: string;
  content: string;
  createdAt: string;
  modifiedAt?: string;
  userId: string;
  username: string;
}

export default function useGetComment() {
  const { postId } = useParams();
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState(0);

  const fetchComment = async () => {
    const response = await customAxios.get('/comments', {
      params: {
        postId: postId,
        page,
        paged: true,
        size: 5,
        sort: 'createdAt,desc',
      },
    });
    console.log('commentRes', response);
    setComments(response.data);
  };

  useEffect(() => {
    fetchComment();
    // setPage;
  }, [postId, page]);

  const refreshComments = () => {
    fetchComment();
  };

  const addComment = (newComment: IComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  return { comments, addComment, setPage, setComments, refreshComments };
}
