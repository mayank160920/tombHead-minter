import { useWeb3Context } from "../../../context/web3/Web3Context";
import { approveMigrator } from "../../../utils/web3/approveMigrator";
import { Spinner } from "../../shared/spinner/Spinner";
import { Button } from "../../shared/button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import style from "./approve.module.css";

const wrapper_btn = {
  maxWidth: "min(100%, 400px)",
  margin: "10px auto"
};

export function Approve(props) {
  const { address } = useWeb3Context();
  const [migrator, setMigrator] = useState("");
  const [btnBusy, setBtnBusy] = useState(false);

  async function approveMigratorHandler() {
    if (!window.Web3.utils.isAddress(migrator)) {
      return toast.error("Invalid Address");
    }

    try {
      setBtnBusy(true);
      await approveMigrator(migrator, props.NFTAddy.value, address);
      toast.success("Contract Approved Successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      toast.error("Contract Approval Failed");
    } finally {
      setBtnBusy(false);
    }
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.heading}>Warning !</h2>
      <p>You should be very carefull with this next step.</p>
      <br />
      <p>
        Follow this checklist to make sure you have everything in place to start
        the migration process:
      </p>
      <br />
      <p>
        1. You have minted all the NFTs you want your NFT holders to migrate to.
      </p>
      <br />
      <p>
        2. The Migrator Contract is already deployed (ask OxKalakaua about this)
      </p>
      <br />
      <p className={style.highlight}>
        What you are about to do with this action is give permission to the
        Migrator contract to send your new NFTs to their corresponding owners.
      </p>
      <br />
      <p>Migrator Contract Address :</p>
      <input
        name="migratorAddress"
        value={migrator}
        onChange={(e) => setMigrator(e.target.value)}
        placeholder="eg : 0x000000000000000000000000000000000000dEaD"
      />
      <div className={style.headbtns_wrapper}>
        <Button style={wrapper_btn} onClick={approveMigratorHandler}>
          {btnBusy ? <Spinner /> : "Approve"}
        </Button>
        <Button style={wrapper_btn} link="/">
          Back
        </Button>
      </div>
    </div>
  );
}
