import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../apiFetcher/customAxios';

export interface ProductType {
  categories: [
    {
      category: string;
    },
    {
      category: string;
    },
  ];
  count: number;
  createdAt: string;
  modifiedAt: string;
  productName: string;
  price: number;
  description: string;
  images: [
    {
      url: string;
      position: number;
    },
  ];
  review: [
    {
      content: string;
      createdAt: string;
      imageUrl: string;
      modifiedAt: string;
      productId: number;
      score: number;
      userId: number;
    },
  ];
  reviewCount: number;
}

export default function useGetProductDescription() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await customAxios
          .get(`/products/${productId}/description`)
          .then(response => {
            setProduct(response.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);

  return { product };
}
