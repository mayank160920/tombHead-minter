import { useIPFS } from "../../../context/ipfs/IPFSContext";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { Button } from "../../shared/button/Button";
import { Spinner } from "../../shared/spinner/Spinner";
import { mintNFT } from "../../../utils/web3/mintNFT";
import { checkRights } from "../../../utils/web3/checkRights";
import { getNextTokenRep } from "../../../utils/parseUtils/getNextTokenRep";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import style from "./home.module.css";

const headbtns_wrapper_btn = {
  maxWidth: "min(100%, 400px)",
  margin: "10px auto",
};

export function Home(props) {
  const { NFTAddress, setNFTAddress, NFTAddressOptions } = props.NFTAddy;

  const { address } = useWeb3Context();
  const { IPFSuploading, IPFSerror, IPFSupload } = useIPFS();

  const inputFileRef = useRef(null);

  const [btnBusy, setBtnBusy] = useState(false);
  const [nextTokenRep, setNextTokenRep] = useState("xx/xx");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  function inputFileHandler() {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      inputFileRef.current.click();
    }
  }

  async function mintNFThandler() {
    if (!name) {
      return toast.error("NFT Name should not be empty");
    } else if (!description) {
      return toast.error("NFT Description should not be empty");
    } else if (!selectedFile) {
      return toast.error("Select a file to upload");
    }

    const hasMintingRights = await checkRights(NFTAddress.value, address);
    if (!hasMintingRights) {
      return toast.error("You don't have the rights to mint NFT");
    }

    try {
      setBtnBusy(true);
      const metadataUrl = await IPFSupload(
        {
          name: name,
          description: description,
        },
        selectedFile
      );
      await mintNFT(metadataUrl, NFTAddress.value, address);
      toast.success("Mint Successfull !");

      // reset inputs
      setName("");
      setDescription("");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      toast.error("NFT Minting Failed");
    } finally {
      setBtnBusy(false);
    }
  }

  useEffect(() => {
    if (IPFSuploading) {
      toast.info("Uploading NFT data To IPFS");
    }
  }, [IPFSuploading]);

  useEffect(() => {
    if (IPFSerror) {
      toast.error(IPFSerror.message);
    }
  }, [IPFSerror]);

  useEffect(() => {
    getNextTokenRep(NFTAddress.value).then((_tokenRep) =>
      setNextTokenRep(_tokenRep)
    );
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.headbtns_wrapper}>
        <Dropdown
          className={style.dropdown}
          controlClassName={style.dropdown_control}
          menuClassName={style.dropdown_menu}
          options={NFTAddressOptions}
          onChange={(value) => setNFTAddress(value)}
          value={NFTAddress}
          placeholder="Select an Option"
        />
        <Button style={headbtns_wrapper_btn} link="/approve">
          Start Migration
        </Button>
      </div>

      <p>
        Token : &nbsp;
        <span style={{ color: "var(--fgText)" }}>{nextTokenRep}</span>
      </p>
      <p>Name :</p>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="eg : TombHeads"
      />
      <p>Description (optional) :</p>
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="eg : Special Edition"
      />
      <p>Upload File :</p>
      <div className={style.uploadbox_wrapper}>
        {selectedFile ? (
          <>
            <p>File Name : {selectedFile.name}</p>
            <p>File Type : {selectedFile.type}</p>
          </>
        ) : (
          <p>0 File(s) Uploaded</p>
        )}
        <Button
          style={{ backgroundColor: "var(--fgText)" }}
          onClick={inputFileHandler}
        >
          {selectedFile ? "Remove File" : "Upload File"}
          <input
            ref={inputFileRef}
            style={{ display: "none" }}
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </Button>
      </div>
      <Button
        style={headbtns_wrapper_btn}
        text="Mint NFT"
        onClick={mintNFThandler}
      >
        {btnBusy ? <Spinner /> : "Mint"}
      </Button>
    </div>
  );
}
