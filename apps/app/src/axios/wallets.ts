import axios from "axios";

const options = {
  method: "post",
  url: "https://api.circle.com/v1/w3s/user/wallets",
  headers: { "Content-Type": "application/json" },
  data: {
    idempotencyKey: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    blockchains: ["MATIC-AMOY"],
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
