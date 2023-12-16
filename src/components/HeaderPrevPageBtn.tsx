import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  background-color: #16a114;
  width: 100%;
  height: 100px;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100px;
  padding: 0 20px;
`;

const PrevBtn = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 30px;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const HeaderPrevPageBtn = () => {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <PrevBtn onClick={prevPage}>
          <AiOutlineArrowLeft />
        </PrevBtn>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderPrevPageBtn;
