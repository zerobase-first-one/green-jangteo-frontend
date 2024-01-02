import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import LoginContainer from '../components/LoginContainer';
import styled from 'styled-components';

export const Login = () => {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Title>로그인</Title>
      <LoginContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 42px;
  margin: 54px 0px;
`;
