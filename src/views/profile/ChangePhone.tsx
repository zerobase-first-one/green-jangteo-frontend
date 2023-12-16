import ChangePhoneContainer from "../../components/editUserInfo/ChangePhoneContainer";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";

export const ChangePhone = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ChangePhoneContainer />
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
