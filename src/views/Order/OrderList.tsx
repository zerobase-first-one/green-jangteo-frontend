import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import customAxios from '../../apiFetcher/customAxios';
import addCommaPrice from '../../../public/module/addComma';

interface Order {
  createdAt: string;
  orderId: number;
  orderStatus: string;
  totalOrderPrice: number;
}

const OrderList = () => {
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
    customAxios
      .get(`/orders`, { params: { userId: userId } })
      .then(response => {
        setOrder(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err.message));
  }, [userId]);
  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <MainTitle>주문내역</MainTitle>
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
                  to={`/users/${userId}/orderList/${item.orderId}`}
                  state={{ item: item }}
                >
                  주문상세
                </Link>
              </DetailBtn>
            </List>
          ))}
        </Ul>
      </Wrapper>
    </>
  );
};

export default OrderList;

const Wrapper = styled.div`
  padding: 30px;
`;
const MainTitle = styled.strong`
  display: block;
  font-size: 20px;
  font-weight: bold;
  // text-indent: 20px;
  margin-bottom: 20px;
`;
const Ul = styled.ul``;
const List = styled.li`
  position: relative;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dedede;

  &:first-child {
    border-top: 1px solid #dedede;
  }
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
