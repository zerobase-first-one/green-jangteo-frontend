import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Wrapper>
      <FooterList>
        <li>
          <Link to={'/posts'}>그린장터 문의 게시판 바로가기 &rarr;</Link>
        </li>
      </FooterList>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  height: 100px;
  background-color: #222;
  margin-top: 80px;
  padding: 20px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #fff;
    cursor: pointer;

    &:hover {
      color: #16a113;
      text-decoration: underline;
    }
  }
`;
