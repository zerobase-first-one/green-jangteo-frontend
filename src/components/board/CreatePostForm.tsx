import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postState } from '../../store/atom/postState';
import customAxios from '../../apiFetcher/customAxios';
import { userIdState } from '../../store/atom/auth';
import ConfirmModal from '../modal/ConfirmModal';

interface PostProps {
  userId: string;
  subject: string;
  content: string;
}

const CreatePostForm = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [, setPost] = useRecoilState(postState);
  const userId = useRecoilValue(userIdState);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
      setSubject('');
      setContent('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
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
      {showModal && (
        <ConfirmModal
          message="게시글이 등록되었습니다."
          linkPath="/posts"
          onClose={() => setShowModal(false)}
        />
      )}
    </Wrapper>
  );
};

export default CreatePostForm;

const Wrapper = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  background-color: #007bff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
