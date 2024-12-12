import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@bu/ui/button";
import { Input } from "@bu/ui/input";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { getSession } from "@/utils/supabase/session";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
let sdk: W3SSdk;

export default function Circle() {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    const userSession = async () => {
      const session = await getSession();

      sdk = new W3SSdk({
        appSettings: { appId: "56f2f2f8-6168-5024-8970-9a1f3b640ade" },
        authentication: {
          userToken: session?.userToken!,
          encryptionKey: session?.encryptionKey!,
        },
      });

      const deviceId = await sdk.getDeviceId();
      // console.log(deviceId, "deviceId");
      // console.log(session?.user.user_metadata.provider_id, "session?.user?.id");
      const res = await axios.post("/api/wallet", {
        deviceId,
      });
      console.log(res, "res");
    };
    userSession();
  }, []);

  const onSubmit = useCallback(() => {
    sdk.setAppSettings({ appId: user?.appId! });
    sdk.setAuthentication({
      userToken: user?.userToken!,
      encryptionKey: user?.encryptionKey!,
    });

    sdk.execute(user?.challengeId!, (error, result) => {
      if (error) {
        alert(`Error: ${error?.message ?? "Error!"}`);
        return;
      }
      alert(`Challenge: ${result?.type}, Status: ${result?.status}`);
    });
  }, [user]);

  return (
    <div className="p-4">
      <Input placeholder="App Id" value={user?.appId!} />
      <Input placeholder="User Token" value={user?.userToken!} />
      <Input placeholder="Encryption Key" value={user?.encryptionKey!} />

      <Input placeholder="Challenge Id" value={user?.challengeId!} />
      <Button variant="default" onClick={onSubmit}>
        Verify Challenge
      </Button>
    </div>
  );
}
