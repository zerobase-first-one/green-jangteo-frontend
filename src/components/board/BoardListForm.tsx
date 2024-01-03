import styled from 'styled-components';
import { IBoard } from '../../store/atom/postState';
import { Link } from 'react-router-dom';

export default function BoardListForm({
  postId,
  subject,
  username,
  createdAt,
  viewCount,
  commentCount,
}: IBoard) {
  return (
    <Link to={`/posts/${postId}`}>
      <Wrapper>
        <Title>{subject}</Title>
        <Details>
          <Username>{username}</Username>
          <CreateAt>등록일: {createdAt.slice(0, 10)}</CreateAt>
        </Details>
        <hr />
        <ViewCount>조회수 {viewCount}</ViewCount>
        <Comment>댓글 {commentCount}</Comment>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background-color: #fff;

  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Username = styled.p`
  font-size: 14px;
  color: #555;
`;

const CreateAt = styled.p`
  font-size: 14px;
  color: #999;
`;

const ViewCount = styled.p`
  font-size: 14px;
`;

const Comment = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
`;
