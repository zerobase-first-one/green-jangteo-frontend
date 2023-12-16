import styled from "styled-components";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";

const Wrapper = styled.div`
   min-height: inherit;
   background-color:#f1f1f1;
   &::after {
      content: "";
      display: block;
      clear: both;
   }
`;
const Container = styled.div`
   padding: 0 20px;
   padding-bottom: 30px;
   background-color: #ffffff; 
   border-top: 1px solid #b0b0b0;
   border-bottom: 1px solid #b0b0b0;
`;
const Title = styled.div`
   font-weight: bold;
   border-bottom: 1px solid #909090;
   padding: 20px 0;
   font-size: 18px;
`
const TextBox = styled.div`
   display: flex;
   flex-direction: column;
   padding: 10px 0;
`;
const OrderName = styled.div`
   display: flex;
   justify-content: space-aroud;
   padding: 10px 0;
`;
const OrderInfo = styled.span`
   margin-left: auto;

`;

const Order = () => {
   return (
      <>
      <HeaderPrevPageBtn />
      <Wrapper>
      <Container>
         <Title>배송지</Title>
         <TextBox>
            <OrderName>이름
               <OrderInfo>@주문자</OrderInfo>
               </OrderName>
            <OrderName>연락처
               <OrderInfo>@전화번호</OrderInfo>
               </OrderName>
            <OrderName>배송지
               <OrderInfo>@도로명주소</OrderInfo>
               </OrderName>
         </TextBox>
      </Container>
      <Container>
         <Title>주문 상품</Title>
      </Container>

      </Wrapper>
      </>
      
   )
}

export default Order