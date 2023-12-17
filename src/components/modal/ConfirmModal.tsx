import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ConfirmModalProps {
  onClose: () => void;
}

export default function ConfirmModal({ onClose }: ConfirmModalProps) {
  return (
    <Overlay>
      <Wrapper>
        <Text>게시물이 등록되었습니다.</Text>
        <Link to={'/posts/my'}>
          <Button onClick={onClose}>확인</Button>
        </Link>
      </Wrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 320px;
  height: 190px;
  background-color: #ffffff;
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #16a113;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
`;
