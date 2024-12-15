import React from "react";

type OgTemplateProps = {
  recipientAddress: string;
  tokenAmount: string;
  tokenSymbol: string;
  viewedAt: string;
};

export default function OgTemplate({
  recipientAddress,
  tokenAmount,
  tokenSymbol,
}: OgTemplateProps) {
  const containerStyle = {
    display: "flex",
    width: "1200px",
    height: "630px",
    backgroundColor: "white",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    width: "100%",
    padding: "64px",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const titleContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "400",
    color: "#171717",
  };

  const subtitleStyle = {
    fontSize: "20px",
    color: "#737373",
  };

  const statusStyle = {
    padding: "8px 12px",
    borderRadius: "9999px",
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontSize: "14px",
  };

  const amountContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const amountLabelStyle = {
    fontSize: "20px",
    color: "#737373",
  };

  const amountValueContainerStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "16px",
  };

  const amountStyle = {
    fontSize: "64px",
    fontWeight: "400",
    color: "#171717",
  };

  const currencyStyle = {
    fontSize: "32px",
    color: "#737373",
  };

  const footerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const logoContainerStyle = {
    height: "24px",
    width: "24px",
  };

  const footerTextStyle = {
    fontSize: "14px",
    color: "#a3a3a3",
  };

  const truncatedAddress = `${recipientAddress?.slice(
    0,
    6
  )}...${recipientAddress?.slice(-4)}`;

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <span style={titleStyle}>Payment Request</span>
            <span style={subtitleStyle}>from {truncatedAddress}</span>
          </div>
          <div style={statusStyle}>PENDING</div>
        </div>

        <div style={amountContainerStyle}>
          <span style={amountLabelStyle}>Amount Due</span>
          <div style={amountValueContainerStyle}>
            <span style={amountStyle}>
              {parseFloat(tokenAmount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span style={currencyStyle}>{tokenSymbol}</span>
          </div>
        </div>

        <div style={footerStyle}>
          <div style={logoContainerStyle}>
            <img
              src="https://defi.bu.finance/logo.svg"
              alt="Bu.fi Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <span style={footerTextStyle}>Powered by Bu.fi</span>
        </div>
      </div>
    </div>
  );
}
