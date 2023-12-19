import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import { NavLink, Outlet, useMatch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import addCommaPrice from '../../../public/module/addComma';
import { BASE_URL } from '../../constant/union';

const Wrapper = styled.div`
  padding: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 10px 20px;
  background-color: #dedede;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;
const Box = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const ImageBox = styled.div`
  width: 40%;
  padding-bottom: 40%;
  margin-right: 30px;
  background-color: #dedede;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 100%;
    margin-right: 0;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const TextBox = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const Text = styled.span`
  font-size: 24px;
  padding: 10px 0;

  &.productName {
    font-size: 26px;
    font-weight: bold;
    padding: 20px 0;
  }
  &.inventory {
    font-size: 18px;
    color: #999999;
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

interface Info {
  categories: [
    {
      category: string;
    },
    {
      category: string;
    },
  ];
  productName: string;
  price: number;
  description: string;
  count: number; //inventory
  id: number;
  images: [
    {
      position: number;
      url: '';
    },
  ];
}

const SellerProductDetail = () => {
  const [product, setProduct] = useState<Info>({
    categories: [
      {
        category: '',
      },
      {
        category: '',
      },
    ],
    productName: '',
    price: 0,
    description: '',
    count: 0, //inventory
    id: 0,
    images: [
      {
        position: 0,
        url: '',
      },
    ],
  });
  const { productId } = useParams();
  console.log(product);
  useEffect(() => {
    axios
      // .get(`http://localhost:3000/post/${productId}`)
      .get(`${BASE_URL}products/${productId}/description,`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(err => console.log(err.message));
  }, [productId]);

  const orderMatch = useMatch('/stores/:userId/products/:productId/review');

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <BtnBox>
          <Button>수정</Button>
          <Button>삭제</Button>
        </BtnBox>
        <Box>
          <ImageBox>
            <Image src={product.images[0].url} />
          </ImageBox>
          <TextBox>
            <Text className="productName">{product.productName}하이</Text>
            <Text>{addCommaPrice(product.price)} 원</Text>
            <Text className="inventory">
              재고 : {addCommaPrice(product.count)} 개
            </Text>
          </TextBox>
        </Box>
        <Tabs>
          <NavLink to={''} end={orderMatch !== null ? true : false}>
            <Tab>상품설명</Tab>
          </NavLink>
          <NavLink to={'review'}>
            <Tab>리뷰</Tab>
          </NavLink>
        </Tabs>
        <Div>
          <Outlet />
        </Div>
      </Wrapper>
    </>
  );
};

export default SellerProductDetail;
