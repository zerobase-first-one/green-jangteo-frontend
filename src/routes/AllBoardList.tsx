import styled from "styled-components";

const Wrapper = styled.div`
  width: 400px;
  height: 170px;
  background-color: #ffffff;
  margin: 10px auto;
  padding: 30px 20px;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Username = styled.p`
  font-size: 12px;
`;

const CreateAt = styled.p`
  font-size: 12px;
  color: #999999;
`;

const Comment = styled.p`
  margin-top: 20px;
`;

export default function AllBoardList() {
  return (
    <Wrapper>
      <Title>반려 관련 용품 종류 추가 문의</Title>
      <Username>유저명</Username>
      <CreateAt>2023.11.01</CreateAt>
      <hr />
      <Comment>댓글 2</Comment>
    </Wrapper>
  );
}
