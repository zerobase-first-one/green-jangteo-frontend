// import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IBoard, postState } from '../../store/atom/postState';
import BoardListForm from './BoardListForm';
import customAxios from '../../apiFetcher/customAxios';

export default function AllBoardList() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPost] = useRecoilState<IBoard[]>(postState);
  console.log('리스트목록', posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get(`/posts`);
        const postData = response.data || [];
        setPost(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPost]);

  return isLoading ? (
    <div>로딩중...</div>
  ) : (
    <>
      {posts.map(post => (
        <BoardListForm key={post.postId} {...post} />
      ))}
    </>
  );
}

// const Wrapper = styled.div`
//   width: 95%;
//   height: 170px;
//   background-color: #ffffff;
//   margin: 10px auto;
//   padding: 30px 20px;
// `;

// const Title = styled.div`
//   width: 100%;
//   margin-bottom: 30px;
// `;

// const Username = styled.p`
//   font-size: 12px;
// `;

// const CreateAt = styled.p`
//   font-size: 12px;
//   color: #999999;
// `;

// const Comment = styled.p`
//   margin-top: 20px;
// `;
