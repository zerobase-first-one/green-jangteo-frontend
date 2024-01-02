// import { useEffect, useState } from 'react';
// import customAxios from '../apiFetcher/customAxios';
// import { useParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { userIdState } from '../store/atom/auth';

// export default function usePostComment(content: string) {
//   const { postId } = useParams();
//   const userId = useRecoilValue(userIdState);
//   const [newComment, setNewComment] = useState({
//     commentId: '',
//     createdAt: '',
//     content: '',
//   });

//   const postComment = async () => {
//     const data = { userId, content, postId };
//     try {
//       const response = await customAxios.post(`/comments`, data);
//       const newCommentData = {
//         commentId: response.data.commentId,
//         createdAt: response.data.createdAt,
//         userId: response.data.userId,
//         username: response.data.username,
//         content: response.data.content,
//       };
//       console.log('newComment', newCommentData);
//       setNewComment({
//         commentId: newCommentData.commentId,
//         createdAt: newCommentData.createdAt,
//         content: newCommentData.content,
//       });
//     } catch (e) {
//       console.error('Comment Error:', e);
//       throw e;
//     }
//   };

//   useEffect(() => {
//     // postComment();
//   }, []);

//   return { postComment, newComment };
// }
