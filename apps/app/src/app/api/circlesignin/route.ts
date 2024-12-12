import axios from "axios";

export const POST = async (req: Request) => {
  const { idempotencyKey, deviceId } = await req.json();
  try {
    const options = {
      method: "post",
      url: "https://api.circle.com/v1/w3s/users/social/token",
      headers: {
        Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        idempotencyKey: idempotencyKey,
        deviceId: deviceId,
      },
    };

    const userKeys = await axios.request(options);
    console.log(userKeys.status, "userKeys");
    return Response.json(userKeys);
  } catch (error) {
    console.log(error, "error");
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
