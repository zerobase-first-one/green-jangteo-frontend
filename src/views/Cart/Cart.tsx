import styled from "styled-components";
import addCommaPrice from "../../../public/module/addComma";
import CartItem from "./CartItem";
import { useState } from "react";
import HeaderBackPageBtn from "../../components/HeaderPrevPageBtn";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
   min-height: inherit;
   
   font-size: 18px;
`;
const Container = styled.div`
   padding: 0 20px;
`;
const CheckInput = styled.input`
      transform : scale(1.5);
      margin-right: 15px;
      margin-bottom: 20px;
`;
const Label = styled.label`
`;
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
   width: 100%

`;



const Cart = () => {

   const checkList = [
      {id: 1, name: "상품1", price: 2000},
      {id: 2, name: "상품2", price: 2000},
      {id: 3, name: "상품3", price: 2000},
      {id: 4, name: "상품4", price: 2000},
      {id: 5, name: "상품5", price: 2000},
   ]

   const [checkedItem, setCheckedItem] = useState(new Set());

   const checkedItemHandler = (id: number, isChecked: any) => {
      if (isChecked) {
      checkedItem.add(id);
      setCheckedItem(checkedItem);
      }
      else if (!isChecked && checkedItem.has(id)) {
      checkedItem.delete(id);
      setCheckedItem(checkedItem);
      }
      return checkedItem;
   };

   console.log(checkedItem, "checkedItem");

   const [isChecked, setIschecked] = useState(false);
   const checkHandler = ({ target }: any) => {
      setIschecked(!isChecked);
      const { checked } = target;
      checkedItemHandler(target.id, checked);
   };

  

   return (
      <Wrapper>
         <HeaderBackPageBtn />
         <Container>
            <div><br /></div>
            <Label htmlFor="allCheck">
               <CheckInput
                  type="checkbox" 
                  onChange={checkHandler}
               />
               전체선택
               </Label>
            <CartList>
               {checkList.map(item => 
                  <CartItem item={item} checkedItemHandler={checkedItemHandler} checkedItem={checkedItem}></CartItem>
               )}
            </CartList>
            <TextBox>
               <PriceName>선택 상품 금액
                  <Price>{addCommaPrice(10000)} 원</Price>
                  </PriceName>
               <PriceName>멤버십 할인 예상 금액
                  <Price>-{addCommaPrice(2000)} 원</Price>
                  </PriceName>
               <PriceName>주문 금액
                  <Price className="orderPrice">{addCommaPrice(8000)} 원</Price>
                  </PriceName>
            </TextBox>
            <Link to={"/orders"}>
               <OrderBtn>주문하기</OrderBtn>
            </Link>
         </Container>
      </Wrapper>
   )
}

export default Cart;