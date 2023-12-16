import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { deleteAccount } from "../../apiFetcher/deleteAccount";
import { userIdState } from "../../store/atom/auth";

export default function DeleteAccountContainer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const setUserId = useSetRecoilState(userIdState);

  const onChangeBtnClick = () => {
    deleteAccount(userId, setUserId, password, navigate);
  };

  return (
    <ContentWrapper>
      <InputLabel>현재 비밀번호</InputLabel>
      <InputField
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <ChangeButton onClick={onChangeBtnClick}>회원 탈퇴하기</ChangeButton>
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
