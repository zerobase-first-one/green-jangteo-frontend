import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import customAxios from '../apiFetcher/customAxios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditMyBoardDetail = () => {
  const location = useLocation();
  const value = location.state;
  const [editedSubject, setEditedSubject] = useState(value.subject);
  const [editedContent, setEditedContent] = useState(value.content);
  const userId = useRecoilValue(userIdState);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSubject(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.currentTarget.value);
  };

  const onCancelClick = () => {
    navigate(-1);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        userId: userId,
        subject: editedSubject,
        content: editedContent,
        imageRequestDtos: [
          // {
          //   positionInContent: 10,
          //   url: 'https://test-images-bucket.s3.us-west-1.amazonaws.com/images/sample1.jpg',
          // },
        ],
      };
      await customAxios.put(`/posts/${postId}`, data);

      alert('게시글이 수정되었습니다.');

      navigate(-1);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
      alert('게시물 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Form onSubmit={handleSave}>
      <Title type="text" value={editedSubject} onChange={handleTitleChange} />
      <TextArea value={editedContent} onChange={handleContentChange} />
      <ButtonWrapper>
        <SaveButton type="submit">수정 저장</SaveButton>
        <CancelButton onClick={onCancelClick}>취소</CancelButton>
      </ButtonWrapper>
    </Form>
  );
};

export default EditMyBoardDetail;

const Form = styled.form`
  width: 100%;
  height: 280px;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #ccc;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
`;
