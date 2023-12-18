import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';

const Wrapper = styled.div`
  width: 90%;
  height: 260px;
  background-color: #d1d1d1;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default function Description() {
  const { productId } = useParams();
  console.log(productId);

  const getProductDetails = async () => {
    try {
      const response = await customAxios.get(
        `/products/${productId}/description`,
      );
      console.log(response);
      const data = response.data;

      console.log('Categories:', data.categories);
      console.log('Count:', data.count);
      console.log('CreatedAt:', data.createdAt);
      console.log('Description:', data.description);
      console.log('Images:', data.images);
      console.log('ModifiedAt:', data.modifiedAt);
      console.log('Price:', data.price);
      console.log('ProductName:', data.productName);
      console.log('Review:', data.review);
      console.log('ReviewCount:', data.reviewCount);
    } catch (error) {
      console.error('Error fetching product details:');
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return <Wrapper>Description</Wrapper>;
}
