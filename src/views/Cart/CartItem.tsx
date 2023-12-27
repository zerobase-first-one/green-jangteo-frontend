import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import addCommaPrice from '../../../public/module/addComma';
import { useState } from 'react';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { IoClose } from 'react-icons/io5';

const CartItem = ({ item, checkedItemHandler, checked }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = ({ target }: any) => {
    setIsChecked(!isChecked);
    const { checked } = target;
    checkedItemHandler(item.productId, item.quantity, checked, price);
  };

  const userId = useRecoilValue(userIdState);
  // const token = useRecoilValue(tokenState);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price * quantity);

  const quantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQuantity(item.productId, quantity - 1);
      setPrice(item.price * (quantity - 1));
    }
  };

  const quantityPlus = () => {
    setQuantity(quantity + 1);
    updateQuantity(item.productId, quantity + 1);
    setPrice(item.price * (quantity + 1));
  };

  console.log(userId);
  const updateQuantity = (productId: number, quantity: number) => {
    customAxios
      .put(`/carts/cart-products/${item.productId}`, {
        cartProduct: {
          productId: productId,
          quantity: quantity,
        },
        userId: userId,
      })
      .then(res => console.log(res));
  };
  // const token = useRecoilValue(tokenState);
  const deleteCart = () => {
    customAxios
      .delete(`/carts/cart-products/${item.productId}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // params: {
        //   cartProductId: item.productId,
        //   userId: userId,
        // },
        data: {
          cartProductId: item.productId,
          userId: userId,
        },
      })
      .then(response => console.log('삭제 성공', response))
      .catch(error => console.log('실패', error.message));
    // alert('상품이 삭제되었습니다.');
  };

  return (
    <Wrapper>
      <Label>
        <CheckInput
          type="checkbox"
          key={item.productId}
          onChange={checkHandler}
          checked={checked}
        />
      </Label>
      <ItemInfoBox>
        <ImageBox></ImageBox>
        <InfoBox>
          {/* <ItemName>{item.productName}</ItemName> */}
          <ItemName>{item.productId}</ItemName>
          <ItemCntBox>
            <Price>{addCommaPrice(price)} 원</Price>

            <ButtonBox>
              <ButtonCnt onClick={quantityMinus}>
                <LuMinus />
              </ButtonCnt>
              <Quantity>{quantity}</Quantity>
              <ButtonCnt onClick={quantityPlus}>
                <LuPlus
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </ButtonCnt>
            </ButtonBox>
          </ItemCntBox>
        </InfoBox>
        <ProdcutDeleteButton onClick={deleteCart}>
          <IoClose />
        </ProdcutDeleteButton>
      </ItemInfoBox>
    </Wrapper>
  );
};

export default CartItem;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-areas: 'checkbox info';
  flex-direction: row;
  padding: 20px 0;
  border-bottom: 1px solid #dedede;
  &:last-child {
    border: none;
  }
  position: relative;
`;
const Label = styled.label`
  grid-area: checkbox;
`;
const CheckInput = styled.input`
  transform: scale(1.5);
  margin-right: 15px;
`;
const ItemInfoBox = styled.div`
  grid-area: info;
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
  flex: auto;
`;
const ItemName = styled.strong`
  display: block;
  // width: 250px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const ItemCntBox = styled.div`
  display: flex;
  align-items: center;
  flex-derection: row;
  justify-content: space-between;
  text-align: right;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;
const ButtonCnt = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;
const Quantity = styled.span`
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Price = styled.span``;

const ProdcutDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 10px;
  color: #909090;
  padding: 0;
  border: 0;
  background: none;
  font-size: 24px;
`;
