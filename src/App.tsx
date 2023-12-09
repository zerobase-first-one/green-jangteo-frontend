import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Signup from "./routes/Signup";
import Detail from "./routes/Detail";
import Description from "./routes/Description";
import Review from "./routes/Review";
import Home from "./routes/Home/Home";
import Board from "./routes/Board";
import CategoryPage from "./routes/CategoryPage";
import MyBoard from "./routes/MyBoardList";
import AllBoard from "./routes/AllBoardList";
import CreatePostForm from "./routes/CreatePostForm";
import MyBoardDetail from "./routes/MyBoardDetail";

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    --maincolor : #16A114;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    width: 430px;
    height: 800px;
    background-color: beige;
    overflow-x: hidden;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:firstCategory" element={<CategoryPage />}></Route>
        <Route
          path="/:firstCategory/:secondCategory"
          element={<CategoryPage />}
        ></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/posts" element={<Board />}>
          <Route path="my-post" element={<MyBoard />} />
          <Route path="all-post" element={<AllBoard />} />
        </Route>
        <Route path="/posts/:postId" element={<MyBoardDetail />} />
        <Route path="/create-post" element={<CreatePostForm />}></Route>
        <Route path="/products/:productId" element={<Detail />}>
          <Route path="description" element={<Description />} />
          <Route path="review" element={<Review />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
