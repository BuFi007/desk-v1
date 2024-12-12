import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets";
import { NextResponse } from "next/server";

const circleUserSdk = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
});

export async function POST(request: Request) {
  const { deviceId } = await request.json();
  const deviceToken = await circleUserSdk.createDeviceTokenForSocialLogin({
    deviceId,
  });

  const response = await circleUserSdk.createUserPinWithWallets({
    userToken: deviceToken.data?.deviceToken!,
    accountType: "SCA",
    blockchains: ["MATIC-AMOY"],
  });

  //   const response = await circleUserSdk.createUserPinWithWallets({
  //     userToken: deviceToken?.data?.userToken,
  //     accountType: "SCA",
  //     blockchains: ["MATIC-AMOY"],
  //   });

  console.log(deviceToken.data, "deviceToken");

  return deviceToken;
}
