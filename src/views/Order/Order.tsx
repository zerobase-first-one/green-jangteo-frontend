import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import addCommaPrice from '../../../public/module/addComma';
import { useLocation } from 'react-router-dom';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { useEffect, useState } from 'react';
import OrderConfirm from '../../components/modal/OrderConfirm';
import { userDataState } from '../../store/atom/userDataState';

interface OrderInfo {
  buyerId: number;
  orderProductRequestDtos: [
    {
      productId: string;
      quantity: number;
    },
  ];
  sellerId: 0;
  shippingAddressDto: {
    city: string;
    detailedAddress: string;
    street: string;
    zipcode: number;
  };
}

const Order = () => {
  const userId = useRecoilValue(userIdState);
  const userData = useRecoilValue(userDataState);

  const [coupons, setCoupons] = useState([]);
  console.log(coupons);
  const [reserve, setReserve] = useState<any>([]);
  console.log(reserve);

  useEffect(() => {
    customAxios
      .get(`/coupons`, { params: { userId: userId } })
      .then(response => setCoupons(response.data))
      .catch(err => err.message);
  }, [userId]);

  useEffect(() => {
    customAxios
      .get(`/reserves/current`, { params: { userId: userId } })
      .then(response => {
        if (response.status === 404) {
          setReserve(0);
        } else {
          setReserve(response.data);
        }
      })
      .catch(err => {
        console.log(err.message);
        setReserve(0);
      });
  }, [userId]);
  console.log(reserve);

  const location = useLocation();
  const locate = location.state;
  const orderId = locate.orderId;

  const [products, setProducts] = useState();
  console.log(products);
  useEffect(() => {
    customAxios
      .get(`/orders/${orderId}`, { params: { userId: userId } })
      .then(response => setProducts(response.data))
      .catch(err => {
        console.log(err.message);
        setReserve(0);
      });
  }, [userId, orderId]);

  const [useReserve, setUseReserve] = useState(0);
  console.log(useReserve);

  const handleReserve = (e: any) => {
    setUseReserve(e.target.value);
    setOrderPrice(
      totalPrice - membershipDiscount - couponDiscount - useReserve,
    );
  };
  const [amount, setAmount] = useState(0);
  console.log(amount);
  const handleSelect = (e: any) => {
    setAmount(e.target.value);
    setOrderPrice(
      totalPrice - membershipDiscount - couponDiscount - useReserve - amount,
    );
  };

  const totalPrice = locate.totalOrderPrice;
  const membershipDiscount = 0;
  const couponDiscount = 0;
  const [orderPrice, setOrderPrice] = useState(totalPrice);

  const ShippingFee = orderPrice > 50000 ? 0 : 3000;

  const [modalOpen, setModalOpen] = useState(false);
  const toFrom = () => {
    customAxios
      .patch(`/orders/${orderId}/reserve-usage`, {
        usedReserve: useReserve,
        userId: userId,
      })
      .then(response => {
        setProducts(response.data);
        setModalOpen(true);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const useableReserve =
    reserve.currentReserve == undefined ? reserve : reserve.currentReserve;

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <Container>
          <Title>배송지</Title>
          <TextBox>
            <OrderName>
              이름
              <OrderInfo>{userData?.fullName}</OrderInfo>
            </OrderName>
            <OrderName>
              연락처
              <OrderInfo>{userData?.phone}</OrderInfo>
            </OrderName>
            <OrderName>
              배송지
              <OrderInfo className="shippingInfo">
                {userData?.zipcode}
                <Box>{userData?.city + ` ` + userData?.street}</Box>
                {userData?.detailedAddress}
              </OrderInfo>
            </OrderName>
          </TextBox>
        </Container>
        <Container>
          <Title>주문 상품</Title>
          <OrderList>
            {locate.orderProductResponseDtos.map((product: any) => (
              <OrderListItem key={product.productToOrderResponseDto.productId}>
                <ProductImgBox>
                  <Image src={product.productToOrderResponseDto.imageUrl} />
                </ProductImgBox>
                <ProductInfoBox>
                  <ProductName>
                    {product.productToOrderResponseDto.name}
                  </ProductName>
                  <ProductQuantity>
                    주문 수량: {product.quantity}개
                  </ProductQuantity>
                  <ProductPrice>
                    {addCommaPrice(product.orderPrice)}원
                  </ProductPrice>
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
              {/* 쿠폰 */}
              <Box className="coupon">
                <Label htmlFor="firstCategories">쿠폰</Label>
                <Select onChange={e => handleSelect(e)}>
                  <Option value="coupon">보유한 쿠폰</Option>
                  {coupons.map((coupon: any) => (
                    <Option
                      value={coupon.amount}
                      key={coupon.firstCategoryName}
                    >
                      {coupon.couponName + ` - ` + coupon.amount + `원`}
                    </Option>
                  ))}
                </Select>
              </Box>
            </OrderName>
          </TextBox>
          <TextBox>
            <OrderName>
              주문 금액
              <OrderInfo>{addCommaPrice(totalPrice)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              배송비
              <OrderInfo>{addCommaPrice(ShippingFee)} 원</OrderInfo>
            </OrderName>
            <OrderName>
              보유 적립금
              <OrderInfo>{useableReserve} 원</OrderInfo>
            </OrderName>
            <OrderName className="reserve">
              <Label>적립금 사용</Label>
              <Input
                onChange={e => handleReserve(e)}
                onInput={(e: any) => {
                  if (e.target.value >= 0) {
                    if (e.target.value > Number(useableReserve)) {
                      alert(`${useableReserve}까지 입력가능`);
                    }
                  } else {
                    e.target.value = 0;
                  }
                }}
              />
              원
            </OrderName>
          </TextBox>
          <TextBox style={{ border: `none` }}>
            <OrderName>
              결제하실 금액
              <OrderInfo className="orderPrice">
                {addCommaPrice(orderPrice + ShippingFee)} 원
              </OrderInfo>
            </OrderName>
          </TextBox>
          <OrderBtn onClick={toFrom}>주문하기</OrderBtn>
          {modalOpen && <OrderConfirm setModalOpen={setModalOpen} />}
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

  &.reserve {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  &.coupon {
    justify-content: space-between;
    display: flex;
    width: 100%;
  }
`;
const Input = styled.input`
  flex: auto;
  margin: 1px 0;
  padding: 3px;
  font-size: 18px;
  border: 1px solid #aaaaaa;
  text-align: right;
`;
const Label = styled.label`
  width: 100px;
`;
const Select = styled.select`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #aaaaaa;
  flex: 1;
`;
const Option = styled.option`
  justify-content: space-between;
  display: flex;
  text-align: center;
  font-size: 16px;
`;
