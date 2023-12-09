import styled from "styled-components";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/union";
import { useRecoilState } from "recoil";
import { postState } from "../store/atom/postState";
import ConfirmModal from "../components/modal/ConfirmModal";

const Wrapper = styled.div`
  width: 430px;
  height: 800px;
  background-color: #e7e7e7;
`;

const Form = styled.form`
  width: 100%;
  height: 280px;
  background-color: #ffffff;
  margin-top: 20px;
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  background-color: #999999;
  margin: 10px;
  cursor: pointer;
`;

interface IForm {
  title: string;
  content: string;
}

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPost] = useRecoilState(postState);
  const [showModal, setShowModal] = useState(false);
  console.log("등록페이지", posts);

  const createPost = async ({ title, content }: IForm) => {
    const data = { title, content };
    await axios
      .post(`${BASE_URL}/create-post`, data)
      .then((response) => {
        // const { token } = response.data;
        console.log(response.data);
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // setToken(token);
        const newPostData = response.data;
        setPost((prevPosts) => ({
          content: [...prevPosts.content, newPostData],
        }));
      })
      .catch((e) => {
        console.error("Login Error:", e);
        throw e;
      });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createPost({ title, content });
      setTitle("");
      setContent("");
    } catch (e) {
      console.error(e);
    }
    setShowModal(true);
  };

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={onSubmit}>
        <Title
          placeholder="제목을 입력하세요."
          onChange={onTitleChange}
          value={title}
          required
        />
        <TextArea
          placeholder="내용을 입력하세요.(최대 300자)"
          onChange={onContentChange}
          maxLength={300}
          value={content}
          required
        />
        <SubmitBtn type="submit">등록</SubmitBtn>
      </Form>
      {showModal && <ConfirmModal onClose={() => setShowModal(false)} />}
    </Wrapper>
  );
};

export default CreatePostForm;
