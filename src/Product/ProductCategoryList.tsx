import { useEffect, useState } from 'react';
import customAxios from '../apiFetcher/customAxios';

const ProductCategoryList = () => {
  const [products, setProducts] = useState();
  console.log(products);

  useEffect(() => {
    // axios;
    // .get(`../product-dummy.json`)
    // .get(`${BASE_URL}/products`)
    customAxios
      .get('/products/category')
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, []);
  return products;
};

export default ProductCategoryList;
