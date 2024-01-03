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
      console.log('리뷰리스트', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('리뷰 목록 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    console.log('리뷰 목록을 가져오는 중...');
    fetchReviewList();
  }, [userId]);

  const refreshReviewList = () => {
    console.log('리뷰 목록을 새로 고침 중...');
    fetchReviewList();
  };

  return { products, refreshReviewList };
}
