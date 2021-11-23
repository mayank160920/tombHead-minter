import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/home/Home";
import { Approve } from "../components/pages/approve/Approve";
import { Header } from "../components/shared/header/Header";
import { Footer } from "../components/shared/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NFTAddressOptions = [
  {
    value: "0xF6E47985bEB90bC1D24E9d1a1daAF2b316c3726E",
    label: "TombHeads",
    avatar: "./artists/tombhead_320.png"
  },
  {
    value: "0xF6E47985bEB90bC1D24E9d1a1daAF2b316c3726E",
    label: "TombHeads01",
    avatar: "./artists/samurai_320.png"
  },
  {
    value: "0xF6E47985bEB90bC1D24E9d1a1daAF2b316c3726E",
    label: "TombHeads02",
    avatar: "./artists/tombhead_320.png"
  },
  {
    value: "0xF6E47985bEB90bC1D24E9d1a1daAF2b316c3725E",
    label: "DefiDino",
    avatar: "./artists/defidino_320.gif"
  }
];

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
