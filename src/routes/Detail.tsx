import styled from "styled-components";
import Header from "../components/Header";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/union";
import DetailPageModal from "../components/modal/DetailPageModal";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom/auth";

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
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const descriptionMatch = useMatch("products/:productId/description");
  const reviewMatch = useMatch("products/:productId/review");
  const [clicked, setClicked] = useState(false);
  const token = useRecoilValue(tokenState);
  console.log("1", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("2", token);
        await axios
          .get(`${BASE_URL}/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setProduct(response.data.product);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId, token]);

  const onOrderBtnClick = () => {
    if (token === null) {
      alert("로그인 화면으로 이동합니다.");
      navigate("/users/login");
    } else {
      setClicked(true);
    }
  };

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
        <OrderBtn onClick={onOrderBtnClick}>주문하기</OrderBtn>
      </BottomActionBar>
      {clicked ? <DetailPageModal setClicked={setClicked} /> : null}
    </Wrapper>
  );
}
