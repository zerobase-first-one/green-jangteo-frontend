import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import addCommaPrice from '../../../public/module/addComma';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constant/union';
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../constant/union";
// import axios from "axios";

interface Order {
  createdAt: string;
  orderId: number;
  orderStatus: string;
  totalOrderPrice: number;
}

const SellerOrderList = () => {
  const { userId } = useParams();
  const [order, setOrder] = useState<Order[]>([
    {
      createdAt: '',
      orderId: 0,
      orderStatus: '',
      totalOrderPrice: 0,
    },
  ]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/orders`, { params: { userId: userId } })
      .then(response => {
        setOrder(response.data);
      })
      .catch(err => console.log(err.message));
  }, [userId]);

  // const order = [
  //   {
  //     createdAt: '2023-12-19T07:10:20.683Z',
  //     modifiedAt: '2023-12-19T07:10:20.683Z',
  //     orderId: 0,
  //     orderStatus: '발송전',
  //     totalOrderPrice: 545150,
  //   },
  //   {
  //     createdAt: '2023-12-19T07:10:20.683Z',
  //     modifiedAt: '2023-12-19T07:10:20.683Z',
  //     orderId: 1,
  //     orderStatus: '발송전',
  //     totalOrderPrice: 5450,
  //   },
  // ];

  return (
    <Wrapper>
      <Ul>
        {order.map((item: any, idx) => (
          <List key={idx}>
            <OrderDate>{item.createdAt.slice(0, 10)}</OrderDate>
            <OrderNumber>
              <Title>주문번호</Title>
              {item.orderId}
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
// const OrderProducdt = styled.span``;
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
