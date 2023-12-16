import { useParams } from "react-router-dom";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";
import addCommaPrice from "../../../public/module/addComma";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../constant/union";

const Wrapper = styled.div`
  background-color: #f1f1f1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-top: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  &:first-child {
    // margin-bottom: 0;
    border-top: none;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;
const OrderDate = styled.span`
  margin-bottom: 20px;
`;
const OrderNumber = styled.span`
  margin-bottom: 20px;
`;

const OrderProductBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;
const ProductImgBox = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 30px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductQuantity = styled.span`
  color: #b0b0b0;
  font-size: 14px;
`;
const ProductPrice = styled.span``;

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
`;
const OrderTitle = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-aroud;
`;
const OrderInfo = styled.span`
  margin-left: auto;

  &.shippingInfo {
    display: flex;
    flex-direction: column;
    text-align: right;
    line-height: 1.5em;
  }

  &.totalPrice {
    font-weight: bold;
  }
`;
const Box = styled.div``;

const SellerOrderDetail = () => {
  const order = {
    orderId: 1,
    buyer: {
      buyerName: `구매자이름1`,
      buyerPhone: 11111111,
      shippingAddress: {
        city: `서울시`,
        street: `테헤란로`,
        zipcode: 65489,
        detailedAddress: `1450호`,
      },
    },
    storeName: `상점1`,
    orderProducts: [
      {
        orderProductId: 1,
        productToOrder: {
          productId: 1,
          name: `아이템1`,
          imageUrl: `https://cdn.pixabay.com/photo/2017/01/20/15/12/oranges-1995079_1280.jpg`,
        },
        quantity: 1,
        orderPrice: 10000,
      },
      {
        orderProductId: 2,
        productToOrder: {
          productId: 2,
          name: `아이템2`,
          imageUrl: `https://cdn.pixabay.com/photo/2017/01/20/15/12/oranges-1995079_1280.jpg`,
        },
        quantity: 2,
        orderPrice: 20000,
      },
    ],
    //   usedCoupons: [
    //     {
    //       couponId: Long,
    //       couponName: String,
    //       amount: int,
    //     },
    //     {
    //       couponId: Long,
    //       couponName: String,
    //       amount: int,
    //     },
    //   ],
    totalOrderPrice: 205454,
    //   membershipDiscount: int,
    //   totalCouponDiscount: int,
    //   totalOrderPriceAfterDiscountAndCoupons: int,
    //   deliveryFee: int,
    //   amountToPay: int,
    //   usedReserve: int,
    //   orderStatus: String,
    //   delivery: {
    //     invoiceNumber: String,
    //   },
    createdAt: `2013.12.13`,
    //   modifiedAt: LocalDateTime,
  };

  // const location = useLocation();
  // console.log(location.state);
  // const product = location.state.item;

  const { orderId } = useParams();
  // const [order, setOrder] = useState(api);
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/orders/${orderId}`)
  //     .then((response) => {
  //       setOrder(response.data);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Container>
          <OrderDate>{order.createdAt}</OrderDate>
          <OrderNumber>주문번호: {orderId}</OrderNumber>
          {order.orderProducts.map((item) => (
            <OrderProductBox key={item.orderProductId}>
              <ProductImgBox>
                <Image src={item.productToOrder.imageUrl}></Image>
              </ProductImgBox>
              <ProductInfoBox>
                <ProductName>{item.productToOrder.name}</ProductName>
                <ProductQuantity>수량: {item.quantity}</ProductQuantity>
                <ProductPrice>{addCommaPrice(item.orderPrice)} 원</ProductPrice>
              </ProductInfoBox>
            </OrderProductBox>
          ))}
        </Container>
        <Container>
          <Title>배송 정보</Title>
          <TextBox>
            <OrderTitle>
              이름
              <OrderInfo>{order.buyer.buyerName}</OrderInfo>
            </OrderTitle>
            <OrderTitle>
              연락처
              <OrderInfo>{order.buyer.buyerPhone}</OrderInfo>
            </OrderTitle>
            <OrderTitle>
              주소
              <OrderInfo className="shippingInfo">
                {order.buyer.shippingAddress.zipcode}

                <Box>
                  {order.buyer.shippingAddress.city}{" "}
                  {order.buyer.shippingAddress.street}
                </Box>
                {order.buyer.shippingAddress.detailedAddress}
              </OrderInfo>
            </OrderTitle>
          </TextBox>
        </Container>
        <Container>
          <Title>결제 정보</Title>
          <TextBox>
            <OrderTitle>
              결제 금액
              <OrderInfo className="totalPrice">
                {addCommaPrice(order.totalOrderPrice)}
              </OrderInfo>
            </OrderTitle>
          </TextBox>
        </Container>
      </Wrapper>
    </>
  );
};

export default SellerOrderDetail;
