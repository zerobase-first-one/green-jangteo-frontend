import styled from 'styled-components';
import { Link, NavLink, Outlet, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../../store/atom/auth';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import customAxios from '../../apiFetcher/customAxios';
import { IoIosSettings } from 'react-icons/io';

interface Info {
  storeName: string;
  description: string;
  imageUrl: string;
}

const SellerProfile = () => {
  const [profile, setProfile] = useState<Info>({
    storeName: '',
    description: '',
    imageUrl: '',
  });
  console.log(profile);
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

  const orderMatch = useMatch('stores/:userId/order');

  useEffect(() => {
    customAxios
      .get(`/stores/${userId}`, {
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
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Profile>
          <ProfileImgBox>
            <Image src={profile.imageUrl} />
          </ProfileImgBox>
          <ProfileTextBox>
            <StoreName>{profile.storeName}</StoreName>
            <StoreDescription>{profile.description}</StoreDescription>
          </ProfileTextBox>
        </Profile>
        <Button className="edit">
          <Link to={`/stores/${userId}/profile`} state={profile}>
            <IoIosSettings />
          </Link>
        </Button>
        <Button className="upload">
          <Link to={`/stores/${userId}/upload`}>물품등록</Link>
        </Button>
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
    </>
  );
};

export default SellerProfile;

const Wrapper = styled.div`
  // padding: 0 20px;
  position: relative;
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
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
  // @media screen and (max-width: 430px) {
  //   width: calc(100% - 32px);
  // }
`;
const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ProfileTextBox = styled.div`
  flex: 1;
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  @media screen and (max-width: 768px) {
    width: calc(100% - 120px);
  }
`;
const StoreName = styled.strong`
  font-size: 32px;
  font-weight: bold;
  margin: 30px 0;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin: 20px 0;
  }
`;
const StoreDescription = styled.p`
  text-indent: 5px;
`;
const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #dedede;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &.upload:hover {
    background-color: var(--maincolor);
    color: #ffffff;
  }
  &.edit {
    padding: 0;
    background-color: transparent;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 38px;
    color: #dedede;
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
