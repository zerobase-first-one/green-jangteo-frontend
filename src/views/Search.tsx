import styled from 'styled-components';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

const itemsData = [
  { name: '감귤' },
  { name: '감귤1' },
  { name: '사과1' },
  { name: '감귤1' },
  { name: '감귤2' },
];

const Search = () => {
  const [filteredItem, setFilteredItem] = useState([]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const q = searchParams.get('limit');
  // useEffect(() => {
  //   fetch(`http://localhost:5173/search/posts?q=${q}`).then(response =>
  //     response.json(),
  //   );
  // }, [offset, limit]);

  // const [productList, setProductList] = useState([]);
  // const [query, setQuery] = useSearchParams();
  // const getProducts = async () => {
  //   const searchQuery = query.get('q') || ''; //=>q로 시작하는 아이템을 가져와서 searchQuery에 넣어줘라. 값이 없으면 빈 스트링을 넣어주겠다
  //   console.log('쿼리값은?', searchQuery);
  //   const url = `http://localhost:5000/products?q=${searchQuery}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setProductList(data);
  // };

  const autoComplete = (e: any) => {
    const currentValue = e.target.value;
    const filtered: any = itemsData.filter(item =>
      item.name.includes(currentValue),
    );
    {
      currentValue !== '' ? setFilteredItem(filtered) : setFilteredItem([]);
    }
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
          {filteredItem.map((item: any, idx) => (
            <Item key={idx}>{item.name}</Item>
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
