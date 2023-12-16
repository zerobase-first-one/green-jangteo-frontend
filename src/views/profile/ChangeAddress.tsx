import ChangeAddressContainer from "../../components/editUserInfo/ChangeAddressContainer";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";

export const ChangeAddress = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ChangeAddressContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
