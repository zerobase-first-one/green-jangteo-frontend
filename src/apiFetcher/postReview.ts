import customAxios from './customAxios';

export interface IPostReview {
  content: string;
  imageUrl: string;
  productId: string;
  score?: string;
  userId: string;
}

export const postReview = async ({
  content,
  imageUrl,
  productId,
  score,
  userId,
}: IPostReview) => {
  const postData = { content, imageUrl, productId, score, userId };
  try {
    const response = await customAxios.post('/reviews', postData);
    alert('상품후기가 등록되었습니다.');
    console.log('상품후기 등록 후 받은 데이터', response.data);
    return response.data;
  } catch (error) {
    console.error('리뷰등록 에러가 발생했습니다', error);
  }
};
