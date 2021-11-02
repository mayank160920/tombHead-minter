import { useState, createContext, useContext } from "react";

const Web3Context = createContext({});

export function Web3ContextProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [eventsRegistered, setEventsRegistered] = useState(false);

  async function connectAccount() {
    try {
      setLoading(true);

      // check if wallet has metamask
      if (!window.ethereum) {
        throw Error("You need Metamask to connect !");
      }

      // request account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      // request chainId
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      // if (parseInt(chainId) !== (250)) {
      //   throw Error("Please select FTM Network in your wallet");
      // }
      if (parseInt(chainId) !== 4) {
        throw Error("Please select Rinkeby Network in your wallet");
      }

      // check if events are registered
      if (!eventsRegistered) {
        registerEvents();
        setEventsRegistered(true);
      }

      setAddress(window.Web3.utils.toChecksumAddress(accounts[0]));
      if (error) {
        setError(null);
      }
    } catch (error) {
      setAddress(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function registerEvents() {
    // accountChange Handler
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        setAddress(null);
        setError(Error("Connect Your Wallet to access the site"));
      } else {
        setAddress(window.Web3.utils.toChecksumAddress(accounts[0]));
        setError(null);
      }
    });

    // chainChange Handler
    window.ethereum.on("chainChanged", (newChainId) => {
      console.log("Network Changed to Chain Id : ", parseInt(newChainId));
      window.location.reload();
    });
    console.log("MetaMask Event Handlers Registered");
  }

  return (
    <Web3Context.Provider
      value={{
        address,
        loading,
        connectAccount,
        error,
        eventsRegistered
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

// optional -> we can make a hook for convenience
export function useWeb3Context() {
  return useContext(Web3Context);
}
