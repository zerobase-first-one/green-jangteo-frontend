import styled from 'styled-components';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import { useEffect, useState } from 'react';
import customAxios from '../apiFetcher/customAxios';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [currentValue, setCurrentValue] = useState([]);
  console.log(currentValue);
  useEffect(() => {
    customAxios
      .get('/products/auto-complete', { params: { keyword: currentValue } })
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err.message));
  }, [currentValue]);
  console.log(products);

  // dfdsdfdddddddddddddddddddddddddddddddd
  const [coupon, setCoupon] = useState([]);
  console.log(coupon);
  useEffect(() => {
    customAxios
      .get('/coupon-groups')
      .then(response => {
        setCoupon(response.data);
      })
      .catch(err => console.log(err.message));
  }, [currentValue]);
  console.log(products);
  // 여기까지지ㅣㅣㅣㅣㅣㅣㅣㅣ

  const autoComplete = (e: any) => {
    const currentValue = e.target.value;
    setCurrentValue(currentValue);
  };

  return (
    <>
      <Wrapper>
        <HeaderPrevPageBtn />
        <Input
          placeholder="검색어를 입력해주세요"
          type="text"
          onChange={e => autoComplete(e)}
        />

        <ItemList>
          {products.map((product: any, idx) => (
            <Item key={idx}>{product.productName}</Item>
          ))}
        </ItemList>
      </Wrapper>
    </>
  );
};

export default Search;

const Wrapper = styled.div`
  min-height: inherit;
  box-sizing: border-box;
  background-color: #f1f1f1;
`;
const Input = styled.input`
  width: 100%;
  height: 60px;
  font-size: 18px;
  border: none;
  text-indent: 10px;
  border-bottom: 1px solid #cccccc;
  &:focus {
    outline: none;
  }
`;

const ItemList = styled.ul`
  background-color: #ffffff;
  padding: 10px 0;
`;
const Item = styled.li`
  height: 50px;
  line-height: 50px;
  text-indent: 10px;
  font-size: 18px;
`;
