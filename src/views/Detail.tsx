import styled from 'styled-components';
import Header from '../components/Header';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailPageModal from '../components/modal/DetailPageModal';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../store/atom/auth';
import customAxios from '../apiFetcher/customAxios';

export interface ProductType {
  categories: [
    {
      category: string;
    },
    {
      category: string;
    },
  ];
  count: number;
  createdAt: string;
  modifiedAt: string;
  productName: string;
  price: number;
  description: string;
  images: [
    {
      url: string;
      position: number;
    },
  ];
  review: [
    {
      content: string;
      createdAt: string;
      imageUrl: string;
      modifiedAt: string;
      productId: number;
      score: number;
      userId: number;
    },
  ];
  reviewCount: number;
}

export default function Detail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const descriptionMatch = useMatch('products/:productId/description');
  const reviewMatch = useMatch('products/:productId/review');
  const [clicked, setClicked] = useState(false);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await customAxios
          .get(`/products/${productId}/description`)
          .then(response => {
            setProduct(response.data);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      <ImageBox>
        <Image src={product?.images[0].url} />
      </ImageBox>
      <ProductInfo>
        <ProductName>{product?.productName}</ProductName>
        <Price>{product?.price}원</Price>
      </ProductInfo>
      <Tabs>
        <Tab isActive={descriptionMatch !== null}>
          <Link to="description">상품설명</Link>
        </Tab>
        <Tab isActive={reviewMatch !== null}>
          <Link to="review">리뷰(1,702)</Link>
        </Tab>
      </Tabs>
      <Outlet context={product} />
      <hr />
      <BottomActionBar>
        <Link to={'/chat'}>
          <IoChatbubbleEllipsesOutline
            style={{
              width: '30%',
              height: '40px',
              marginLeft: '40px',
              cursor: 'pointer',
            }}
          />
        </Link>
        <OrderBtn onClick={onOrderBtnClick}>주문하기</OrderBtn>
      </BottomActionBar>
      {clicked ? (
        <DetailPageModal price={product?.price ?? 0} setClicked={setClicked} />
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

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: 40vh;
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background-size: cover;
`;

const ProductInfo = styled.div`
  text-align: center;
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
  margin-top: 15px;
`;

const OrderBtn = styled.button`
  width: 70%;
  height: 50px;
  background-color: #16a113;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  margin-left: 30px;
  cursor: pointer;
`;
