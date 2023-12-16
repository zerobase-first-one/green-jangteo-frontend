import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { Container } from "@mui/material";
// import { Container } from “@mui/material”;
// ReactDOM.createRoot(document.getElementById(“root”)!).render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <Container fixed>
//         <App />
//       </Container>
//     </RecoilRoot>
//   </React.StrictMode>
// );

// import axios from "axios";
// import { BASE_URL } from "./constant/union.ts";

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Container>
        <App />
      </Container>
    </RecoilRoot>
  </React.StrictMode>,
);
