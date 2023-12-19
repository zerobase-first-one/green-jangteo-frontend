import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import HeaderBackPageBtn from '../../components/HeaderPrevPageBtn';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
`;

// .slice(0, 4) 삭제
const Cart = () => {
  // const checkList = [
  //   { id: 1, name: "상품1", price: 2000, quantity: 1 },
  //   { id: 2, name: "상품2", price: 3000, quantity: 1 },
  //   { id: 3, name: "상품3", price: 4000, quantity: 1 },
  //   { id: 4, name: "상품4", price: 5000, quantity: 1 },
  //   { id: 5, name: "상품5", price: 6000, quantity: 1 },
  // ];

  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      // .get(`${BASE_URL}/carts`)
      .then(response => {
        const arr = response.data.map((item: any) => item).slice(0, 4);
        // setCartList(response.data);
        setCartList(arr);
      })
      .catch(err => console.log(err.message));
  }, []);
  console.log(cartList);

  const [checkedItem, setCheckedItem] = useState([
    ...cartList.map((item: any) => item.productId),
  ]);
  const [checkedItemPrice, setCheckedItemPrice] = useState([
    ...cartList.map((item: any) => item.price),
  ]);
  console.log(checkedItem);
  const totalPrice = checkedItemPrice.reduce((acc: number, cur: number) => {
    return acc + cur;
  }, 0);
  console.log(totalPrice);

  const checkedItemHandler = (
    productId: number,
    checked: any,
    price: any,
    // quantity: any,
  ) => {
    if (checked) {
      setCheckedItem(prev => [...prev, productId]);
      setCheckedItemPrice(prev => [...prev, price]);
      // setCheckedItemQuantity((prev) => [...prev, quantity]);
    } else {
      setCheckedItem(checkedItem.filter(item => item !== productId));
      setCheckedItemPrice(checkedItemPrice.filter(item => item !== price));
      // setCheckedItemQuantity(
      //   checkedItemQuantity.filter((item) => item !== quantity);
      // );
    }
    // return checkedItem;
  };

  const allCheckedHandler = (e: any) => {
    if (e.target.checked) {
      setCheckedItem(cartList.map((item: any) => item.productId));
    } else {
      setCheckedItem([]);
      setCheckedItemPrice([]);
    }
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
            <Button>전체 삭제</Button>
            <Button>선택 삭제</Button>
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
            <Price>-{addCommaPrice(2000)} 원</Price>
          </PriceName>
          <PriceName>
            주문 금액
            <Price className="orderPrice">{addCommaPrice(8000)} 원</Price>
          </PriceName>
        </TextBox>
        <Link to={'/orders'}>
          <OrderBtn>주문하기</OrderBtn>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default Cart;
