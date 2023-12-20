import styled from 'styled-components';

export default function MyReviewList() {
  return (
    <Wrapper>
      <Image />
      <ProductName>친환경 에코백</ProductName>
      <Buttons>
        <Button>수정</Button>
        <Button>삭제</Button>
      </Buttons>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 120px;
  background-color: #fffff;
`;

const Image = styled.div`
  width: 30%;
  height: 100%;
  background-color: #d9d9d9;
`;

const ProductName = styled.p``;

const Buttons = styled.div`
  width: 30%;
`;

const Button = styled.button`
  width: 75px;
  height: 75px;
  background-color: #d9d9d9;
  cursor: pointer;
`;
