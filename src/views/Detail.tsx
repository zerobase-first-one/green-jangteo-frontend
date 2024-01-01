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
      <ProductName>{product?.productName}</ProductName>
      <Star>{product?.description}</Star>
      <Price>{product?.price}원</Price>
      <Tabs>
        <Tab isActive={descriptionMatch !== null}>
          <Link to="description">상품설명</Link>
        </Tab>
        <Tab isActive={reviewMatch !== null}>
          <Link to="review">리뷰(1,792)</Link>
        </Tab>
      </Tabs>
      <Outlet context={product} />
      <hr />
      <BottomActionBar>
        <IoChatbubbleEllipsesOutline
          style={{
            width: '30%',
            height: '40px',
            marginLeft: '40px',
            cursor: 'pointer',
          }}
        />
        <OrderBtn onClick={onOrderBtnClick}>주문하기</OrderBtn>
      </BottomActionBar>
      {clicked ? (
        <DetailPageModal setClicked={setClicked} item={product} />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  height: 100vh;
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

const ProductName = styled.p`
  margin-left: 20px;
`;

const Star = styled.p`
  margin-left: 20px;
`;

const Price = styled.span`
  margin-left: 20px;
`;

const Tabs = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  border: 1px solid black;
  padding: 10px 0px;
  border: none;
  background-color: ${props => (props.isActive ? '#149211' : '#E0E0E0')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#AAAAAA')};
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
