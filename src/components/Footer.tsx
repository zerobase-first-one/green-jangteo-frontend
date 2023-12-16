import styled from "styled-components";

import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100px;
  background-color: #dedede;
  margin-top: 80px;
  padding: 20px;
  margin-bottom: 100px;
`;
const FooterList = styled.ul`
  li {
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <FooterList>
        <Link to={"/posts/allPost"}>
          <li>고객센터</li>
        </Link>
      </FooterList>
    </Wrapper>
  );
};

export default Footer;
