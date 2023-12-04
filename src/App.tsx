
import './App.css'
import './index.css'
import './reset.css'

import Header from "./Header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Home from './routes/Home/Home';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import CategoryPage from './routes/CategoryPage/CategoryPage';

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Signup from "./routes/Signup";
import Detail from "./routes/Detail";
import Description from "./routes/Description";
import Review from "./routes/Review";

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    --maincolor : #16A114;
  }

  #root {
    width: 430px;
    position: relative;
    color: #333333;
    height: 800px;
    overflow-x: hidden;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    width: 430px;
    background-color: beige;
    color: #333333;
    height: 800px;
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
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:firstCategory" element={<CategoryPage/>}></Route>
        <Route path="/:firstCategory/:secondCategory" element={<CategoryPage/>}></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/products/:productId" element={<Detail />}>
          <Route path="description" element={<Description />} />
          <Route path="review" element={<Review />} />
        </Route>        
      </Routes>
      <Footer />
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
