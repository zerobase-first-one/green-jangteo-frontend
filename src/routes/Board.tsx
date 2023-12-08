import styled from "styled-components";
import Header from "../components/Header";
import { Outlet, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  width: 430px;
  height: 800px;
  background-color: #e7e7e7;
`;

const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  font-size: 24px;
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px 0px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#149211" : "#E0E0E0")};
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#AAAAAA")};
`;

const PostButton = styled.button`
  position: absolute;
  bottom: 65px;
  right: 30px;
  background-color: #999999;
  width: 125px;
  height: 50px;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

export default function Board() {
  const allPostMatch = useMatch("/posts/all-post");
  const myPostMatch = useMatch("/posts/my-post");

  return (
    <Wrapper>
      <Header />
      <Tabs>
        <Tab isActive={allPostMatch !== null}>
          <Link to="all-post">전체 문의</Link>
        </Tab>
        <Tab isActive={myPostMatch !== null}>
          <Link to="my-post">나의 문의</Link>
        </Tab>
      </Tabs>
      <Outlet />
      <Link to={"/create-post"}>
        <PostButton>글쓰기</PostButton>
      </Link>
    </Wrapper>
  );
}
