import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../constant/union';
// import { BASE_URL } from "../../constant/union";

const Wrapper = styled.div`
  width: 100%;
  // height: 100px;
  // background-color: #dedede;
`;
const Ul = styled.ul`
  padding: 20px 0;
`;
const List = styled.li`
  a {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #dedede;
  }

  &:last-child a {
    border-bottom: none;
  }
`;
const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  background-color: #dedede;
  overflow: hidden;
`;
const Img = styled.img`
  width: 120px;
  height: 120px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 24px;
`;
const ProductName = styled.strong`
  // font-weight: bold;
`;
const ProductRate = styled.div``;
const ProductPrice = styled.span``;

interface Info {
  // storeProductDtos: [
  //   {
  averageScore: number;
  // createdAt: "2023-12-16T14:40:57.955Z";
  imageUrl: string;
  // modifiedAt: "2023-12-16T14:40:57.955Z";
  price: number;
  productName: string;
  //   },
  // ];
}

const SellerProductList = () => {
  const [products, setProducts] = useState<Info[]>([
    {
      // storeProductDtos: [
      // {
      averageScore: 0,
      imageUrl: '',
      price: 0,
      productName: '',
      // },
      // ],
    },
  ]);
  console.log(products);
  const { userId } = useParams();

  console.log(products);
  useEffect(() => {
    axios
      // .get(`http://localhost:3000/post/${userId}`)
      .get(`${BASE_URL}/stores/${userId}`)
      .then(response => {
        setProducts(response.data.storeProductDtos);
      })
      .catch(err => console.log(err.message));
  }, [userId]);

  return (
    <Wrapper>
      <Ul>
        {products.map((product: any, idx: number) => (
          <List key={idx}>
            <Link to={`/stores/:userId/products/${product.id}`}>
              <ImgBox>
                <Img src={product.imageUrl} />
              </ImgBox>
              <InfoBox>
                <ProductName>{product.productName}</ProductName>
                <ProductRate>★★★★★({product.averageScore})</ProductRate>
                <ProductPrice>{addCommaPrice(product.price)}원</ProductPrice>
              </InfoBox>
            </Link>
          </List>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default SellerProductList;
