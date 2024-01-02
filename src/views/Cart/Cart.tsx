import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import HeaderBackPageBtn from '../../components/HeaderPrevPageBtn';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { useGetMyProfile } from '../../hooks/useGetMyProfile';

interface Cart {
  productId: number;
  quantity: number;
}

const Cart = () => {
  // const navigate = useNavigate();
  const [cartList, setCartList] = useState<Cart[]>([]);
  const userId = useRecoilValue(userIdState);
  console.log('userId', userId);
  // 장바구니 목록 get method
  const getProduct = async () => {
    try {
      const response = await customAxios.get(`/carts`, {
        params: { userId: userId },
      });
      setCartList(response.data);
    } catch {
      (err: any) => console.log(err.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  // useEffect(() => {
  //   customAxios
  //     .get(`/carts`, { params: { userId: userId } })
  //     .then(response => {
  //       setCartList(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(err => console.log(err.message));
  // }, [userId]);
  // console.log(cartList);

  const [numbers, setNumber] = useState(0);
  console.log(numbers);
  console.log(cartList);

  const getData = (price: any) => {
    // setNumber(price);
    console.log(price);
    setNumber(price);
  };

  const [checkedItem, setCheckedItem] = useState([
    ...cartList.map((item: any) => item.productId),
  ]);
  const [checkedItemPrice, setCheckedItemPrice] = useState([
    ...cartList.map((item: any) => item.price),
  ]);
  console.log(checkedItemPrice);
  const totalPrice = checkedItemPrice.reduce((acc: number, cur: number) => {
    return acc + cur;
  }, 0);
  console.log(totalPrice);
  const [selectOrder, setSelectOrder] = useState([
    ...cartList.map((item: any) => item.productId),
  ]);
  console.log(selectOrder);

  // 상품 개별 체크
  const checkedItemHandler = (
    checked: any,
    productName: string,
    productId: number,
    cartProductId: number,
    quantity: number,
    imageUrl: number,
    price: any,
  ) => {
    if (checked) {
      setCheckedItem(prev => [...prev, productId]);
      setSelectOrder(prev => [
        ...prev,
        { productName, productId, cartProductId, quantity, imageUrl, price },
      ]);
      setCheckedItemPrice(prev => [...prev, price]);
    } else {
      setCheckedItem(checkedItem.filter(item => item !== productId));
      setSelectOrder(selectOrder.filter(item => item.productId !== productId));
      setCheckedItemPrice(checkedItemPrice.filter(item => item !== price));
    }
  };
  // 전체 체크
  const allCheckedHandler = (e: any) => {
    if (e.target.checked) {
      setCheckedItem(cartList.map((item: any) => item.productId));
      setSelectOrder(cartList.map((item: any) => item));
      setCheckedItemPrice(
        cartList.map((item: any) => item.price * item.quantity),
      );
    } else {
      setCheckedItem([]);
      setCheckedItemPrice([]);
      setSelectOrder([]);
    }
  };
  // 장바구니 전체 삭제
  const deleteAllCart = () => {
    customAxios
      .delete(`/carts`, { params: { userId: userId } })
      .then(response => console.log('삭제 성공', response))
      .catch(error => console.log('삭제 실패', error.message));
  };
  // 장바구니 선택 삭제
  const deleteSellectCart = () => {
    customAxios
      .delete(`/carts/selects`, {
        data: {
          cartProducts: selectOrder,
          userId: userId,
        },
      })
      .then(response => console.log('삭제 성공', response))
      .catch(error => console.log('삭제 실패', error.message));
    // alert('상품이 삭제되었습니다.');
  };

  // 주문하기 post method
  const navigate = useNavigate();
  const orderPost = () => {
    // customAxios
    //   .post(`/orders`, {
    //     buyerId: userId,
    //     orderProductRequestDtos: selectOrder,
    //     sellerId: 10,
    //     shippingAddressDto: {
    //       city: address?.addressDto.city,
    //       detailedAddress: address?.addressDto.detailedAddress,
    //       street: address?.addressDto.street,
    //       zipcode: address?.addressDto.zipcode,
    //     },
    //   })
    //   .then(response => {
    //     console.log(`성공`, response);
    //     navigate('/orders');
    //   })
    //   .catch(err => console.log(`실패`, err));
    if (totalPrice == 0) {
      alert(`물품을 골라주세요`);
    } else {
      navigate(`/orders`, {
        state: selectOrder,
      });
    }
  };
  // 장바구니 전체 주문
  const cartId = localStorage.getItem('cartId');
  console.log(cartId);
  const { address }: any = useGetMyProfile();

  const myInfo = useGetMyProfile();
  console.log('address', address);
  console.log('myInfo', myInfo);

  const AllorderPost = () => {
    customAxios
      .post(`/orders/cart-order`, {
        buyerId: userId,
        cartId: cartId,
        shippingAddressDto: {
          city: address.city,
          detailedAddress: address.detailedAddress,
          street: address.street,
          zipcode: address.zipcode,
        },
      })
      .then(response => {
        console.log(`성공`, response.data.orderId);
        localStorage.setItem('orderId', JSON.stringify(response.data.orderId));
        navigate('/cart/orders');
      })
      .catch(err => console.log(`실패`, err));
  };
  return (
    <Wrapper>
      <HeaderBackPageBtn />
      <Container>
        <Box>
          <Label htmlFor="allCheck">
            <CheckInput
              type="checkbox"
              onChange={allCheckedHandler}
              checked={checkedItem.length === cartList.length ? true : false}
            />
            전체선택
          </Label>
          <BtnBox>
            <Button onClick={deleteAllCart}>전체 삭제</Button>
            <Button onClick={deleteSellectCart}>선택 삭제</Button>
          </BtnBox>
        </Box>
        <CartList>
          {cartList.map((item: any) => (
            <CartItem
              key={item.productId}
              item={item}
              checkedItemHandler={checkedItemHandler}
              checkedItem={checkedItem}
              checked={checkedItem.includes(item.productId) ? true : false}
              getData={getData}
            ></CartItem>
          ))}
        </CartList>
        <TextBox>
          <PriceName>
            선택 상품 금액
            <Price>{addCommaPrice(totalPrice)} 원</Price>
          </PriceName>
          <PriceName>
            멤버십 할인 예상 금액
            <Price>- {addCommaPrice(0)} 원</Price>
          </PriceName>
          <PriceName>
            주문 금액
            <Price className="orderPrice">{addCommaPrice(totalPrice)} 원</Price>
          </PriceName>
        </TextBox>
        {/* <Link to={`/orders`} state={selectOrder}> */}
        <OrderBtn onClick={orderPost}>주문하기</OrderBtn>
        {/* </Link> */}
        <OrderBtn onClick={AllorderPost}>장바구니 전체 주문하기</OrderBtn>
      </Container>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  font-size: 18px;
`;
const Container = styled.div`
  padding: 0 20px;
  padding-top: 20px;
  padding-bottom: 50px;
`;
const CheckInput = styled.input`
  transform: scale(1.5);
  margin-right: 15px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 10px 20px;
  background-color: #dedede;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;
const Label = styled.label``;
const CartList = styled.div`
  // padding: 10px 0;
  border-top: 1px solid #909090;
  border-bottom: 1px solid #909090;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const PriceName = styled.div`
  display: flex;
  justify-content: space-aroud;
  padding: 10px 0;
`;
const Price = styled.span`
  margin-left: auto;

  &.orderPrice {
    font-weight: bold;
    color: var(--maincolor);
  }
`;

const OrderBtn = styled.button`
  background: var(--maincolor);
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  width: 100%;
  margin-bottom: 15px;
`;
