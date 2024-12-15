export const abi = [
  "function transfer(address to, uint256 value) external returns (bool)",
  "function approve(address spender, uint256 value) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

export const domain = {
  name: "TrustedForwarder",
  version: "1",
  chainId: 1, // Cambiar al chainId correcto si es necesario
  verifyingContract: "0xTuDireccionDeForwarder", // Dirección del TrustedForwarder
};

export const types = {
  ForwardRequest: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "gas", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "data", type: "bytes" },
  ],
};
