import Header from "../components/Header";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant/union";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom/auth";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 430px;
  height: 800px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Username = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  font-size: 18px;
  margin-right: 10px;
`;

const RatingBtn = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
`;

const Button = styled(Link)`
  background-color: #ffffff;
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
`;

export default function Profile() {
  const { userId } = useParams();
  const token = useRecoilValue(tokenState);
  const [username, setUsername] = useState("");

  const getData = async () => {
    const response = await axios.get(`${BASE_URL}/users/${userId}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    setUsername(response.data.fullName);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Header />
      <TopWrapper>
        <Username>{username}님</Username>
        <hr />
        <RatingWrapper>
          <Rating>화이트</Rating>
          <RatingBtn>등급 혜택보기</RatingBtn>
        </RatingWrapper>
      </TopWrapper>
      <Button>적립금</Button>
      <Button>쿠폰</Button>
      <Button>주문 내역</Button>
      <Button to={`/users/${userId}/password`}>비밀번호 변경하기</Button>
      <Button>이메일 변경하기</Button>
      <Button>전화번호 변경하기</Button>
      <Button>주소 변경하기</Button>
      <Button>구매후기</Button>
      <Button>로그아웃</Button>
      <Button>회원탈퇴</Button>
      <NavBar />
    </Wrapper>
  );
}
