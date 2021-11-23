import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/home/Home";
import { Approve } from "../components/pages/approve/Approve";
import { Header } from "../components/shared/header/Header";
import { Footer } from "../components/shared/footer/Footer";
import NFTAddressOptions from "../data/nftAddress.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [NFTAddress, setNFTAddress] = useState(NFTAddressOptions[0]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={["/", "/home"]}>
          <Home NFTAddy={{ NFTAddress, setNFTAddress, NFTAddressOptions }} />
        </Route>
        <Route exact path={"/approve"}>
          <Approve NFTAddy={NFTAddress} />
        </Route>
      </Switch>
      <Footer style={{ visibility: "hiddn" }} />
      <ToastContainer
        style={{ overflowWrap: "anywhere" }}
        position="bottom-right"
      />
    </div>
  );
}
