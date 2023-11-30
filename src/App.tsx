import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Home from "./routes/Home";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    width: 430px;
    height: 800px;
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/users/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
