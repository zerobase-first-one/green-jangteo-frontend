import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../apiFetcher/patchUserPassword";

export default function ChangePasswordContainer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordToChange, setPasswordToChange] = useState("");
  const [passwordToChangeConfirm, setPasswordToChangeConfirm] = useState("");

  const onChangeBtnClick = () => {
    changePassword(
      userId,
      currentPassword,
      passwordToChange,
      passwordToChangeConfirm,
      navigate
    );
  };

  return (
    <ContentWrapper>
      <InputLabel>현재 비밀번호</InputLabel>
      <InputField
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.currentTarget.value)}
      />
      <InputLabel>새로운 비밀번호</InputLabel>
      <InputField
        type="password"
        placeholder="새로운 비밀번호를 입력하세요"
        value={passwordToChange}
        onChange={(e) => setPasswordToChange(e.currentTarget.value)}
      />
      <InputLabel>비밀번호 확인</InputLabel>
      <InputField
        type="password"
        placeholder="새로운 비밀번호를 다시 입력하세요"
        value={passwordToChangeConfirm}
        onChange={(e) => setPasswordToChangeConfirm(e.currentTarget.value)}
      />
      <ChangeButton onClick={onChangeBtnClick}>비밀번호 변경하기</ChangeButton>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const ChangeButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;
