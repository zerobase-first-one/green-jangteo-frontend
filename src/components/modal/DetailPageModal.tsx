import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { CartId } from './cartId';

const variants = {
  hidden: {
    y: 300,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 300,
    opacity: 0,
  },
};

interface DetailPageModalProps {
  setClicked: (value: boolean) => void;
  item: any;
}

export default function DetailPageModal({
  setClicked,
  item,
}: DetailPageModalProps) {
  const [count, setCount] = useState(1);
  const [totalPrice] = useState(item.price);

  const userId = useRecoilValue(userIdState);
  const { productId } = useParams();

  const [cartId, setCartId] = useState();
  CartId(cartId);
  console.log(cartId);

  const AddCart = () => {
    customAxios
      .post(`/carts`, {
        cartProduct: {
          productId: productId,
          quantity: count,
        },
        userId: userId,
      })
      .then(response => {
        setCartId(response.data.cartId);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <AnimatePresence>
      <Overlay onClick={() => setClicked(false)}>
        <Wrapper
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <CountTab>
            <p>수량 선택</p>
            <QuantityContainer>
              <QuantityButton onClick={() => setCount(count - 1)}>
                -
              </QuantityButton>
              <QuantityDisplay>{count}</QuantityDisplay>
              <QuantityButton onClick={() => setCount(count + 1)}>
                +
              </QuantityButton>
            </QuantityContainer>
          </CountTab>
          <Price>{totalPrice * count}원</Price>
          <Btns>
            <ToCartBtn onClick={AddCart}>장바구니에 담기</ToCartBtn>
            <Link to={'/orders'}>
              <OrderBtn>주문하기</OrderBtn>
            </Link>
          </Btns>
        </Wrapper>
      </Overlay>
    </AnimatePresence>
  );
}

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const Wrapper = styled(motion.div)`
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const CountTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  margin-top: 15px;
  padding: 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const QuantityDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
`;

const Price = styled.p`
  width: 100%;
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
`;

const Btns = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const ToCartBtn = styled.button`
  flex: 1;
  height: 50px;
  background-color: #d1d1d1;
  color: #000000;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const OrderBtn = styled.button`
  flex: 1;
  height: 50px;
  background-color: #16a113;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
`;
