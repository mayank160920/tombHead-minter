import { abi } from "../../data/nft.json";

export async function approveMigrator(
  migratorAddress,
  nftContractAddress,
  accountAddress
) {
  const web3 = new window.Web3(window.ethereum);
  const NFTContract = new web3.eth.Contract(abi, nftContractAddress);

  await NFTContract.methods
    .setApprovalForAll(migratorAddress, true)
    .estimateGas({
      from: accountAddress,
      value: 0
    });

  await NFTContract.methods.setApprovalForAll(migratorAddress, true).send({
    from: accountAddress,
    value: 0
  });
}
