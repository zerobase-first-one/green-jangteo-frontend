import { Link } from "react-router-dom";
import styled from "styled-components";
import addCommaPrice from "../../../public/module/addComma";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../constant/union";
// import axios from "axios";

const Wrapper = styled.div`
  // background-color: #dedede;
`;
const Ul = styled.ul``;
const List = styled.li`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dedede;

  &:last-child {
    border-bottom: none;
  }

  span {
    padding: 5px 0;
  }
`;
const Title = styled.span`
  display: inline-block;
  width: 120px;
`;
const OrderDate = styled.span`
  margin-bottom: 5px;
`;
const OrderProducdt = styled.span``;
const OrderNumber = styled.span``;
const Price = styled.span``;
const OrderState = styled.span``;
const DetailBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: inherit;
  color: #b0b0b0;
  cursor: pointer;
`;

const SellerOrderList = () => {
  // const [order, setOrder] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/orders`, { params: { userId: userId } })
  //     .then((response) => {
  //       setOrder(response.data);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  const order = [
    {
      orderDate: `2023.12.12`,
      orderProduct: { product1: "상품명1", product2: "상품명11" },
      totalOrderPrice: 20000,
      orderStatus: `발송전`,
      orderId: 1,
    },
    {
      orderDate: `2023.12.12`,
      orderProduct: { product1: "상품명2" },
      totalOrderPrice: 30330,
      orderStatus: `발송전`,
      orderId: 2,
    },
    {
      orderDate: `2023.12.12`,
      orderProduct: { product1: "상품명3" },
      totalOrderPrice: 4444,
      orderStatus: `발송완료`,
      orderId: 3,
    },
  ];

  return (
    <Wrapper>
      <Ul>
        {order.map((item: any, idx) => (
          <List key={idx}>
            <OrderDate>{item.orderDate}</OrderDate>
            <OrderProducdt>
              <Title>상품명</Title>
              {item.orderProduct.product1} 외
            </OrderProducdt>
            <OrderNumber>
              <Title>주문번호</Title>321231
            </OrderNumber>
            <Price>
              <Title>결제금액</Title>
              {addCommaPrice(item.totalOrderPrice)}
            </Price>
            <OrderState>
              <Title>주문상태</Title>
              {item.orderStatus}
            </OrderState>
            <DetailBtn>
              <Link
                to={`/stores/:userId/order/${item.orderId}`}
                state={{ item: item }}
              >
                주문상세
              </Link>
            </DetailBtn>
          </List>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default SellerOrderList;
