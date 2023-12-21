import styled from 'styled-components';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import React, { useState } from 'react';
import { postReview } from '../apiFetcher/postReview';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';

export default function CreateReview() {
  const [content, setContent] = useState('');
  const userId = useRecoilValue(userIdState);
  console.log(userId);
  const productId = '8';

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    await postReview({ content, userId, productId });
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Form onSubmit={onSubmit}>
        <TextArea
          placeholder="상품 후기를 작성해주세요. (10자 이상)"
          onChange={onContentChange}
          minLength={10}
          value={content}
          required
        />
        <SubmitBtn type="submit">작성하기</SubmitBtn>
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
