import { useRecoilValue } from 'recoil';
import customAxios from '../apiFetcher/customAxios';
import useGetComment from '../hooks/useGetComment';
import { userIdState } from '../store/atom/auth';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRef, useState } from 'react';

export default function PostFormComment() {
  const { postId } = useParams();
  const userId = useRecoilValue(userIdState);
  const { addComment, comments, setPage, refreshComments } = useGetComment();
  const ref = useRef<HTMLInputElement>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [toggleStates, setToggleStates] = useState(
    Array(comments.length).fill(false),
  );

  const handleToggle = (index: number) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId || !postId) return;
    e.preventDefault();
    const newComment = ref.current?.value || '';

    try {
      const data = { userId, content: newComment, postId };
      const response = await customAxios.post(`/comments`, data);
      const newCommentData = {
        commentId: response.data.commentId,
        userId: response.data.userId,
        username: response.data.username,
        content: response.data.content,
        createdAt: response.data.createdAt,
      };

      addComment(newCommentData);
    } catch (e) {
      console.error('Comment Error:', e);
      throw e;
    }

    ref.current!.value = '';
  };

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleCommentEdit = async (commentId: string) => {
    try {
      if (!editedContent) {
        alert('수정된 댓글을 입력하세요.');
        return;
      }

      const data = { userId, content: editedContent, postId };
      const response = await customAxios.put(`/comments/${commentId}`, data);
      const editedCommentData = {
        commentId: response.data.commentId,
        userId: response.data.userId,
        username: response.data.username,
        content: response.data.content,
        createdAt: response.data.createdAt,
        modifiedAt: response.data.modifiedAt,
      };
      console.log(editedCommentData);

      alert('댓글이 수정되었습니다.');
    } catch (error) {
      console.error('댓글 수정 중 에러가 발생했습니다.', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await customAxios.delete(`/comments/${commentId}?userId=${userId}`);
      alert('댓글이 삭제되었습니다.');
      refreshComments();
    } catch (error) {
      console.error('댓글 삭제 중 에러가 발생했습니다.', error);
    }
  };

  return (
    <>
      <div>
        {comments.map((comment, index) => (
          <div key={comment.commentId}>
            {comment && (
              <div>
                <span>{comment.username}</span>
                <p>{comment.content}</p>
                {toggleStates[index] && (
                  <>
                    <Input
                      type="text"
                      placeholder="수정된 댓글을 입력하세요."
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                    />
                    <button
                      onClick={() => handleCommentEdit(comment.commentId)}
                    >
                      수정완료
                    </button>
                    <button onClick={() => handleToggle(index)}>취소</button>
                  </>
                )}
                {!toggleStates[index] && (
                  <button onClick={() => handleToggle(index)}>수정하기</button>
                )}
                <button onClick={() => handleCommentDelete(comment.commentId)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
        <button onClick={handlePreviousPage}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <CommentWrapper onSubmit={onSubmit}>
        <Input type="text" placeholder="댓글을 남겨보세요." ref={ref} />
        <Button type="submit">등록</Button>
      </CommentWrapper>
    </>
  );
}

const CommentWrapper = styled.form`
  position: relative;
  bottom: -10px;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const Input = styled.input`
  flex: 1;
  height: 45px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 15px;
  outline: none;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  width: 70px;
  height: 35px;
  padding: 0 15px;
  font-size: 16px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;
