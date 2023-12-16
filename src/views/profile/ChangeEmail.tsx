import ChangeEmailContainer from "../../components/editUserInfo/ChangeEmailContainer";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";

export const ChangeEmail = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ChangeEmailContainer />
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
