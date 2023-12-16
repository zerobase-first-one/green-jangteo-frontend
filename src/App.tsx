import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { Board } from "./views/Board";
import Detail from "./views/Detail";
import Description from "./views/Description";
import Review from "./views/Review";
import Home from "./views/Home/Home";
import CategoryPage from "./views/CategoryPage";
import Search from "./views/Search";
import Cart from "./views/Cart/Cart";
import Order from "./views/Order/Order";
import CreatePostForm from "./views/CreatePostForm";
import MyBoardDetail from "./views/MyBoardDetail";
import Profile from "./views/profile/Profile";
import { ChangePassword } from "./views/profile/ChangePassword";
import MyBoardList from "./components/board/MyBoardList";
import { ChangeEmail } from "./views/profile/ChangeEmail";
import { ChangePhone } from "./views/profile/ChangePhone";
import { DeleteAccount } from "./views/profile/DeleteAccount";
import { ChangeAddress } from "./views/profile/ChangeAddress";

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    --maincolor : #16A114;
  }

  #root {
    position: relative;
    color: #333333;
    overflow-x: hidden;
    background-color: #ffffff;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
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
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/:userId/profile" element={<Profile />} />
        <Route path="/users/:userId/password" element={<ChangePassword />} />
        <Route path="/users/:userId/email" element={<ChangeEmail />} />
        <Route path="/users/:userId/phone" element={<ChangePhone />} />
        <Route path="/users/:userId/address" element={<ChangeAddress />} />
        <Route path="/users/:userId" element={<DeleteAccount />} />
        <Route path="/posts" element={<Board />}>
          <Route path="my" element={<MyBoardList />} />
        </Route>
        <Route path="/posts/:postId" element={<MyBoardDetail />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/products/:productId" element={<Detail />}>
          <Route path="description" element={<Description />} />
          {/* <Route path="review" element={<Review />} /> */}
        </Route>
        <Route path="/reviews/products/:productId" element={<Review />} />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/carts" element={<Cart />}></Route>
        <Route path="/orders" element={<Order />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
