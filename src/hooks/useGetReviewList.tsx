import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';

export interface IReviewList {
  content: string;
  createdAt: string;
  imageUrl: string;
  modifiedAt: string;
  reviewId: string;
  score: string;
  userId: string;
  productId: string;
}

export default function useGetReviewList() {
  const { userId } = useParams();
  const [products, setProducts] = useState<IReviewList[]>([]);

  const fetchReviewList = async () => {
    const response = await customAxios.get(`/reviews/users/${userId}`);
    console.log('리뷰리스트', response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchReviewList();
  }, [userId]);

  return { products };
}
