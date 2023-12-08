import styled from "styled-components";
import { IBoardListForm } from "../store/atom/postState";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 400px;
  height: 170px;
  background-color: #ffffff;
  margin: 10px auto;
  padding: 30px 20px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Username = styled.p`
  font-size: 12px;
`;

const CreateAt = styled.p`
  font-size: 12px;
  color: #999999;
`;

const Comment = styled.p`
  margin-top: 20px;
`;

export default function BoardListForm({
  postId,
  title,
  username,
  createdAt,
  commentCount,
}: IBoardListForm) {
  return (
    <Link to={`/posts/${postId}`}>
      <Wrapper>
        <Title>{title}</Title>
        <Username>{username}</Username>
        <CreateAt>{createdAt}</CreateAt>
        <hr />
        <Comment>댓글 {commentCount}</Comment>
      </Wrapper>
    </Link>
  );
}
