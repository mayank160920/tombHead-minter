import { getMaxSupply } from "../web3/getMaxSupply";
import { getNextTokenId } from "../web3/getNextTokenId";

export async function getNextTokenRep(nftContractAddress) {
  let maxSupply, nextTokenId;

  try {
    maxSupply = await getMaxSupply(nftContractAddress);
  } catch (error) {
    console.log("Error fetching maxSupply");
    console.error(error);
    maxSupply = "xx";
  }
  try {
    nextTokenId = await getNextTokenId(nftContractAddress);
  } catch (error) {
    console.log("Error fetching nextTokenId");
    console.error(error);
    nextTokenId = "xx";
  }
  return `${nextTokenId} / ${maxSupply}`;
}
