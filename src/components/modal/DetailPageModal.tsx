import styled from "styled-components";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 430px;
  height: 800px;
  position: absolute;
  top: 0;
`;

const Wrapper = styled(motion.div)`
  width: 430px;
  height: 300px;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
`;

const CountTab = styled.div`
  display: flex;
  width: 390px;
  height: 65px;
  margin: 0 auto;
  margin-top: 45px;
`;

const Text = styled.p`
  margin-right: 20px;
  font-size: 16px;
`;

const Count = styled.div``;

const Price = styled.p`
  width: 390px;
  height: 65px;
  margin: 0 auto;
`;

const Btns = styled.div`
  text-align: center;
`;

const ToCartBtn = styled.button`
  width: 185px;
  height: 50px;
  background-color: #d1d1d1;
  color: #000000;
  border: none;
  border-radius: 10px;
  margin-right: 20px;
`;

const OrderBtn = styled.button`
  width: 185px;
  height: 50px;
  background-color: #16a113;
  color: #ffffff;
  border: none;
  border-radius: 10px;
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
            <Text>수량 선택</Text>
            <CiSquareMinus />
            <Count>1</Count>
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
