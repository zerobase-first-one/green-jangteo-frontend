import styled from 'styled-components';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import customAxios from '../../apiFetcher/customAxios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';

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
`;

const CountTab = styled.div`
  display: flex;
  width: 100%;
  // height: 65px;
  margin-bottom: 45px;
  margin-top: 15px;
`;

const Price = styled.p`
  width: 100%;
  margin-bottom: 15px;
`;

const Btns = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 0;
  border: 0;
  cursor: pointer;
`;

const ToCartBtn = styled.button`
  flex: 1;
  height: 50px;
  background-color: #d1d1d1;
  color: #000000;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
`;

const OrderBtn = styled.button`
  flex: 1;
  height: 50px;
  background-color: #16a113;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
`;

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

// interface AddCart {
//   cartProduct: {
//     productId: number;
//     quantity: number;
//   };
//   userId: number;
// }

export default function DetailPageModal({
  setClicked,
  item,
}: DetailPageModalProps) {
  const userId = useRecoilValue(userIdState);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(item.price * quantity);

  const quantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(item.price * (quantity - 1));
    }
  };

  const quantityPlus = () => {
    setQuantity(quantity + 1);
    setPrice(item.price * (quantity + 1));
  };

  const { productId } = useParams();

  const AddCart = () => {
    customAxios
      .post(`/carts`, {
        cartProduct: {
          productId: productId,
          quantity: quantity,
        },
        userId: userId,
      })
      .then(response => {
        console.log(response.data);
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
            <Button onClick={quantityMinus}>
              <CiSquareMinus />
            </Button>
            <div>{quantity}</div>
            <Button onClick={quantityPlus}>
              <CiSquarePlus />
            </Button>
          </CountTab>
          <Price>{price}</Price>
          <Btns>
            <ToCartBtn onClick={AddCart}>장바구니에 담기</ToCartBtn>
            <OrderBtn>주문하기</OrderBtn>
          </Btns>
        </Wrapper>
      </Overlay>
    </AnimatePresence>
  );
}
