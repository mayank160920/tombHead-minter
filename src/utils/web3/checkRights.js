import { abi } from "../../data/nft.json";

export async function checkRights(nftContractAddress, accountAddress) {
  const web3 = new window.Web3(window.ethereum);
  const NFTContract = new web3.eth.Contract(abi, nftContractAddress);

  const result = await NFTContract.methods
    .hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', accountAddress)
    .call();
  return result;
}
