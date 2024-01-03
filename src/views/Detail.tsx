import styled from 'styled-components';
import Header from '../components/Header';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DetailPageModal from '../components/modal/DetailPageModal';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../store/atom/auth';
import useGetProductDescription from '../hooks/useGetProductDescription';

export default function Detail() {
  const { product } = useGetProductDescription();
  const descriptionMatch = useMatch('products/:productId/description');
  const reviewMatch = useMatch('products/:productId/review');
  const [clicked, setClicked] = useState(false);
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();

  const onOrderBtnClick = () => {
    if (token === null) {
      alert('로그인 화면으로 이동합니다.');
      navigate('/users/login');
    } else {
      setClicked(true);
    }
  };

  return (
    <Wrapper>
      <Header />
      <Box>
        <ImageBox>
          <Image src={product?.images[0].url} />
        </ImageBox>
        <ProductInfo>
          <ProductName>{product?.productName}</ProductName>
          <Price>{product?.price}원</Price>
        </ProductInfo>
      </Box>
      <Tabs>
        <Tab isActive={descriptionMatch !== null}>
          <Link to="description">상품설명</Link>
        </Tab>
        <Tab isActive={reviewMatch !== null}>
          <Link to="review">리뷰</Link>
        </Tab>
      </Tabs>
      <Outlet context={product} />
      <hr />
      <BottomActionBar>
        <ChatLink to={'/chat'}>
          <ChatText>판매자와 1:1 채팅하기</ChatText>
          <ChatIcon />
        </ChatLink>
        <OrderBtn onClick={onOrderBtnClick}>주문하기</OrderBtn>
      </BottomActionBar>
      {clicked ? (
        <DetailPageModal item={product} setClicked={setClicked} />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding-bottom: 60px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Box = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

const ImageBox = styled.div`
  width: 40%;
  padding-bottom: 40%;
  margin-right: 30px;
  background-color: #dedede;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 100%;
    margin-right: 0;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const ProductInfo = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const ProductName = styled.p`
  margin: 20px 0 10px;
  font-size: 24px;
  font-weight: bold;
`;

const Price = styled.span`
  margin: 0 0 10px;
  font-size: 18px;
  color: #16a113;
`;

const Tabs = styled.div`
  width: 90%;
  display: flex;
  margin: 20px auto 0;
  margin-bottom: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  background-color: ${props => (props.isActive ? '#149211' : '#E0E0E0')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#AAAAAA')};
  text-decoration: none;
`;

const BottomActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const ChatLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-left: 10px;
  width: 50%;
  height: 50px;
  border: 1px solid #16a113;
  border-radius: 10px;
`;

const ChatText = styled.p`
  margin-right: 5px;
  font-size: 16px;
  text-align: center;
  display: flex;
`;

const ChatIcon = styled(IoChatbubbleEllipsesOutline)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const OrderBtn = styled.button`
  width: 50%;
  height: 50px;
  background-color: #16a113;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
`;
