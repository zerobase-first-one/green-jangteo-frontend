import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { ProductType } from '../hooks/useGetProductDescription';

interface DescriptionProps
  extends Omit<ProductType, 'productName' | 'price' | 'images'> {}

export default function Description() {
  const product = useOutletContext<DescriptionProps>();

  return <>{product && <Wrapper>{product.description}</Wrapper>}</>;
}

const Wrapper = styled.div`
  width: 90%;
  height: 200px;
  background-color: #ececec;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  transition: background-color 0.3s;
`;
