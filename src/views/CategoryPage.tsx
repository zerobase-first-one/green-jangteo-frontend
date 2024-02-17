import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ProductListItem from '../Product/ProductListItem';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// import customAxios from '../apiFetcher/customAxios';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';

const CategoryPage = () => {
  const { firstCategory } = useParams();
  const { secondCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  console.log(page);
  console.log(products);

  useEffect(() => {
    // customAxios
    //   .get('/products', { params: { page: page, size: 8 } })
    axios
      .get(`../product-dummy.json`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err.message));
  }, [page]);

  // const [what, setWhat] = useState([]);
  // console.log(what, `category`);
  // useEffect(() => {
  //   customAxios
  //     .get(`/products/category`, {
  //       params: {
  //         category: secondCategory,
  //         paged: false,
  //         pageSize: 1,
  //         pageNumber: 0,
  //         offset: 1,
  //         unpaged: true,
  //       },
  //     })
  //     .then(response => {
  //       setWhat(response.data);
  //       // console.log(response.data);
  //     })
  //     .catch(err => console.log(err.message));
  // }, []);

  // const navigate = useNavigate();
  const plusPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0 });
  };
  const minusPage = () => {
    if (page > 0) setPage(page - 1);
    window.scrollTo({ top: 0 });
  };

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
        <Products>
          {products.map((item: any) =>
            secondCategory !== undefined ? (
              secondCategory == item.categories[1].secondCategory ? (
                <Div>
                  <ProductListItem
                    productId={item.productId}
                    image={item.image}
                    title={item.productName}
                    price={item.price}
                    key={item.productId}
                    width={`100%`}
                  />
                </Div>
              ) : (
                void 0
              )
            ) : firstCategory == item.categories[0].firstCategory ? (
              <Div>
                <ProductListItem
                  productId={item.productId}
                  image={item.image}
                  title={item.productName}
                  price={item.price}
                  key={item.productId}
                  width={`100%`}
                />
              </Div>
            ) : (
              void 0
            ),
          )}
        </Products>
        <BtnBox onClick={minusPage}>
          <Button>
            <MdKeyboardArrowLeft />
            이전
          </Button>
          <Button onClick={plusPage}>
            다음
            <MdKeyboardArrowRight />
          </Button>
        </BtnBox>
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
const Products = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;
const Div = styled.div`
  float: left;
  width: calc(100% / 3);

  @media screen and (max-width: 768px) {
    width: 50%;
    // padding-bottom: 100%;
    margin-right: 0;
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  background-color: transparent;
  font-size: 16px;
  border: none;
  margin: 0 10px;
  display: flex;
  align-items: center;
`;
