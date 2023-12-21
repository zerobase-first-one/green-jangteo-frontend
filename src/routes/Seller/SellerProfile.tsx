import styled from 'styled-components';
import { Link, NavLink, Outlet, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../constant/union';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../../store/atom/auth';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import customAxios from '../../apiFetcher/customAxios';

interface Info {
  storeName: string;
  description: string;
  imageUrl: string;
}

const SellerProfile = () => {
  // const profile = {
  //   "createdAt": "2023-12-16T14:40:57.955Z",
  //   "description": "string",
  //   "imageUrl": "string",
  //   "modifiedAt": "2023-12-16T14:40:57.955Z",
  //   "storeName": "string",
  //   "storeProductDtos": [
  //     {
  //       "averageScore": 0,
  //       "createdAt": "2023-12-16T14:40:57.955Z",
  //       "imageUrl": "string",
  //       "modifiedAt": "2023-12-16T14:40:57.955Z",
  //       "price": 0,
  //       "productName": "string"
  //     }
  //   ]
  // }
  // const { userId } = useParams();
  const [profile, setProfile] = useState<Info>({
    storeName: '',
    description: '',
    imageUrl: '',
  });
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

  const orderMatch = useMatch('stores/:userId/order');
  console.log(profile);
  console.log(userId);

  useEffect(() => {
    customAxios
      .get(`/stores/${userId}`, {
        // axios
        //   .get(`${BASE_URL}/stores/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, [userId, token]);

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Profile>
        <ProfileImgBox></ProfileImgBox>
        <ProfileTextBox>
          <StoreName>{profile.storeName}</StoreName>
          <StoreDescription>
            description: {profile.description}
          </StoreDescription>
        </ProfileTextBox>
      </Profile>
      <Link to={`/stores/${userId}/upload`}>
        <Button>물품등록</Button>
      </Link>
      <Tabs>
        <NavLink to={''} end={orderMatch !== null ? true : false}>
          <Tab>물품 리스트</Tab>
        </NavLink>
        <NavLink to={'order'}>
          <Tab>주문 리스트</Tab>
        </NavLink>
      </Tabs>
      <Div>
        <Outlet />
      </Div>
    </Wrapper>
  );
};

export default SellerProfile;

const Wrapper = styled.div`
  // padding: 0 20px;
`;
const Profile = styled.div`
  padding: 40px 20px;
  display: flex;
`;
const ProfileImgBox = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 50px;
  background-color: green;
  border-radius: 50%;
  transition: all 0.5s;

  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
  // @media screen and (max-width: 430px) {
  //   width: calc(100% - 32px);
  // }
`;
// const Img = styled.img``
const ProfileTextBox = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
`;
const StoreName = styled.strong`
  font-size: 32px;
  font-weight: bold;
  margin: 30px 0;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin: 15px 0;
  }
`;
const StoreDescription = styled.p``;
const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #dedede;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--maincolor);
    color: #ffffff;
  }
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  font-size: 20px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  a {
    background-color: #dedede;
  }
  a.active {
    background-color: var(--maincolor);
    color: #ffffff;
    font-weight: bold;
  }
`;

const Tab = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 20px 0px;
  border: none;
`;
const Div = styled.div``;
