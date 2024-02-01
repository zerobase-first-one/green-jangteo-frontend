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
    try {
      const response = await customAxios.get(`reviews/users/${userId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('리뷰 목록 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchReviewList();
  }, [userId]);

  const refreshReviewList = () => {
    fetchReviewList();
  };

  return { products, refreshReviewList };
}
