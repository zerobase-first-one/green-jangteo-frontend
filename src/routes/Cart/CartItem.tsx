import styled from "styled-components";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import addCommaPrice from "../../../public/module/addComma";
import { useState } from "react";

const Wrapper = styled.div`
   display: flex;
   flex-direction: row;
   padding: 10px 0;
   border-bottom: 1px solid #dedede;
   &:last-child {
      border: none;
   }
`;
const Label = styled.label`
`;
const CheckInput = styled.input`
   transform : scale(1.5);
   margin-right: 15px;
`;
const ItemaInfoBox = styled.div`
   display: flex;
   flex-direction: row;
`;
const ImageBox = styled.div`
   width: 80px;
   height: 80px; 
   background-color: #cccccc;
   margin-right: 15px;
`;
// const Image = styled.img`
//    width: 100%;
// `;
const InfoBox = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
`;
const ItemName = styled.strong`
   display: block;
   width: 250px;
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;

`;
const ItemCntBox = styled.div`
   display: flex;
   align-items: center;
   flex-derection: row;
   justify-content: flex-end;
   text-align: right;
`;
const ButtonCnt = styled.button`
   width: 25px;
   height: 25px;
`;
const Count = styled.span`
   display: inline-block;
   padding: 0 10px;
   text-align: center;
`;
const Price = styled.span`
   margin-left: 10px;
`;



const CartItem = ({item, checkedItemHandler, checkedItem}: any) => {
   const [isChecked, setIschecked] = useState(false);

  // 체크박스 단일 선택
   const checkHandler = ({ target }:any) => {
      setIschecked(!isChecked);
      const { checked } = target;
      checkedItemHandler(item.id, checked);
   };
   console.log(checkedItem, "cartitem");
   
   return (
      <Wrapper>
         <Label>
            <CheckInput type="checkbox"
               key={item.id}
               onChange={(e) => checkHandler(e)}
            />
         </Label>
         <ItemaInfoBox>
            <ImageBox></ImageBox>
            <InfoBox>
               <ItemName>{item.name}</ItemName>
               <ItemCntBox>
                  <ButtonCnt><LuMinus style={{display: "flex", alignItems: "cneter"}} /></ButtonCnt>
                  <Count>1</Count>
                  <ButtonCnt><LuPlus style={{display: "flex", alignItems: "cneter"}} /></ButtonCnt>
                  <Price>{addCommaPrice(item.price)} 원</Price>
               </ItemCntBox>
            </InfoBox>

         </ItemaInfoBox>

      </Wrapper>
   )
}

export default CartItem;