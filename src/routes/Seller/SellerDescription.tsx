// import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
// import customAxios from '../../apiFetcher/customAxios';
// import { BASE_URL } from '../../constant/union';
// import axios from 'axios';

const Wrapper = styled.div`
  padding: 20px;
`;

interface Description {
  description: string;
}

const SellerDescription = () => {
  // const { productId } = useParams();
  // const [description, setDescription] = useState({
  //   description: 'good',
  // });
  const product = useOutletContext<Description>();
  // console.log(product.description);

  //   useEffect(() => {
  //     // axios;
  //     // .get(`${BASE_URL}products/${productId}/description,`)
  //     // .get(`http://localhost:3000/post/${productId}`)
  //     customAxios
  //       .get(`/products/${productId}/description`, {
  //         params: { productId: productId },
  //       })
  //       .then(response => {
  //         setDescription(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(err => console.log(err.message));
  //   }, [productId]);

  return <Wrapper>{product.description}</Wrapper>;
};

export default SellerDescription;
