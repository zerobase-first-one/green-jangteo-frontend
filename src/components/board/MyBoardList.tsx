// import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { postState } from "../../store/atom/postState";
import BoardListForm from "./BoardListForm";

// interface MyBoardListProps {
//   content: {
//     postId: string;
//     username: string;
//     title: string;
//     createdAt: string;
//     modifiedAt?: string;
//     commentCount: number;
//   }[];
// }

export default function MyBoardList() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPost] = useRecoilState(postState);
  console.log("리스트목록", posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/my`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        const postData = response.data.content;
        console.log(postData);
        setPost({ content: postData });
      } catch (error) {
        console.error("Error fetching data:", error);
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
      {posts.content.map((post) => (
        <BoardListForm key={post.postId} {...post} />
      ))}
    </>
  );
}

// const Wrapper = styled.div`
//   width: 400px;
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
