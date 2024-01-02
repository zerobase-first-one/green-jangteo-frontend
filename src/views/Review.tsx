import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import customAxios from '../apiFetcher/customAxios';

interface Review {
  content: string;
  createdAt: string;
  imageUrl: string;
  modifiedAt: string;
  productId: number;
  score: number;
  userId: number;
}

export default function Review() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  const getProductReview = async () => {
    try {
      const response = await customAxios.get(`/reviews/products/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  useEffect(() => {
    getProductReview();
  }, []);

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
                {/* <Username>{userInfo?.username}</Username> */}
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

// const Username = styled.p``;

const ReviewContent = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.5;
  margin: 0;
`;

const Date = styled.span`
  font-size: 14px;
`;
