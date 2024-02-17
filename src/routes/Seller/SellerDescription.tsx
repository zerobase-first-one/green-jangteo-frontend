import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

interface Description {
  description: string;
}

const SellerDescription = () => {
  const product = useOutletContext<Description>();

  return <Wrapper>{product.description}</Wrapper>;
};

export default SellerDescription;

const Wrapper = styled.div`
  padding: 20px;
`;
