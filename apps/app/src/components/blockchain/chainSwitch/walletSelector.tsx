"use client";

import { Button } from "@bu/ui/button";
import { useConnect } from "wagmi";

export function WalletSelector() {
  const { connect, connectors, isPending } = useConnect();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Seleccionar Wallet</h3>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (no soportado)"}
          {/* {isPending &&
            connector.id === isPendingConnector?.id &&
            " (conectando)"} */}
        </Button>
      ))}
    </div>
  );
}
