import React from "react";
import styled from "styled-components";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useReducer } from "react";

const HeaderWrapper = styled.div`
  background-color: #16a114;
  width: 100%;
  height: 120px;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100px;
  padding: 0 20px;
`;

const Logo = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
`;

const CategoryBtn = styled.button`
  background: none;
  border: none;
  font: inherit;
  line-height: 1;
  margin: 0;
  padding: 0;
  cursor: pointer;

  position: relative;
  font-size: 32px;
  color: white;
  order: -1;
`;

const Navigation = styled.nav`
  position: absolute;
  left: 0;
  top: 100px;
  right: 0;
  bottom: auto;
  background-color: #ededed;
  padding-bottom: 500px;
  height: 620px;
`;

const Ul1deps = styled.ul``;

const CategoryList = styled.li`
  width: 150px;
  text-indent: 20px;
  line-height: 45px;

  &:hover {
    font-weight: bold;
    background-color: #ffffff;
  }
`;

const Ul2deps = styled.ul`
  position: absolute;
  top: 0;
  left: 150px;
  right: 0;
  bottom: 0;
  display: none;
  background-color: #ffffff;

  ${CategoryList}:hover & {
    font-weight: normal;
    display: block;
  }
`;

const List = styled.li`
  display: block;
  width: 100%;

  &:hover {
    font-weight: bold;
  }
`;

const UtilBtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const categories = [
    {
      firstCategory: "음식",
      secondCategoryList: [
        { secondCategory: "스낵" },
        { secondCategory: "과일" },
      ],
    },
    {
      firstCategory: "의류",
      secondCategoryList: [
        { secondCategory: "상의" },
        { secondCategory: "하의" },
      ],
    },
  ];

  const [display, setDisplay] = useReducer(
    (val) => (val === "none" ? "block" : "none"),
    "none"
  );

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo>
          <span
            style={{
              display: "block",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            그린장터
          </span>
        </Logo>
        <CategoryBtn
          type="button"
          onClick={setDisplay}
        >
          {display === "none" ? <TbMenu2 /> : <IoClose />}
          <span
            style={{
              display: "block",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            카테고리
          </span>
        </CategoryBtn>
        <Navigation style={{ display }}>
          <Ul1deps>
            {categories.map((category: any) => (
              <CategoryList key={category.firstCategory}>
                <List>
                  <Link to={`/${category.firstCategory}`} onClick={setDisplay}>
                    {category.firstCategory}
                  </Link>
                </List>
                <Ul2deps key={category.firstCategory}>
                  {category.secondCategoryList.map((list: any) => (
                    <List key={list.secondCategory}>
                      <Link
                        to={`/${category.firstCategory}/${list.secondCategory}`}
                        onClick={setDisplay}
                      >
                        {list.secondCategory}
                      </Link>
                    </List>
                  ))}
                </Ul2deps>
              </CategoryList>
            ))}
          </Ul1deps>
        </Navigation>
        <UtilBtnBox>
          <button type="button">
            <FaBell />
            <span
              style={{
                display: "block",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              알림
            </span>
          </button>
          <button type="button">
            <FaShoppingCart />
            <span
              style={{
                display: "block",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              장바구니
            </span>
          </button>
        </UtilBtnBox>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
