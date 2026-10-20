import { ImageResponse } from "next/og";
import { getExperiment } from "@/lib/experiments";
import { STATUS_LABEL } from "@/lib/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  const title = experiment?.title ?? "Lab";
  const summary = experiment?.summary ?? "An experiment by Yogesh Bhusara.";
  const status = experiment ? STATUS_LABEL[experiment.status] : "Lab";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(100deg, #efe4fb, #f8ead4)",
          color: "#241c33",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>Lab · Yogesh Bhusara</span>
          <span>{status}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, maxWidth: 900 }}>{summary}</div>
        </div>
      </div>
    ),
    size,
  );
}
