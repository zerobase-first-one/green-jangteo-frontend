import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import addCommaPrice from "../../../public/module/addComma";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  // height: 100px;
  // background-color: #dedede;
`;
const Ul = styled.ul`
  padding: 20px 0;
`;
const List = styled.li`
  a {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #dedede;
  }

  &:last-child a {
    border-bottom: none;
  }
`;
const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  background-color: #dedede;
`;
// const Img = styled.img``
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 24px;
`;
const ProductName = styled.strong`
  // font-weight: bold;
`;
const ProductRate = styled.div`
  color: gold;
`;
const ProductPrice = styled.span``;

const SellerProductList = () => {
  const [products, setProducts] = useState([]);

  // console.log(products);
  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      // .get(`${BASE_URL}/stores/{userId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Wrapper>
      <Ul>
        {products.map((product: any) => (
          <List key={product.id}>
            <Link to={`/stores/:userId/products/${product.id}`}>
              <ImgBox></ImgBox>
              <InfoBox>
                <ProductName>{product.productName}</ProductName>
                <ProductRate>★★★★★</ProductRate>
                <ProductPrice>{addCommaPrice(product.price)}원</ProductPrice>
              </InfoBox>
            </Link>
          </List>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default SellerProductList;
