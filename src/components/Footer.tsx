import styled from "styled-components";

const Wrapper = styled.div`
   height: 100px;
   background-color: #dedede;
   margin-top: 80px;
   padding: 20px;
`;
const FooterList = styled.ul`
   li {}
`;



const Footer = () => {


   return (
      <Wrapper>
         <FooterList>
            <li>고객센터</li>
         </FooterList>
      </Wrapper>
   )
}

export default Footer