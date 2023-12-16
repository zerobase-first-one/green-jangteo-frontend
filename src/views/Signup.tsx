import HeaderPrevPageBtn from "../components/HeaderPrevPageBtn";
import SignupContainer from "../components/SignupContainer";
import styled from "styled-components";

export const Signup = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Title>회원가입</Title>
      <SignupContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 42px;
  margin: 54px 0px;
`;
