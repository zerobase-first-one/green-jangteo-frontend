import { useEffect, useState } from 'react';
import styled from 'styled-components';
import customAxios from '../../apiFetcher/customAxios';
import { useParams } from 'react-router-dom';
// import addCommaPrice from '../../../public/module/addComma';

interface Review {
  // review: [
  // {
  content: string;
  createdAt: string;
  imageUrl: string;
  modifiedAt: string;
  productId: string;
  score: number;
  userId: number;
  // },
  // ];
}

const SellerReview = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      content: '와우',
      createdAt: '2023-12-19T18:22:27.989Z',
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/12/10/21/28/plums-1898196_1280.jpg',
      modifiedAt: '',
      productId: '',
      score: 0,
      userId: 0,
    },
    {
      content: '정말 좋아요',
      createdAt: '2023-12-19T18:22:27.989Z',
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/12/10/21/28/plums-1898196_1280.jpg',
      modifiedAt: '',
      productId: '',
      score: 0,
      userId: 0,
    },
  ]);
  const { productId } = useParams();
  useEffect(() => {
    customAxios
      .get(`/reviews/products/${productId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(err => console.log(err.message));
  }, [productId]);
  // const reviews = useOutletContext<Review>();
  // console.log(reviews);

  return (
    <Wrapper>
      <Ul>
        {reviews.map((review: any, idx: number) => (
          <List key={idx}>
            <ImgBox>
              <Img src={review.imageUrl} />
            </ImgBox>
            <ContentBox>
              <Content>{review.content}</Content>
              <Date>{review.createdAt.slice(0, 10)}</Date>
            </ContentBox>
          </List>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default SellerReview;

const Wrapper = styled.div`
  padding: 20px;
`;

const Ul = styled.ul``;
const List = styled.li`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #dedede;

  &:last-child {
    border-bottom: none;
  }
`;
const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  background-color: #dedede;
  overflow: hidden;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 18px;
`;
const Content = styled.strong`
  // font-weight: bold;
`;
const Date = styled.span`
  font-size: 14px;
`;
