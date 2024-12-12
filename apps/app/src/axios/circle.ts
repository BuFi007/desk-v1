import axios from "axios";

export const createCircleUser = async ({
  idempotencyKey,
  deviceId,
}: {
  idempotencyKey: string;
  deviceId: string;
}) => {
  const options = {
    method: "post",
    url: "https://api.circle.com/v1/w3s/users/social/token",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      idempotencyKey: idempotencyKey,
      deviceId: deviceId,
    },
  };
  const userKeys = await axios.request(options);
  console.log(userKeys, "userKeys");
  return userKeys;
};

// export const getAppId = async (): Promise<string> => {
//   const appid = await axios.get("w3s/config/entity");
//   console.log(appid, "appid");
//   return appid.data.appId;
// };

// export const getCircleUser = async (id: string) => {
//   const userInfo = await axios.get(`/user/${id}`);

//   return userInfo;
// };
