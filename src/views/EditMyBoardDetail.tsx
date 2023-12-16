import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/atom/auth";

const EditMyBoardDetail = ({ postId, subject, content, onSave, onCancel }) => {
  const [editedSubject, setEditedSubject] = useState(subject);
  const [editedContent, setEditedContent] = useState(content);
  const userId = useRecoilValue(userIdState); // TODO: userId 쓰임 확인할 것

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSubject(e.currentTarget.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.currentTarget.value);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/posts/${postId}`, {
        userId,
        subject: editedSubject,
        content: editedContent,
      });
      onSave(userId, editedSubject, editedContent);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  return (
    <Form>
      <Title type="text" value={editedSubject} onChange={handleTitleChange} />
      <TextArea value={editedContent} onChange={handleContentChange} />
      <ButtonWrapper>
        <SaveButton onClick={handleSave}>수정 저장</SaveButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
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
