import { Link } from 'react-router-dom';
import ReviewList from './ReviewList';
import useGetReviewList from '../hooks/useGetReviewList';

export default function ReviewListContainer() {
  const { products } = useGetReviewList();

  return (
    <>
      {products.map(product => (
        <Link to={`/products/${product.productId}/review`}>
          <ReviewList product={product} />
        </Link>
      ))}
    </>
  );
}
