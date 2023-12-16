import DeleteAccountContainer from "../../components/editUserInfo/DeleteAccountContainer";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import styled from "styled-components";

export const DeleteAccount = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <DeleteAccountContainer />
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
