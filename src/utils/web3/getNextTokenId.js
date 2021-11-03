import { abi } from "../../data/nft.json";

export async function getNextTokenId(nftContractAddress) {
  const web3 = new window.Web3(window.ethereum);
  const NFTContract = new web3.eth.Contract(abi, nftContractAddress);

  const tokenId = await NFTContract.methods._tokenIdTracker().call();
  return tokenId;
}
