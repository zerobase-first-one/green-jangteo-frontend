import styled from 'styled-components';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import MyReviewList from '../components/MyReviewList';

export default function MyReviews() {
  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <MyReviewList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fffff;
`;
