import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { tokenState } from '../store/atom/auth';
import { useEffect } from 'react';
import axios from 'axios';

export default function Review() {
  const { productId } = useParams();
  const token = useRecoilValue(tokenState);

  const getProductReview = async () => {
    try {
      const response = await axios.get(`/reviews/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
