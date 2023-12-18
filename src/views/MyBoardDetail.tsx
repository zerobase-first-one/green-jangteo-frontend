import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyBoardDetailModal from '../components/modal/MyBoardDetailModal';
import EditMyBoardDetail from './EditMyBoardDetail';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import customAxios from '../apiFetcher/customAxios';

interface IComment {
  commentId: string;
  createdAt: string;
  user: {
    userId: string;
    username: string;
  };
  content: string;
}

export default function MyBoardDetail() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [clicked, setClicked] = useState(false);
  const [editing, setEditing] = useState(false);
  const { postId } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const userId = useRecoilValue(userIdState); // TODO: userId 쓰임 확인할 것

  const fetchData = async () => {
    try {
      const response = await customAxios.get(`/posts/${postId}`);

      console.log('코멘츠', response.data.comments);
      setSubject(response.data.subject);
      setContent(response.data.content);
      setUsername(response.data.user.username);
      setDate(response.data.createdAt);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId) return;
    e.preventDefault();
    const commentValue = ref.current?.value || '';
    postComment({ userId, content: commentValue });
    setComment(commentValue);
    ref.current!.value = '';
  };

  const postComment = async ({
    userId,
    content,
  }: {
    userId: string;
    content: string;
  }) => {
    const data = { userId, content };
    try {
      const response = await customAxios.post(
        `/posts/${postId}/comments`,
        data,
      );
      const newComment = {
        commentId: response.data.commentId,
        createdAt: response.data.createdAt,
        user: {
          userId,
          username,
        },
        content: `${comment}`,
      };
      setComments([...comments, newComment]);
      console.log('comment', response);
    } catch (e) {
      console.error('Comment Error:', e);
      throw e;
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = ({
    userId,
    editedSubject,
    editedContent,
  }: {
    userId: string;
    editedSubject: string;
    editedContent: string;
  }) => {
    console.log('업데이트된 게시물:', userId, editedSubject, editedContent);
    setEditing(false);
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ContentWrapper>
        {editing ? (
          <EditMyBoardDetail
            postId={postId}
            subject={subject}
            content={content}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
          />
        ) : (
          <>
            <IconBtn onClick={() => setClicked(true)}>
              <MoreVertIcon />
            </IconBtn>
            <Title>{subject}</Title>
            <Username>{username}</Username>
            <CreatedAt>{date}</CreatedAt>
            <Content>{content}</Content>
            <hr />
            {comments.map(comment => (
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
          </>
        )}
      </ContentWrapper>
      {editing ? null : (
        <CommentWrapper onSubmit={onSubmit}>
          <Input type="text" placeholder="댓글을 남겨보세요." ref={ref} />
          <Button type="submit">등록</Button>
        </CommentWrapper>
      )}
      {clicked ? (
        <MyBoardDetailModal setClicked={setClicked} setEditing={setEditing} />
      ) : null}
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
