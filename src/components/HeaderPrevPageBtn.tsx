import styled from 'styled-components';
import { AiOutlineArrowLeft, AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HeaderPrevPageBtn = () => {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <PrevBtn onClick={prevPage}>
          <AiOutlineArrowLeft />
        </PrevBtn>
        <HomeIcon onClick={goHome} />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderPrevPageBtn;

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
  font-size: 30px;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const HomeIcon = styled(AiFillHome)`
  font-size: 30px;
  color: #fff;
  cursor: pointer;
`;
