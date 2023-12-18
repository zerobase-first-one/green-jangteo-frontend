import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ImLeaf } from 'react-icons/im';
import Slick from './slick';
import ProductListItem from './ProductListItem';
import customAxios from '../apiFetcher/customAxios';
// import { useRecoilValue } from 'recoil';
// import { tokenState } from '../store/atom/auth';

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 50px 0 20px;
`;

const ProductList = () => {
  const [products, setProducts] = useState([
    //  {
    //    productId: 0,
    //    productName: "",
    //    price: 0,
    //    categories: {
    //      firstCategory: "",
    //      secondCategory: "",
    //    },
    //    createdAt: 0,
    //    modifiedAt: 0,
    //    membership: boolean,
    //  },
  ]);
  // const token = useRecoilValue(tokenState);

  useEffect(() => {
    customAxios
      .get('/products')
      .then(response => {
        setProducts(response.data);
        console.log(response);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Wrapper>
      <Title>
        멤버십 제품
        <ImLeaf
          style={{
            marginLeft: '5px',
            transform: 'translateY(2px)',
            color: 'var(--maincolor)',
          }}
        />
      </Title>
      <Slick>
        {products.map((item: any) => (
          // item.membership == true && (
          <ProductListItem
            image={item.image}
            title={item.productName}
            price={item.price}
            key={item.productId}
            width={`100%`}
          />
        ))}
      </Slick>
      <Title>음식</Title>
      <Slick>
        {products.map(
          (item: any) =>
            item.categories.firstCategory == `음식` && (
              <ProductListItem
                image={item.image}
                title={item.productName}
                price={item.price}
                key={item.productId}
                width={`100%`}
              />
            ),
        )}
      </Slick>
      <Title>의류</Title>
      <Slick>
        {products.map(
          (item: any) =>
            item.categories.firstCategory == `의류` && (
              <ProductListItem
                image={item.image}
                title={item.productName}
                price={item.price}
                key={item.productId}
                width={`100%`}
              />
            ),
        )}
      </Slick>
      <Title>하의</Title>
      <Slick>
        {products.map(
          (item: any) =>
            item.categories.secondCategory == `하의` && (
              <ProductListItem
                image={item.image}
                title={item.productName}
                price={item.price}
                key={item.productId}
                width={`100%`}
              />
            ),
        )}
      </Slick>
    </Wrapper>
  );
};

export default ProductList;
