import { useEffect, useState } from 'react';
import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import { Link, useParams } from 'react-router-dom';
import customAxios from '../../apiFetcher/customAxios';

interface Info {
  averageScore: number;
  imageUrl: string;
  price: number;
  productName: string;
  productId: string;
}

const SellerProductList = () => {
  const [products, setProducts] = useState<Info[]>([
    {
      averageScore: 0,
      imageUrl: '',
      price: 0,
      productName: '',
      productId: '',
    },
  ]);
  console.log(products);
  const { userId } = useParams();

  console.log(products);
  useEffect(() => {
    customAxios
      .get(`/stores/${userId}`, { params: { userId } })
      .then(response => {
        setProducts(response.data.storeProductDtos);
        console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, [userId]);

  return (
    <Wrapper>
      <Ul>
        {products.reverse().map((product: any, idx: number) => (
          <List key={idx}>
            <Link
              to={`/stores/${userId}/products/${product.productId}/description`}
            >
              <ImgBox>
                <Img src={product.imageUrl} />
              </ImgBox>
              <InfoBox>
                <ProductName>{product.productName}</ProductName>
                {/* <ProductRate>★★★★★({product.averageScore})</ProductRate> */}
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

const Wrapper = styled.div`
  width: 100%;
`;
const Ul = styled.ul`
  padding: 20px 0;
`;
const List = styled.li`
  border-bottom: 1px solid #dedede;
  a {
    display: flex;
    padding: 20px;
  }

  &:last-child {
    border-bottom: none;
  }
`;
const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  background-color: #dedede;
  overflow: hidden;
  position: relative;
`;
const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 24px;
`;
const ProductName = styled.strong`
  font-size: 20px;
`;
// const ProductRate = styled.div``;
const ProductPrice = styled.span``;
