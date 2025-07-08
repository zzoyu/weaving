/* eslint-disable @next/next/no-img-element */
import { getPublicUrl } from "@/utils/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";
const pretendardFont = fetch(
  "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-ExtraBold.otf"
).then(async (res) => await res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = decodeURIComponent(searchParams.get("name") || "");
    const description = decodeURIComponent(
      searchParams.get("description") || ""
    );
    const thumbnail = getPublicUrl(
      decodeURIComponent(searchParams.get("thumbnail") || "")
    );
    if (!thumbnail) {
      return new Response("Thumbnail is required", { status: 400 });
    }

    const imageRes = await fetch(thumbnail);

    if (!imageRes.ok) {
      return new Response("Failed to load thumbnail", { status: 400 });
    }
    const imageBuffer = await imageRes.arrayBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "315px",
            width: "600px",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            margin: "0",
            padding: "0",
          }}
        >
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              "/assets/images/og/without-logo.jpg"
            }
            alt="without-logo"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "180px",
                height: "180px",
                borderRadius: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={imageBuffer as any}
                alt={name || ""}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",

                width: "50%",
                padding: "16px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Pretendard-ExtraBold",
                  fontStyle: "normal",
                  fontWeight: 800,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "48px",
                  margin: 0,
                  textAlign: "left",
                  color: "transparent",
                  backgroundClip: "text",
                  backgroundImage: "linear-gradient(90deg, #97e6ab, #68e7fa)",
                }}
              >
                {name}
              </h1>
              {description && (
                <p
                  style={{
                    fontSize: "20px",
                    margin: "0 0 0 4px",
                    color: "white",
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 315,
        fonts: [
          {
            name: "Pretendard-ExtraBold",
            data: await pretendardFont,
            weight: 800,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: unknown) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
