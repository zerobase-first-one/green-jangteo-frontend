import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { IoIosDocument } from 'react-icons/io';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';

const NavBar = () => {
  const userId = useRecoilValue(userIdState);

  const generateProfileLink = () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken && userId !== null) {
      return `/users/${userId}/profile`;
    }

    return '/users/login';
  };

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <button type="button">
            <AiFillHome />
            <span className="blind">홈</span>
          </button>
        </Link>
        <Link to="/search">
          <button type="button">
            <IoSearch />
            <span className="blind">검색</span>
          </button>
        </Link>
        <Link to={`/users/${userId}/orderList`}>
          <button type="button">
            <IoIosDocument />
            <span className="blind">주문내역</span>
          </button>
        </Link>
        <Link to={generateProfileLink()}>
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

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 1200px;
  height: 100px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.2);
  font-size: 40px;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  @media screen and (max-width: 430px) {
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;

  button {
    color: #cccccc;
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
