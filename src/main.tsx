import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { Container } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "./constant/union.ts";
import { Container } from "@mui/material";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Container>
        <App />
      </Container>
    </RecoilRoot>
  </React.StrictMode>,
);
