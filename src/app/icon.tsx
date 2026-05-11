import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 14,
          color: "#fff",
          letterSpacing: -0.5,
        }}
      >
        P+
      </div>
    ),
    { ...size }
  );
}
