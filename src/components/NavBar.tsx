import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 1152px;
  trasform: translateX(-24px;)
  height: 100px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);
  font-size: 40px;
  @media screen and (max-width: 1200px) {
      width: calc(100% - 48px);
  }
  @media screen and (max-width: 430px) {
    width: calc(100% - 32px);
  }
  
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;

  button {
    color: #d9d9d9;
    background: none;
    border: none;
    font: inherit;
    line-height: 1;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  button:hover {
    color: var(--maincolor);
  }

  button .blind {
    display: block;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

const NavBar = () => {
  return (
    <Wrapper>
      <Container>
        <Link to={"/"}>
          <button type="button">
            <AiFillHome />
            <span className="blind">홈</span>
          </button>
        </Link>
        <Link to={"/search"}>
          <button type="button">
            <IoSearch />
            <span className="blind">검색</span>
          </button>
        </Link>
        <button type="button">
          <IoIosDocument />
          <span className="blind">주문내역</span>
        </button>
        <Link to={"/users/login"}>
          <button type="button">
            <BsPersonFill />
            <span className="blind">마이페이지</span>
          </button>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default NavBar;
