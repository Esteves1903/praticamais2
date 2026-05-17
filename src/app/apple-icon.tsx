import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #001f3f 0%, #1e40af 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 72,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: "#ffffff" }}>P</span>
        <span style={{ color: "#f97316" }}>+</span>
      </div>
    ),
    { ...size }
  );
}
