import { abi } from "../../data/nft.json";

export async function mintNFT(tokenUri, nftContractAddress, accountAddress) {
  const web3 = new window.Web3(window.ethereum);
  const NFTContract = new web3.eth.Contract(abi, nftContractAddress);

  await NFTContract.methods.mint(tokenUri).estimateGas({
    from: accountAddress,
    value: 0
  });

  await NFTContract.methods.approve(tokenUri).send({
    from: accountAddress,
    value: 0
  });
}
