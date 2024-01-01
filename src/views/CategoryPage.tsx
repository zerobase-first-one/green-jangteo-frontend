import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ProductListItem from '../Product/ProductListItem';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import customAxios from '../apiFetcher/customAxios';

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

const CategoryPage = () => {
  const [products, setProducts] = useState([
    //    {
    //       productId: 0,
    //       productName: "",
    //       price: 0,
    //       categories: {
    //           firstCategory: "",
    //           secondCategory: ""
    //       },
    //       createdAt: 0,
    //       modifiedAt: 0,
    //       membership: boolean
    //   },
  ]);

  useEffect(() => {
    customAxios
      .get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  const { firstCategory } = useParams();
  const { secondCategory } = useParams();

  return (
    <>
      <Header />
      <Wrapper>
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
          secondCategory !== undefined
            ? secondCategory == item.categories[1] && (
                <ProductListItem
                  productId={item.productId}
                  image={item.image}
                  title={item.productName}
                  price={item.price}
                  key={item.productId}
                  // membership={item.membership}
                  width={`50%`}
                />
              )
            : firstCategory == item.categories[0] && (
                <ProductListItem
                  productId={item.productId}
                  image={item.image}
                  title={item.productName}
                  price={item.price}
                  key={item.productId}
                  // membership={item.membership}
                  width={`50%`}
                />
              ),
        )}
      </Wrapper>
      <Footer />
      <NavBar />
    </>
  );
};

export default CategoryPage;
