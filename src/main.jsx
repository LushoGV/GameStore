import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import "./styles/BarLeft.css";
import "./styles/Nav.css";
import "./styles/PageCont.css";
import "./styles/Page.css";
import { LoaderProvider } from "./context/ContextLoader";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
