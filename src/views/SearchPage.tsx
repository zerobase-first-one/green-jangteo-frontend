import { useEffect, useState } from 'react';
import customAxios from '../apiFetcher/customAxios';
import { useLocation } from 'react-router-dom';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import styled from 'styled-components';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import ProductListItem from '../Product/ProductListItem';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState([]);
  const location = useLocation();
  const keyword = location.state;

  const [page, setPage] = useState(0);
  console.log(page);

  useEffect(() => {
    customAxios
      .get('/products/keyword', {
        params: { keyword: keyword, page: page, size: 6 },
      })
      .then(response => {
        setSearchKeyword(response.data);
      })
      .catch(err => console.log(err.message));
  }, [keyword, page]);
  console.log(searchKeyword);

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
      <HeaderPrevPageBtn />
      <Wrapper>
        <CategoryNameBox>
          <Title>
            "{keyword}" <Content>검색어로 검색한 결과</Content>
          </Title>
        </CategoryNameBox>
        <Products>
          {searchKeyword.map((item: any) => (
            <Div>
              <ProductListItem
                productId={item.id}
                image={item.images[0].url}
                title={item.name}
                price={item.price}
                key={item.productId}
                // membership={item.membership}
                width={`100%`}
              />
            </Div>
          ))}
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

export default SearchPage;

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
const Title = styled.h2`
  font-size: 24px;
  // font-weight: bold;
  margin-bottom: 10px;
`;
const Content = styled.span`
  font-size: 18px;
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
