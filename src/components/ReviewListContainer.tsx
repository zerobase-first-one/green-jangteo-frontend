import ReviewList from './ReviewList';
import useGetReviewList from '../hooks/useGetReviewList';

export default function ReviewListContainer() {
  const { products } = useGetReviewList();

  return (
    <>
      {products.length > 0 ? (
        products.map(product => (
          <ReviewList key={product.reviewId} product={product} />
        ))
      ) : (
        <div>리뷰 작성 내역이 없습니다.</div>
      )}
    </>
  );
}
