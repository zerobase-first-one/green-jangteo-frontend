import styled from 'styled-components';
import customAxios from '../../apiFetcher/customAxios';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { Link } from 'react-router-dom';
import useGetReviewList from '../../hooks/useGetReviewList';
import { useState } from 'react';
import AskModal from '../modal/AskModal';

export default function ReviewList({ product }: any) {
  const userId = useRecoilValue(userIdState);
  const [showModal, setShowModal] = useState(false);
  const { refreshReviewList } = useGetReviewList();

  const onDeleteBtnClick = async () => {
    try {
      await customAxios.delete(`/reviews/${product.reviewId}`);
      setShowModal(false);
      refreshReviewList();
    } catch (error) {
      console.error('상품후기 삭제 에러가 발생했습니다', error);
    }
  };

  return (
    <Wrapper>
      <Image src={product?.imageUrl} />
      <ContentWrapper>
        <Link to={`/products/${product.productId}/review`}>
          <Content>{product?.content}</Content>
        </Link>
        {userId == product?.userId && (
          <Buttons>
            <Link
              to={`/reviews/${product.reviewId}`}
              state={{ content: product.content, imageUrl: product.imageUrl }}
            >
              <Button>수정</Button>
            </Link>
            <ButtonDelete onClick={() => setShowModal(true)}>삭제</ButtonDelete>
          </Buttons>
        )}
      </ContentWrapper>
      {showModal && (
        <AskModal
          onConfirm={() => onDeleteBtnClick()}
          onClose={() => setShowModal(false)}
          message="선택한 상품후기를 삭제하시겠습니까?"
          confirmButtonText="삭제"
          cancelButtonText="취소"
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 30%;
  height: 100%;
  border-radius: 5px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 75px;
  height: 40px;
  background-color: #d9d9d9;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c2c2c2;
  }
`;

const ButtonDelete = styled(Button)`
  background-color: #ff6961;
  &:hover {
    background-color: #ff4d42;
  }
`;
