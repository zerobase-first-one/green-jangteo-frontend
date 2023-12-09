import axios from "axios";
import Header from "../components/Header";
import styled from "styled-components";
import { BASE_URL } from "../constant/union";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 430px;
  height: 800px;
  background-color: #e7e7e7;
`;

const ContentWrapper = styled.div`
  width: 430px;
  height: 50vh;
  padding: 20px;
  background-color: #ffffff;
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

const CommentWrapper = styled.form`
  position: relative;
  bottom: 0;
  top: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
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

export default function MyBoardDetail() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  const fetchData = async () => {
    await axios.get(`${BASE_URL}/posts/${postId}`).then((response) => {
      console.log("코멘츠", response.data.comments);
      setTitle(response.data.title);
      setContent(response.data.content);
      setUsername(response.data.user.username);
      setDate(response.data.createdAt);
      setComments(response.data.comments);
    });
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setComment(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = 123;
    postComment({ userId, content });
    setComment("");
  };

  const postComment = async ({ userId, content }) => {
    const data = { userId, content };
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/${postId}/comments`,
        data
      );
      const newComment = {
        commentId: response.data.commentId,
        createdAt: response.data.createdAt,
        user: {
          userId: 2,
          username: `${username}`,
        },
        content: `${comment}`,
      };
      setComments([...comments, newComment]);
      console.log("comment", response);
    } catch (e) {
      console.error("Comment Error:", e);
      throw e;
    }
  };

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <Title>{title}</Title>
        <Username>{username}</Username>
        <CreatedAt>{date}</CreatedAt>
        <Content>{content}</Content>
        {comments.map((comment) => (
          <div>
            {comment.user && (
              <div>
                <span>{comment.user.username}</span>
                <p>{comment.content}</p>
              </div>
            )}
          </div>
        ))}
        {comment && (
          <div>
            <span>{username}</span>
            <p>{comment}</p>
          </div>
        )}
      </ContentWrapper>
      <CommentWrapper onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="댓글을 남겨보세요."
          value={comment}
          onChange={onChange}
        />
        <Button type="submit">등록</Button>
      </CommentWrapper>
    </Wrapper>
  );
}
