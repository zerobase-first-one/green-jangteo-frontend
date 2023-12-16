import styled from "styled-components";
import HeaderPrevPageBtn from "../components/HeaderPrevPageBtn";
import { useState } from "react";

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
  &:focus {
    outline: none;
  }
`;

const ItemList = styled.ul`
  background-color: #ffffff;
`;
const Item = styled.li`
  height: 20px;
  text-indent: 10px;
  font-size: 18px;
`;

const itemsData = [
  { name: "감귤" },
  { name: "감귤1" },
  { name: "사과1" },
  { name: "감귤1" },
  { name: "감귤2" },
];

const Search = () => {
  const [filteredItem, setFilteredItem] = useState([]);

  const autoComplete = (e: any) => {
    const currentValue = e.target.value;
    const filtered = itemsData.filter((item) =>
      item.name.includes(currentValue),
    );
    {
      currentValue !== "" ? setFilteredItem(filtered) : setFilteredItem([]);
    }
  };

  return (
    <>
      <Wrapper>
        <HeaderPrevPageBtn />
        <Input
          placeholder="검색어를 입력해주세요"
          type="text"
          onChange={(e) => autoComplete(e)}
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
