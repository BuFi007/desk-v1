// // import a from "../../public/tfhe_bg.wasm";
// // import { initFhevm, createInstance } from "./web.js";
// export interface FhevmInstance {
//   generateKeypair(): { publicKey: string; privateKey: string };
//   createEIP712(
//     publicKey: string,
//     contractAddress: string
//   ): {
//     domain: any;
//     types: { Reencrypt: any };
//     message: any;
//   };
//   reencrypt(
//     handle: bigint,
//     privateKey: string,
//     publicKey: string,
//     signature: string,
//     contractAddress: string,
//     address: string
//   ): Promise<any>;
// }

// export type Keypair = {
//   publicKey: string;
//   privateKey: string;
//   signature: string;
// };

// export const init = async () => {
//   await initFhevm({
//     thread: navigator.hardwareConcurrency,
//     tfheParams: a,
//   } as any);
// };

// let instancePromise: Promise<FhevmInstance>;
// let instance: FhevmInstance;

// export const createFhevmInstance = async () => {
//   if (instancePromise) return instancePromise;

//   instancePromise = createInstance({
//     network: window.ethereum,
//     aclContractAddress: "0x9479B455904dCccCf8Bc4f7dF8e9A1105cBa2A8e",
//     kmsContractAddress: "0x904Af2B61068f686838bD6257E385C2cE7a09195",
//     gatewayUrl: "https://gateway.sepolia.zama.ai/",
//   });
//   instance = await instancePromise;
// };

// export const getInstance = () => {
//   return instance;
// };
