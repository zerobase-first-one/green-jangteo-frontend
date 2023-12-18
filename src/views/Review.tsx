import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import customAxios from '../apiFetcher/customAxios';

export default function Review() {
  const { productId } = useParams();

  const getProductReview = async () => {
    try {
      const response = await customAxios.get(`/reviews/products/${productId}`);
      console.log(response);
    } catch (error) {
      console.error('Error fetching product reviews:');
    }
  };

  useEffect(() => {
    getProductReview();
  }, []);

  return <Wrapper>Review</Wrapper>;
}

const Wrapper = styled.div`
  width: 90%;
  height: 260px;
  background-color: #d1d1d1;
  margin: 0 auto;
  margin-bottom: 20px;
`;
