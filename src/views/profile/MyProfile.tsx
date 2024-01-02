import Header from '../../components/Header';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import { Link, useParams } from 'react-router-dom';
import { useGetMyProfile } from '../../hooks/useGetMyProfile';
import { Avatar } from '@mui/material';

export default function MyProfile() {
  const { userId } = useParams();
  const { loading, username } = useGetMyProfile();

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <Wrapper>
      <Header />
      <TopWrapper>
        {/* <AvatarWrapper key="avatar-key"> */}
        <AvatarStyled src="/broken-image.jpg" />
        {/* </AvatarWrapper> */}
        <TextWrapper>
          <Username>{username}님</Username>
          <hr />
          <RatingWrapper>
            <Rating>화이트</Rating>
            <RatingBtn>등급 혜택보기</RatingBtn>
          </RatingWrapper>
        </TextWrapper>
      </TopWrapper>
      {/* <Button>적립금</Button>
      <Button>쿠폰</Button> */}
      <Button to={`/users/${userId}/password`}>비밀번호 변경하기</Button>
      <Button to={`/users/${userId}/email`}>이메일 변경하기</Button>
      <Button to={`/users/${userId}/phone`}>전화번호 변경하기</Button>
      <Button to={`/users/${userId}/address`}>주소 변경하기</Button>
      {/* <Button>주문 내역</Button> */}
      <Button to={`/reviews/users/${userId}`}>리뷰관리</Button>
      {/* <Button>로그아웃</Button> */}
      <Button to={`/users/${userId}/delete-account`}>회원탈퇴</Button>
      <NavBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
`;

// const AvatarWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

const AvatarStyled = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  font-size: 24px;
  margin-bottom: -5px;
  margin-top: 5px;
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
