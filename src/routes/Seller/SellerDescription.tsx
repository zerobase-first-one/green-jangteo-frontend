import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import customAxios from '../../apiFetcher/customAxios';

const Wrapper = styled.div`
  padding: 20px;
`;

const SellerDescription = () => {
  const { productId } = useParams();
  const [description, setDescription] = useState({
    description: '',
  });

  useEffect(() => {
    customAxios
      .get(`/post/${productId}`)
      // .get(`${BASE_URL}products/${productId}/description,`)
      .then(response => {
        setDescription(response.data);
      })
      .catch(err => console.log(err.message));
  }, [productId]);

  return <Wrapper>{description.description}</Wrapper>;
};

export default SellerDescription;
