import styled from 'styled-components';
import BoardListForm from './BoardListForm';
import useGetMyBoardList from '../../hooks/useGetMyBoardList';

export default function AllBoardList() {
  const { posts, isLoading, setPage, page } = useGetMyBoardList();

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return isLoading ? (
    <div>로딩중...</div>
  ) : (
    <>
      <>
        {Array.isArray(posts) && posts.length > 0 && (
          <>
            {posts.map(post => (
              <BoardListForm key={post.postId} {...post} />
            ))}
          </>
        )}
        <ButtonContainer>
          <Button onClick={handlePreviousPage} disabled={page === 0}>
            이전 페이지
          </Button>
          <Button onClick={handleNextPage} disabled={isLoading}>
            다음 페이지
          </Button>
        </ButtonContainer>
      </>
      {!isLoading && (!Array.isArray(posts) || posts.length === 0) && (
        <NoPostsText>게시물이 없습니다</NoPostsText>
      )}
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #f5f5f5;
  color: #111;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const NoPostsText = styled.div`
  margin: 20px;
  font-size: 18px;
  color: #555;
`;
