import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Signup from "./routes/Signup";
import Detail from "./routes/Detail";
import Description from "./routes/Description";
import Review from "./routes/Review";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: beige;
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
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/products/:productId" element={<Detail />}>
          <Route path="description" element={<Description />} />
          <Route path="review" element={<Review />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
