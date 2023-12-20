import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import customAxios from '../../apiFetcher/customAxios';
// import { BASE_URL } from '../../constant/union';
// import axios from 'axios';

const Wrapper = styled.div`
  padding: 20px;
`;

const SellerDescription = () => {
  const { productId } = useParams();
  const [description, setDescription] = useState({
    description: 'good',
  });

  useEffect(() => {
    // axios;
    // .get(`${BASE_URL}products/${productId}/description,`)
    // .get(`http://localhost:3000/post/${productId}`)
    customAxios
      .get(`/products/${productId}/description`, {
        params: { productId: productId },
      })
      .then(response => {
        setDescription(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, [productId]);

  return <Wrapper>{description.description}</Wrapper>;
};

export default SellerDescription;
