import { abi } from "../../data/nft.json";

export async function getMaxSupply(nftContractAddress) {
  const web3 = new window.Web3(window.ethereum);
  const NFTContract = new web3.eth.Contract(abi, nftContractAddress);

  const max_supply = await NFTContract.methods.max_supply().call();
  return max_supply;
}
