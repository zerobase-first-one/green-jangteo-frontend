import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Signup from "./routes/Signup";
import Detail from "./routes/Detail";
import Description from "./routes/Description";
import Review from "./routes/Review";
import Home from "./routes/Home/Home";
import CategoryPage from "./routes/CategoryPage";
import Search from "./routes/Search";
import Cart from "./routes/cart/Cart";
import Order from "./routes/Order/Order";
import Board from "./routes/Board";
import MyBoard from "./routes/MyBoardList";
import AllBoard from "./routes/AllBoardList";
import CreatePostForm from "./routes/CreatePostForm";
import MyBoardDetail from "./routes/MyBoardDetail";
import SellerProfile from "./routes/Seller/SellerProfile";
import SellerProductList from "./routes/Seller/SellerProductList";
import SellerOrderList from "./routes/Seller/SellerOrderList";
import SellerOrderDetail from "./routes/Seller/SellerOrderDetail";
import UploadProduct from "./routes/Seller/UploadProduct";
import SellerProductDetail from "./routes/Seller/SellerProductDetail";
import SellerDescription from "./routes/Seller/SellerDescription";
import SellerReview from "./routes/Seller/SellerReview";
import Profile from "./routes/Profile";
import ChangePassword from "./routes/ChangePassword";

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    --maincolor : #16A114;
  }

  #root {
    margin: 0 auto;
    position: relative;
    color: #333333;
    overflow-x: hidden;
    background-color: #ffffff;
    // @media screen and (min-width: 1080px) {
    //   width: 1080px;
    // }
    // @media screen and (max-width: 430px) {
    //   width: 430px;
    // }
  }
  
  * {
    box-sizing: border-box;
  }

  body {
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
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/:userId/profile" element={<Profile />} />
        <Route path="/users/:userId/password" element={<ChangePassword />} />
        <Route path="/posts" element={<Board />}>
          <Route path="my-post" element={<MyBoard />} />
          <Route path="all-post" element={<AllBoard />} />
        </Route>
        <Route path="/posts/:postId" element={<MyBoardDetail />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/products/:productId" element={<Detail />}>
          <Route path="description" element={<Description />} />
          <Route path="review" element={<Review />} />
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/carts" element={<Cart />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/stores/:userId" element={<SellerProfile />}>
          <Route path="" element={<SellerProductList />}></Route>
          <Route path="order" element={<SellerOrderList />}></Route>
        </Route>
        <Route
          path="/stores/:userId/products/:productId"
          element={<SellerProductDetail />}
        >
          <Route path="" element={<SellerDescription />}></Route>
          <Route path="review" element={<SellerReview />}></Route>
        </Route>
        <Route
          path="/stores/:userId/order/:orderId"
          element={<SellerOrderDetail />}
        ></Route>
        <Route
          path="/stores/:userId/upload"
          element={<UploadProduct />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
