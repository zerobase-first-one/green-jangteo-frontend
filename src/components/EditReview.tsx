import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HeaderPrevPageBtn from './HeaderPrevPageBtn';
import styled from 'styled-components';
import { useState } from 'react';
import customAxios from '../apiFetcher/customAxios';

export default function EditReview() {
  const { reviewId } = useParams();
  const location = useLocation();
  const value = location.state;
  const [editedContent, setEditedContent] = useState(value);
  const navigate = useNavigate();

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { content: editedContent, reviewId };
    await customAxios.put(`/reviews/${reviewId}`, data);
    alert('상품후기 수정이 완료되었습니다.');
    navigate(-1);
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Form onSubmit={onSubmit}>
        <TextArea value={editedContent} onChange={onContentChange} />
        <SubmitBtn type="submit">수정하기</SubmitBtn>
      </Form>
      <Image />
    </Wrapper>
  );
}

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

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
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
  background-color: #16a114;
  margin: 10px auto;
  cursor: pointer;
`;

const Image = styled.img``;
