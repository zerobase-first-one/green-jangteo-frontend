import { useParams } from 'react-router-dom';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import { useEffect, useState } from 'react';
import customAxios from '../../apiFetcher/customAxios';

interface OrderDetail {
  amountToPay: number;
  buyerResponseDto: {
    buyerName: string;
    buyerPhone: number;
    shippingAddressDto: {
      city: string;
      street: string;
      zipcode: string;
      detailedAddress: string;
    };
  };
  orderId: number;
  orderProductResponseDtos: [
    {
      orderPrice: number;
      orderProductId: string;
      productToOrderResponseDto: {
        productId: string;
        name: string;
        imageUrl: string;
      };
      quantity: number;
    },
  ];
  orderStatus: string;
  storeName: string;
  totalOrderPrice: number;
  createdAt: string;
}

const SellerOrderDetail = () => {
  const { orderId } = useParams();

  const { userId } = useParams();
  const [order, setOrder] = useState<OrderDetail>({
    amountToPay: 0,
    buyerResponseDto: {
      buyerName: '',
      buyerPhone: 0,
      shippingAddressDto: {
        city: '',
        street: '',
        zipcode: '',
        detailedAddress: '',
      },
    },
    orderId: 0,
    orderProductResponseDtos: [
      {
        orderPrice: 0,
        orderProductId: '',
        productToOrderResponseDto: {
          productId: '',
          name: '',
          imageUrl: `https://cdn.pixabay.com/photo/2017/01/20/15/12/oranges-1995079_1280.jpg`,
        },
        quantity: 0,
      },
    ],
    orderStatus: '',
    storeName: '',
    totalOrderPrice: 0,
    createdAt: '',
  });
  useEffect(() => {
    customAxios
      .get(`/orders/${orderId}`, { params: { userId: userId } })
      .then(response => {
        setOrder(response.data);
      })
      .catch(err => console.log(err.message));
  }, [orderId, userId]);

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Container>
          <OrderDate>{order.createdAt.slice(0, 10)}</OrderDate>
          <OrderNumber>주문번호: {orderId}</OrderNumber>
          <Ul>
            {order.orderProductResponseDtos.map((item, idx) => (
              <OrderProductBox key={idx}>
                <ProductImgBox>
                  <Image src={item.productToOrderResponseDto.imageUrl}></Image>
                </ProductImgBox>
                <ProductInfoBox>
                  <ProductName>
                    {item.productToOrderResponseDto.name}
                  </ProductName>
                  <ProductQuantity>수량: {item.quantity}</ProductQuantity>
                  <ProductPrice>
                    {addCommaPrice(item.orderPrice)} 원
                  </ProductPrice>
                </ProductInfoBox>
              </OrderProductBox>
            ))}
          </Ul>
        </Container>
        <Container>
          <Title>배송 정보</Title>
          <TextBox>
            <OrderTitle>
              이름
              <OrderInfo>{order.buyerResponseDto.buyerName}</OrderInfo>
            </OrderTitle>
            <OrderTitle>
              연락처
              <OrderInfo>{order.buyerResponseDto.buyerPhone}</OrderInfo>
            </OrderTitle>
            <OrderTitle>
              주소
              <OrderInfo className="shippingInfo">
                {order.buyerResponseDto.shippingAddressDto.zipcode}
                <Box>
                  {order.buyerResponseDto.shippingAddressDto.city}{' '}
                  {order.buyerResponseDto.shippingAddressDto.street}
                </Box>
                {order.buyerResponseDto.shippingAddressDto.detailedAddress}
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

const Wrapper = styled.div`
  background-color: #f1f1f1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
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
const Ul = styled.ul`
  border-bottom: 1px solid #b0b0b0;
  border-top: 1px solid #b0b0b0;
`;
const OrderProductBox = styled.li`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  border-bottom: 1px solid #d0d0d0;

  &:last-child {
    border-bottom: none;
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
