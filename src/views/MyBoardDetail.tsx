import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyBoardDetailModal from '../components/modal/MyBoardDetailModal';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import customAxios from '../apiFetcher/customAxios';
// import useGetComment from '../hooks/useGetComment';
import useGetPost from '../hooks/useGetPost';
import PostFormComment from './PostFormComment';

export default function MyBoardDetail() {
  const { subject } = useGetPost();
  const { content } = useGetPost();
  const { username } = useGetPost();
  const { date } = useGetPost();
  // const { addComment } = useGetComment();
  const [clicked, setClicked] = useState(false);
  const { postId } = useParams();
  // const ref = useRef<HTMLInputElement>(null);
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   if (!userId || !postId) return;
  //   e.preventDefault();
  //   const newComment = ref.current?.value || '';

  //   try {
  //     const data = { userId, content: newComment, postId };
  //     const response = await customAxios.post(`/comments`, data);
  //     const newCommentData = {
  //       commentId: response.data.commentId,
  //       userId: response.data.userId,
  //       username: response.data.username,
  //       content: response.data.content,
  //       createdAt: response.data.createdAt,
  //     };
  //     console.log('newComment', newCommentData);

  //     addComment(newCommentData);
  //   } catch (e) {
  //     console.error('Comment Error:', e);
  //     throw e;
  //   }

  //   ref.current!.value = '';
  // };

  const onDeleteClick = async () => {
    try {
      await customAxios.delete(`/posts/${postId}`, {
        params: { userId: userId },
      });
      alert('게시물이 삭제되었습니다.');
      navigate('/posts/my');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ContentWrapper>
        <IconBtn onClick={() => setClicked(true)}>
          <MoreVertIcon />
        </IconBtn>
        <Title>{subject}</Title>
        <Username>{username}</Username>
        <CreatedAt>{date}</CreatedAt>
        <Content>{content}</Content>
        <Link
          to={`/posts/${postId}/edit`}
          state={{ subject: subject, content: content }}
        >
          <button>수정</button>
        </Link>
        <button onClick={onDeleteClick}>삭제</button>
        <hr />
        <PostFormComment />
      </ContentWrapper>
      {/* <CommentWrapper onSubmit={onSubmit}>
        <Input type="text" placeholder="댓글을 남겨보세요." ref={ref} />
        <Button type="submit">등록</Button>
      </CommentWrapper> */}
      {clicked ? <MyBoardDetailModal setClicked={setClicked} /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #e7e7e7;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  height: 80vh;
  padding: 20px;
  background-color: #ffffff;
`;

const IconBtn = styled.span`
  cursor: pointer;
`;

const Title = styled.p`
  width: 100%;
  height: 60px;
  font-size: 20px;
  padding-top: 20px;
`;

const Username = styled.p`
  font-size: 14px;
  padding-bottom: 5px;
`;

const CreatedAt = styled.p`
  font-size: 14px;
  color: #999999;
`;

const Content = styled.div`
  width: 100%;
  height: 200px;
  padding-top: 20px;
  margin-top: 20px;
  font-size: 16px;
`;

// const CommentWrapper = styled.form`
//   position: relative;
//   bottom: -10px;
//   display: flex;
//   align-items: center;
//   width: 90%;
//   margin: 0 auto;
// `;

// const Input = styled.input`
//   flex: 1;
//   height: 45px;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 15px;
//   outline: none;
// `;

// const Button = styled.button`
//   position: absolute;
//   right: 10px;
//   width: 70px;
//   height: 35px;
//   padding: 0 15px;
//   font-size: 16px;
//   border: 1px solid #007bff;
//   border-radius: 10px;
//   background-color: #007bff;
//   color: #fff;
//   cursor: pointer;
// `;
