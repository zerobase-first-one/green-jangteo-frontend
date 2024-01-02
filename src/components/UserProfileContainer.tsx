import styled from 'styled-components';
import useGetUserProfile from '../hooks/useGetUserProfile';
import ReviewListContainer from './ReviewListContainer';

export default function UserProfileContainer() {
  const { userInfo } = useGetUserProfile();

  return (
    <>
      <ProfileContainer>
        <ProfileImgBox />
        <ProfileTextBox>
          <UserName>{userInfo?.username}</UserName>
        </ProfileTextBox>
        <ReviewListContainer />
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  padding: 20px;
  text-align: center;
`;

const ProfileImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  background-color: green;
  border-radius: 50%;
  transition: all 0.5s;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const UserName = styled.strong`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

// const ShowReviewsButton = styled.button`
//   margin-top: 10px;
//   padding: 10px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #45a049;
//   }
// `;
