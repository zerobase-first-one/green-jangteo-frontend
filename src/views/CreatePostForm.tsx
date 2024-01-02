import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postState } from '../store/atom/postState';
// import ConfirmModal from '../components/modal/ConfirmModal';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import customAxios from '../apiFetcher/customAxios';
import { userIdState } from '../store/atom/auth';
import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";

interface PostProps {
  userId: string;
  subject: string;
  content: string;
  imageRequestDtos?: [
    // {
    //   positionInContent: 10;
    //   url: 'https://test-images-bucket.s3.us-west-1.amazonaws.com/images/sample1.jpg';
    // },
  ];
}

const CreatePostForm = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPost] = useRecoilState(postState);
  // const [showModal, setShowModal] = useState(false);
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();
  console.log('등록페이지', posts);
  console.log('userId', userId);

  const createPost = async ({ userId, subject, content }: PostProps) => {
    const data = { userId, subject, content };
    await customAxios
      .post(`/posts`, data)
      .then(response => {
        const newPostData = response.data;
        setPost(prevPosts => ({
          ...prevPosts,
          newPostData,
        }));
      })
      .catch(e => {
        console.error('Login Error:', e);
        throw e;
      });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSubject(value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    try {
      createPost({ userId, subject, content });
      // setShowModal(true);
      setSubject('');
      setContent('');
      alert('게시글이 등록되었습니다.');
      navigate('/posts/my');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Form onSubmit={onSubmit}>
        <Title
          placeholder="제목을 입력하세요."
          onChange={onTitleChange}
          value={subject}
          required
        />
        <TextArea
          placeholder="내용을 입력하세요.(최대 300자)"
          onChange={onContentChange}
          maxLength={300}
          value={content}
          required
        />
        <SubmitBtn type="submit">등록</SubmitBtn>
      </Form>
      {/* {showModal && <ConfirmModal onClose={() => setShowModal(false)} />} */}
    </Wrapper>
  );
};

export default CreatePostForm;

const Wrapper = styled.div`
  background-color: #e7e7e7;
  height: 100vh;
`;

const Form = styled.form`
  width: 100%;
  height: 280px;
  background-color: #ffffff;
  margin-top: 20px;
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  background-color: #999999;
  margin: 10px;
  cursor: pointer;
`;
