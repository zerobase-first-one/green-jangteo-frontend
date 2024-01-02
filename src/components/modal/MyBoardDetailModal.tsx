import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

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

interface MyBoardDetailModalPops {
  setClicked: (value: boolean) => void;
}

export default function MyBoardDetailModal({
  setClicked,
}: MyBoardDetailModalPops) {
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
          <Btns>
            <Button
              onClick={() => {
                setClicked(false);
              }}
            >
              수정
            </Button>
            <Button>삭제</Button>
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
`;

const Btns = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  height: 50px;
  background-color: #d1d1d1;
  color: #000000;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 16px;
`;
