import { useParams } from 'react-router-dom';
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
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:');
    }
  };
  console.log(reviews);

  useEffect(() => {
    getProductReview();
  }, []);

  return (
    <Wrapper>
      {reviews.map((review: any) => (
        <Wrapper>{review.content}</Wrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  height: 260px;
  background-color: #d1d1d1;
  margin: 0 auto;
  margin-bottom: 20px;
`;
