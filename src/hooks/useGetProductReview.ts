import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function useGetProductReview() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchProductReview = async () => {
    try {
      const response = await customAxios.get(`/reviews/products/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductReview();
  }, []);

  return { reviews };
}
