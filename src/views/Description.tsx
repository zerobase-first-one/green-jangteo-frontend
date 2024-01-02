import styled from 'styled-components';
import { ProductType } from './Detail';
import { useOutletContext } from 'react-router-dom';

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

interface DescriptionProps
  extends Omit<ProductType, 'productName' | 'price' | 'images'> {}

export default function Description() {
  const product = useOutletContext<DescriptionProps>();

  return <>{product && <Wrapper>{product.description}</Wrapper>}</>;
}
