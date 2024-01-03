import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGetProductReview from '../../hooks/useGetProductReview';

export default function Review() {
  const { reviews } = useGetProductReview();

  return (
    <>
      {reviews.length === 0 ? (
        <NoReviewMessage>등록된 리뷰가 없습니다.</NoReviewMessage>
      ) : (
        reviews.map(review => (
          <Link to={`/users/${review.userId}`}>
            <ReviewItem key={review.userId}>
              <ImgBox>
                <Img src={review.imageUrl} />
              </ImgBox>
              <ContentBox>
                <ReviewContent>{review.content}</ReviewContent>
                <Date>{review.createdAt.slice(0, 10)}</Date>
              </ContentBox>
            </ReviewItem>
          </Link>
        ))
      )}
    </>
  );
}

const NoReviewMessage = styled.div`
  height: 200px;
  text-align: center;
  font-size: 18px;
  color: #666;
  margin: 20px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReviewItem = styled.div`
  width: 90%;
  background-color: #ececec;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  transition: background-color 0.3s;
  display: flex;

  &:hover {
    background-color: #dcdcdc;
  }
`;

const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  background-color: #dedede;
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 18px;
`;

const ReviewContent = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.5;
  margin: 0;
`;

const Date = styled.span`
  font-size: 14px;
`;
