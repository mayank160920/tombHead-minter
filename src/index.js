import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "../src/components/App";
import { Web3ContextProvider } from "./context/web3/Web3Context";
import { IPFSContextProvider } from "./context/ipfs/IPFSContext";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Web3ContextProvider>
        <IPFSContextProvider>
          <App />
        </IPFSContextProvider>
      </Web3ContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
