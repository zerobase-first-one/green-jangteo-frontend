import ChangePasswordContainer from "../../components/editUserInfo/ChangePasswordContainer";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";

export const ChangePassword = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <ChangePasswordContainer />
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
