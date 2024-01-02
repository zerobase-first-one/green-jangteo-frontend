import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ProductListItem from '../Product/ProductListItem';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import customAxios from '../apiFetcher/customAxios';

const CategoryPage = () => {
  const { firstCategory } = useParams();
  const { secondCategory } = useParams();

  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    customAxios
      .get('/products', { params: { page: 0, size: 6 } })
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  const [what, setWhat] = useState({});
  console.log(what, `category`);
  useEffect(() => {
    customAxios
      .get(`/products/category`, {
        params: { category: firstCategory },
      })
      .then(response => {
        setWhat(response.data);
        // console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, [firstCategory]);

  return (
    <>
      <Header />
      <Wrapper key={secondCategory}>
        <CategoryNameBox>
          <FirstCategory>
            <Link to={`/${firstCategory}`}>{firstCategory}</Link>
          </FirstCategory>
          {secondCategory !== undefined && (
            <SecondCategory>
              <IoIosArrowForward style={{ margin: '0 5px' }} />
              {secondCategory}
            </SecondCategory>
          )}
        </CategoryNameBox>
        {products.map((item: any) =>
          secondCategory !== undefined ? (
            secondCategory == item.categories.secondCategory ? (
              <Div>
                <ProductListItem
                  productId={item.productId}
                  image={item.image}
                  title={item.productName}
                  price={item.price}
                  key={item.productId}
                  // membership={item.membership}
                  width={`100%`}
                />
              </Div>
            ) : (
              void 0
            )
          ) : firstCategory == item.categories.firstCategory ? (
            <Div>
              <ProductListItem
                productId={item.productId}
                image={item.image}
                title={item.productName}
                price={item.price}
                key={item.productId}
                // membership={item.membership}
                width={`100%`}
              />
            </Div>
          ) : (
            void 0
          ),
        )}
      </Wrapper>
      <Footer />
      <NavBar />
    </>
  );
};

export default CategoryPage;

const Wrapper = styled.div`
  padding: 0 20px;
  height: 100%;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;
const CategoryNameBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 50px 0 20px;
`;
const FirstCategory = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;
const SecondCategory = styled.h3`
  display: flex;
  align-items: center;
`;
const Div = styled.div`
  float: left;
  width: calc(100% / 3);

  @media screen and (max-width: 768px) {
    width: 50%;
    padding-bottom: 100%;
    margin-right: 0;
  }
`;
