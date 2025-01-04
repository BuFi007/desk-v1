import { ethers } from "ethers";
import { erc20Abi } from "viem";

export const ApproveERC20 = async (
  tokenAddress: string,
  spenderAddress: string,
  signer: ethers.Signer,
  amount: string,
) => {
  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

  const tx = await tokenContract?.approve(spenderAddress, amount);

  await tx.wait();

  return tx;
};

export const CreateInvoice = async (
  tokenAddress: string,
  spenderAddress: string,
  signer: ethers.Signer,
  amount: string,
) => {
  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
};
