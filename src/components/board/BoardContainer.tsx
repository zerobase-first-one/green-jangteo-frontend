import styled from 'styled-components';
import { useMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AllBoardList from './AllBoardList';
import MyBoardList from './MyBoardList';

export default function BoardContainer() {
  const allPostMatch = useMatch('/posts');
  const myPostMatch = useMatch('/posts/my');

  return (
    <Wrapper>
      <Tabs>
        <Tab isActive={allPostMatch !== null}>
          <Link to="/posts">전체 문의</Link>
        </Tab>
        <Tab isActive={myPostMatch !== null}>
          <Link to="/posts/my">나의 문의</Link>
        </Tab>
      </Tabs>
      {allPostMatch !== null ? <AllBoardList /> : <MyBoardList />}
      <Link to={'/create-post'}>
        <PostButton>글쓰기</PostButton>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background-color: #e7e7e7;
  height: 100vh;
`;

const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  font-size: 24px;
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px 0px;
  border: none;
  background-color: ${props => (props.isActive ? '#149211' : '#E0E0E0')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#AAAAAA')};
`;

const PostButton = styled.button`
  position: absolute;
  bottom: 25px;
  right: 30px;
  background-color: #4caf50;
  width: 125px;
  height: 50px;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;
