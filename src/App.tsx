import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { Board } from './views/Board';
import Detail from './views/Detail';
import Description from './views/Description';
import Review from './views/Review';
import Home from './views/Home/Home';
import CategoryPage from './views/CategoryPage';
import Search from './views/Search';
import Cart from './views/Cart/Cart';
import Order from './views/Order/Order';
import CreatePostForm from './views/CreatePostForm';
import MyBoardDetail from './views/MyBoardDetail';
import Profile from './views/profile/Profile';
import { ChangePassword } from './views/profile/ChangePassword';
import MyBoardList from './components/board/MyBoardList';
import { ChangeEmail } from './views/profile/ChangeEmail';
import { ChangePhone } from './views/profile/ChangePhone';
import { DeleteAccount } from './views/profile/DeleteAccount';
import { ChangeAddress } from './views/profile/ChangeAddress';
import SellerProfile from './routes/Seller/SellerProfile';
import SellerProductList from './routes/Seller/SellerProductList';
import SellerOrderList from './routes/Seller/SellerOrderList';
import SellerOrderDetail from './routes/Seller/SellerOrderDetail';
// import UploadProduct from './routes/Seller/UploadProduct';
import SellerProductDetail from './routes/Seller/SellerProductDetail';
import SellerDescription from './routes/Seller/SellerDescription';
import SellerReview from './routes/Seller/SellerReview';
import CreateReview from './views/CreateReview';
import MyReviews from './views/MyReviews';
import EditProduct from './routes/Seller/EditProduct';

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
          <Route path="review" element={<Review />} />
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/carts" element={<Cart />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/stores/:userId" element={<SellerProfile />}>
          <Route path="" element={<SellerProductList />}></Route>
          <Route path="order" element={<SellerOrderList />}></Route>
        </Route>
        <Route path="/reviews/users/:userId" element={<MyReviews />} />
        <Route path="/reviews" element={<CreateReview />} />
        <Route
          path="/stores/:userId/products/:productId"
          element={<SellerProductDetail />}
        >
          <Route path="description" element={<SellerDescription />}></Route>
          <Route path="review" element={<SellerReview />}></Route>
        </Route>
        <Route
          path="/stores/:userId/order/:orderId"
          element={<SellerOrderDetail />}
        ></Route>
        {/* <Route
          path="/stores/:userId/upload"
          element={<UploadProduct />}
        ></Route> */}
        <Route
          path="/stores/products/:productId"
          element={<EditProduct />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
