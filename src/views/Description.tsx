import styled from 'styled-components';
import { ProductType } from './Detail';
import { useOutletContext } from 'react-router-dom';

const Wrapper = styled.div`
  width: 90%;
  height: 260px;
  background-color: #d1d1d1;
  margin: 0 auto;
  margin-bottom: 20px;
`;

interface DescriptionProps
  extends Omit<ProductType, 'productName' | 'price' | 'images'> {}

export default function Description() {
  const product = useOutletContext<DescriptionProps>();

  return <>{product && <Wrapper>{product.description}</Wrapper>}</>;
}
