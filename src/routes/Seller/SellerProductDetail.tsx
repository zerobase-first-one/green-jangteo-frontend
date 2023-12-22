import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import {
  Link,
  NavLink,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import addCommaPrice from '../../../public/module/addComma';
import customAxios from '../../apiFetcher/customAxios';
// import axios from 'axios';
// import { BASE_URL } from '../../constant/union';

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
  images: [
    {
      position: number;
      url: string;
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
}

const SellerProductDetail = () => {
  const [product, setProduct] = useState<Info>({
    categories: [
      {
        category: '음식',
      },
      {
        category: '의류',
      },
    ],
    productName: '상품명입니다',
    price: 20000,
    description: '이것은 설명입니다',
    count: 20, //inventory
    images: [
      {
        position: 0,
        url: ``,
      },
    ],
    review: [
      {
        content: '와우',
        createdAt: '2023-12-19T18:22:27.989Z',
        imageUrl:
          'https://cdn.pixabay.com/photo/2016/12/10/21/28/plums-1898196_1280.jpg',
        modifiedAt: '',
        productId: 0,
        score: 0,
        userId: 0,
      },
    ],
  });
  // const { userId } = useParams();
  const { productId } = useParams();
  console.log(product);
  useEffect(() => {
    customAxios
      // .get(`/products/${productId}/review`)
      .get(`/products/${productId}/description`)
      // axios
      //   .get(`${BASE_URL}products/${productId}/description,`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, [productId]);

  const orderMatch = useMatch(`/stores/:userId/products/${productId}/review`);

  const navigate = useNavigate();
  const deleteProduct = () => {
    customAxios.delete(`/products/${productId}`);
    alert('삭제되었습니다.');
    navigate(-1);
  };

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <BtnBox>
          <Link to={`/stores/products/${productId}`} state={product}>
            <Button>수정</Button>
          </Link>
          <Button onClick={deleteProduct}>삭제</Button>
        </BtnBox>
        <Box>
          <ImageBox>
            <Image src={product.images[0].url} />
          </ImageBox>
          <TextBox>
            <Text className="productName">{product.productName}</Text>
            <Text>{addCommaPrice(product.price)} 원</Text>
            <Text className="inventory">
              재고 : {addCommaPrice(product.count)} 개
            </Text>
          </TextBox>
        </Box>
        <Tabs>
          <NavLink
            to={'description'}
            end={orderMatch !== null ? true : false}
            state={product}
          >
            <Tab>상품설명</Tab>
          </NavLink>
          <NavLink to={'review'}>
            <Tab>리뷰</Tab>
          </NavLink>
        </Tabs>
        <Div>
          <Outlet context={product} />
        </Div>
      </Wrapper>
    </>
  );
};

export default SellerProductDetail;

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
