import styled from "styled-components";
import Header from "../components/Header";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  width: 430px;
  height: 800px;
  background-color: white;
`;

const Image = styled.div`
  width: 390px;
  height: 195px;
  background-color: #d1d1d1;
  margin: 20px;
`;

const ProductName = styled.p`
  margin-left: 20px;
`;

const Star = styled.p`
  margin-left: 20px;
`;

const Price = styled.span`
  margin-left: 20px;
`;

const Tabs = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  border: 1px solid black;
  padding: 10px 0px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#149211" : "#E0E0E0")};
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#AAAAAA")};
`;

const BottomActionBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const OrderBtn = styled.button`
  width: 300px;
  height: 50px;
  background-color: #16a113;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  margin-left: 30px;
  cursor: pointer;
`;

interface ProductType {
  productName: string;
  price: number;
}

export default function Detail() {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState<ProductType>();
  const descriptionMatch = useMatch("products/:productId/description");
  const reviewMatch = useMatch("products/:productId/review");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://221a0901-f1cb-4b6b-9d22-44830818381a.mock.pstmn.io/products/${productId}`,
          { headers: { Authorization: token } }
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId, token]);

  return (
    <Wrapper>
      <Header />
      <Image></Image>
      <ProductName>{product?.productName}</ProductName>
      <Star>⭐︎⭐︎⭐︎⭐︎⭐︎</Star>
      <Price>{product?.price}원</Price>
      <Tabs>
        <Tab isActive={descriptionMatch !== null}>
          <Link to="description">상품설명</Link>
        </Tab>
        <Tab isActive={reviewMatch !== null}>
          <Link to="review">리뷰(1,792)</Link>
        </Tab>
      </Tabs>
      <Outlet />
      <hr />
      <BottomActionBar>
        <IoChatbubbleEllipsesOutline
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "40px",
            cursor: "pointer",
          }}
        />
        <OrderBtn>주문하기</OrderBtn>
      </BottomActionBar>
    </Wrapper>
  );
}
