import { ImageResponse } from "next/og";
import { PERSONAL_INFO } from "@/data/portfolio";

export const alt = `${PERSONAL_INFO.fullName} — ${PERSONAL_INFO.professionalTitle}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#F7F9FA",
          color: "#0D1216",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="16" fill="#FFFFFF" />
              <rect
                x="1"
                y="1"
                width="62"
                height="62"
                rx="15"
                stroke="#DCE2E8"
                strokeWidth="2"
              />
              <path
                d="M35 14H45C47.2 14 49 15.8 49 18C49 20.2 47.2 22 45 22H35V14Z"
                fill="#FFD900"
              />
              <path
                d="M35 14H26C19.9 14 15 18.9 15 25C15 31.1 19.9 36 26 36H38C39.7 36 41 37.3 41 39C41 40.7 39.7 42 38 42H29V50H38C44.1 50 49 45.1 49 39C49 32.9 44.1 28 38 28H26C24.3 28 23 26.7 23 25C23 23.3 24.3 22 26 22H35V14Z"
                fill="#09B57B"
              />
              <path
                d="M19 42H29V50H19C16.8 50 15 48.2 15 46C15 43.8 16.8 42 19 42Z"
                fill="#FF5C5D"
              />
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#43505C",
                letterSpacing: "0.02em",
              }}
            >
              Software Engineering Portfolio
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ width: "44px", height: "8px", borderRadius: "4px", backgroundColor: "#09B57B" }} />
            <div style={{ width: "22px", height: "8px", borderRadius: "4px", backgroundColor: "#FFD900" }} />
            <div style={{ width: "22px", height: "8px", borderRadius: "4px", backgroundColor: "#FF5C5D" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#057850",
            }}
          >
            {PERSONAL_INFO.professionalTitle}
          </div>
          <div
            style={{
              fontSize: "54px",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#0D1216",
            }}
          >
            {PERSONAL_INFO.fullName}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#43505C",
              maxWidth: "920px",
              lineHeight: 1.35,
            }}
          >
            {PERSONAL_INFO.heroHeadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #DCE2E8",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#556371",
          }}
        >
          <span>{PERSONAL_INFO.email}</span>
          <span>github.com/savindu19990928</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
