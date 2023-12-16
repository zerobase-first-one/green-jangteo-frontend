import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import { BASE_URL } from "../constant/union";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom/auth";

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export default function ChangePassword() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordToChange, setPasswordToChange] = useState("");
  // const [error, setError] = useState('')
  const token = useRecoilValue(tokenState);

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const onChangeBtnClick = async () => {
    const data = { currentPassword, passwordToChange };
    try {
      const response = await api.patch(
        `${BASE_URL}/users/${userId}/password`,
        data
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      if (response.status === 204) {
        navigate("/users/login");
      }
    } catch (error) {
      console.error("비밀번호 변경 시 에러가 발생했습니다:", error);
    }
  };

  return (
    <Wrapper>
      <Header />
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
        {/* <InputLabel>비밀번호 확인</InputLabel>
        <InputField
          type="password"
          placeholder="새로운 비밀번호를 다시 입력하세요"
          value={passwordToChange}
          onChange={(e) => setPasswordToChange(e.currentTarget.value)}
        /> */}
        <ChangeButton onClick={onChangeBtnClick}>
          비밀번호 변경하기
        </ChangeButton>
      </ContentWrapper>
    </Wrapper>
  );
}
