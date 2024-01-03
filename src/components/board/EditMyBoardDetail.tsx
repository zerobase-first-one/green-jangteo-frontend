import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import customAxios from '../../apiFetcher/customAxios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

const EditMyBoardDetail = () => {
  const location = useLocation();
  const value = location.state;
  const [editedSubject, setEditedSubject] = useState(value.subject);
  const [editedContent, setEditedContent] = useState(value.content);
  const userId = useRecoilValue(userIdState);
  const [showModal, setShowModal] = useState(false);
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
          {
            positionInContent: 10,
            url: 'https://test-images-bucket.s3.us-west-1.amazonaws.com/images/sample1.jpg',
          },
        ],
      };

      await customAxios.put(`/posts/${postId}`, data);

      setShowModal(true);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
      alert('게시물 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Form onSubmit={handleSave}>
        <Title
          type="text"
          value={editedSubject}
          onChange={handleTitleChange}
          placeholder="제목"
        />
        <TextArea
          value={editedContent}
          onChange={handleContentChange}
          placeholder="내용"
        />
        <ButtonWrapper>
          <SaveButton type="submit">수정 저장</SaveButton>
          <CancelButton onClick={onCancelClick}>취소</CancelButton>
        </ButtonWrapper>
      </Form>
      {showModal && (
        <ConfirmModal
          message="게시글이 수정되었습니다."
          linkPath={`/posts/${postId}`}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EditMyBoardDetail;

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.input`
  width: 100%;
  height: 30%;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 16px;
`;

const CancelButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ccc;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
`;
