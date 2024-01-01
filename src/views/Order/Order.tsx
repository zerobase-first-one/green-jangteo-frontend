import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import addCommaPrice from '../../../public/module/addComma';
import { useEffect } from 'react';
import customAxios from '../../apiFetcher/customAxios';

interface OrderInfo {
  buyerId: number;
  orderProductRequestDtos: [
    {
      productId: number;
      quantity: number;
    },
  ];
  sellerId: 1;
  shippingAddressDto: {
    city: string;
    detailedAddress: string;
    street: string;
    zipcode: number;
  };
}

const Order = () => {
  useEffect(() => {
    customAxios.get;
  });
  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Container>
          <Title>배송지</Title>
          <TextBox>
            <OrderName>
              이름
              <OrderInfo>@주문자</OrderInfo>
            </OrderName>
            <OrderName>
              연락처
              <OrderInfo>@전화번호</OrderInfo>
            </OrderName>
            <OrderName>
              배송지
              <OrderInfo>@도로명주소</OrderInfo>
            </OrderName>
          </TextBox>
        </Container>
        <Container>
          <Title>주문 상품</Title>
          <OrderList>
            <OrderListItem>
              <ProductImgBox></ProductImgBox>
              <ProductInfoBox>
                <ProductName>{`상품명`}</ProductName>
                <ProductQuantity>주문 수량: {}개</ProductQuantity>
                <ProductPrice>{addCommaPrice(100000)} 원</ProductPrice>
              </ProductInfoBox>
            </OrderListItem>
          </OrderList>
        </Container>
        <Container>
          <Title>최종 결제금액 확인</Title>
          <TextBox>
            <OrderName>
              총 상품금액
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              멤버십 할인
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              쿠폰 할인
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
          </TextBox>
          <TextBox>
            <OrderName>
              주문 금액
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              배송비
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              적립금 사용
              <OrderInfo>{addCommaPrice(10000)} 원</OrderInfo>
            </OrderName>
          </TextBox>
          <TextBox style={{ border: `none` }}>
            <OrderName>
              결제하실 금액
              <OrderInfo className="orderPrice">
                {addCommaPrice(10000)} 원
              </OrderInfo>
            </OrderName>
          </TextBox>
          <OrderBtn>주문하기</OrderBtn>
        </Container>
      </Wrapper>
    </>
  );
};

export default Order;

const Wrapper = styled.div`
  background-color: #f1f1f1;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;
const Container = styled.div`
  padding: 0 20px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-top: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 100px;
  }
`;
const Title = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #909090;
  padding: 20px 0;
  font-size: 18px;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #b0b0b0;
  }
`;
const OrderName = styled.div`
  display: flex;
  justify-content: space-aroud;
  padding: 10px 0;
`;
const OrderInfo = styled.span`
  margin-left: auto;
  &.orderPrice {
    font-weight: bold;
    color: var(--maincolor);
  }
`;
const OrderList = styled.ul`
  padding: 20px 10px;
  border-bottom: 1px solid #b0b0b0;
`;
const OrderListItem = styled.li`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #b0b0b0;
  &:first-child {
    padding: 0;
  }
  &:last-child {
    border: none;
  }
`;
const ProductImgBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: #cccccc;
  margin-right: 15px;
`;
const ProductInfoBox = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.div``;
const ProductQuantity = styled.span`
  color: #b0b0b0;
  font-size: 14px;
`;
const ProductPrice = styled.span`
  text-align: right;
`;
const OrderBtn = styled.button`
  background: var(--maincolor);
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
  padding: 0;
  width: 100%;
`;
