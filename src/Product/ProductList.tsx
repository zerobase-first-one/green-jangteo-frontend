import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Slick from './slick';
import ProductListItem from './ProductListItem';
// import axios from 'axios';
import customAxios from '../apiFetcher/customAxios';
interface List {
  productName: string;
  price: number;
  productId: string;
  categories: [{ firstCategory: string }, { secondCategory: string }];
  images: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<List[]>([
    {
      productId: '',
      productName: '',
      price: 0,
      categories: [{ firstCategory: '' }, { secondCategory: '' }],
      images:
        'https://cdn.pixabay.com/photo/2016/12/10/21/28/plums-1898196_1280.jpg',
    },
  ]);
  console.log(products);

  useEffect(() => {
    // axios
    // .get(`../product-dummy.json`)
    customAxios
      .get('/products', { params: { page: 0, size: 30 } })
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  const ProductsFilterByCategory = (category: string) => {
    const filteredProducts = products.filter(
      (item: any) => item.categories.firstCategory == category,
    );

    const filteredProductsComponents = filteredProducts.map(item => (
      <ProductListItem
        image={item.images}
        title={item.productName}
        price={item.price}
        productId={item.productId}
        key={item.productId}
        width={`100%`}
      />
    ));

    return filteredProductsComponents.length !== 0 ? (
      <Slick>{filteredProductsComponents}</Slick>
    ) : (
      <Text>등록된 상품이 없습니다 🥲</Text>
    );
  };

  return (
    <Wrapper>
      <Title>음식</Title>
      {ProductsFilterByCategory('음식')}
      <Title>의류</Title>
      {ProductsFilterByCategory('의류')}
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 50px 0 20px;
`;

const Text = styled.div`
  padding: 30px;
`;
