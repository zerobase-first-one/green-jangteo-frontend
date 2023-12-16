import styled from "styled-components";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";

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
  height: 65px;
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
}

export default function DetailPageModal({ setClicked }: DetailPageModalProps) {
  return (
    <AnimatePresence>
      <Overlay onClick={() => setClicked(false)}>
        <Wrapper
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CountTab>
            <p>수량 선택</p>
            <CiSquareMinus />
            <div>1</div>
            <CiSquarePlus />
          </CountTab>
          <Price>10,000</Price>
          <Btns>
            <ToCartBtn>장바구니에 담기</ToCartBtn>
            <OrderBtn>주문하기</OrderBtn>
          </Btns>
        </Wrapper>
      </Overlay>
    </AnimatePresence>
  );
}
