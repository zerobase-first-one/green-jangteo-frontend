import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import addCommaPrice from '../../../public/module/addComma';
import { useEffect } from 'react';
// import customAxios from '../../apiFetcher/customAxios';
import { useLocation } from 'react-router-dom';
import { useGetProfile } from '../../hooks/useGetProfile';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';

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
  // {
  //   amountToPay: 0,
  //   buyerResponseDto: {
  //     buyerName: string,
  //     buyerPhone: string,
  //     shippingAddressDto: {
  //       city: 서울,
  //       detailedAddress: 길동아파트 101동 102호,
  //       street: 테헤란로 231,
  //       zipcode: 06142
  //     }
  //   },
  //   createdAt: 2023-12-22T14:30:09.375Z,
  //   modifiedAt: 2023-12-22T14:30:09.375Z,
  //   orderId: 0,
  //   orderProductResponseDtos: [
  //     {
  //       orderPrice: 0,
  //       orderProductId: 0,
  //       productToOrderResponseDto: {
  //         imageUrl: string,
  //         name: string,
  //         productId: 0
  //       },
  //       quantity: 0
  //     }
  //   ],
  //   orderStatus: string,
  //   storeName: string,
  //   totalOrderPrice: 0
  // }
}

const Order = () => {
  const userId = useRecoilValue(userIdState);
  const { fullName, phone, address } = useGetProfile();
  const location = useLocation();
  const products = location.state;
  console.log(products);
  useEffect(() => {});
  const orderPost = () => {
    customAxios
      .post(`/orders`, {
        buyerId: userId,
        orderProductRequestDtos: products,
        sellerId: 2,
        shippingAddressDto: {
          city: address.city,
          detailedAddress: address.detailedAddress,
          street: address.street,
          zipcode: address.zipcode,
        },
      })
      .then(response => {
        console.log(`성공`, response);
        // navigate('/orders');
      })
      .catch(err => console.log(`실패`, err));
  };
  const totalPrice = products
    .map((product: any) => product.price)
    .reduce((prev: number, cur: number) => prev + cur);
  const membershipDiscount = 0;
  const couponDiscount = 0;
  const orderPrice = totalPrice - membershipDiscount - couponDiscount;
  const ShippingFee = orderPrice > 50000 ? 0 : 3000;

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Container>
          <Title>배송지</Title>
          <TextBox>
            <OrderName>
              이름
              <OrderInfo>{fullName}</OrderInfo>
            </OrderName>
            <OrderName>
              연락처
              <OrderInfo>{phone}</OrderInfo>
            </OrderName>
            <OrderName>
              배송지
              <OrderInfo className="shippingInfo">
                {address.zipcode}
                <Box>
                  {address.city} {address.street}
                </Box>
                {address.detailedAddress}
              </OrderInfo>
            </OrderName>
          </TextBox>
        </Container>
        <Container>
          <Title>주문 상품</Title>
          <OrderList>
            {products.map((product: any) => (
              <OrderListItem key={product.productId}>
                <ProductImgBox>
                  <Image src={product.imageUrl} />
                </ProductImgBox>
                <ProductInfoBox>
                  <ProductName>{product.productName}</ProductName>
                  <ProductQuantity>
                    주문 수량: {product.quantity}개
                  </ProductQuantity>
                  <ProductPrice>{addCommaPrice(product.price)} 원</ProductPrice>
                </ProductInfoBox>
              </OrderListItem>
            ))}
          </OrderList>
        </Container>
        <Container>
          <Title>최종 결제금액 확인</Title>
          <TextBox>
            <OrderName>
              총 상품금액
              <OrderInfo>{addCommaPrice(totalPrice)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              멤버십 할인
              <OrderInfo>{addCommaPrice(membershipDiscount)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              쿠폰 할인
              <OrderInfo>{addCommaPrice(couponDiscount)} 원</OrderInfo>
            </OrderName>
          </TextBox>
          <TextBox>
            <OrderName>
              주문 금액
              <OrderInfo>{addCommaPrice(orderPrice)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              배송비
              <OrderInfo>{addCommaPrice(ShippingFee)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              적립금 사용
              <OrderInfo>{addCommaPrice(0)} 원</OrderInfo>
            </OrderName>
          </TextBox>
          <TextBox style={{ border: `none` }}>
            <OrderName>
              결제하실 금액
              <OrderInfo className="orderPrice">
                {addCommaPrice(totalPrice + ShippingFee)} 원
              </OrderInfo>
            </OrderName>
          </TextBox>
          <OrderBtn onClick={orderPost}>주문하기</OrderBtn>
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
  border-bottom: 1px solid #b0b0b0;
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
  &.shippingInfo {
    text-align: right;
  }
`;
const OrderList = styled.ul`
  padding: 5px 10px;
  border-bottom: 1px solid #b0b0b0;
`;
const OrderListItem = styled.li`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
  &:first-child {
    // padding: 0;
  }
  &:last-child {
    border: none;
  }
`;
const ProductImgBox = styled.div`
  background-color: #cccccc;
  margin-right: 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  width: 120px;
  height: 120px;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
const Box = styled.div`
  margin: 7px 0;
`;
