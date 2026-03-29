interface PolaroidFrameProps {
  caption: string;
  rotation: number;
  src?: string;
  size?: "normal" | "small" | "large";
  portrait?: boolean;
}

export function PolaroidFrame({
  caption,
  rotation,
  src,
  size = "normal",
  portrait = false,
}: PolaroidFrameProps) {
  const maxWidth =
    size === "small" ? "160px" : size === "large" ? "360px" : "280px";
  const aspectRatio = portrait ? "3/4" : "4/3";
  return (
    <div
      className="inline-block"
      style={{
        transform: `rotate(${rotation}deg)`,
        background: "#F4F1EC",
        padding: "14px 14px 52px 14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)",
        maxWidth,
        width: "100%",
      }}
    >
      {/* Image area */}
      <div
        style={{
          background: "#2A2A2A",
          aspectRatio,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          overflow: "hidden",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={caption}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              display: "block",
            }}
          />
        ) : (
          <>
            <span style={{ fontSize: "2rem" }}>📷</span>
            <span
              style={{
                color: "#666",
                fontSize: "12px",
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
                textAlign: "center",
                padding: "0 12px",
              }}
            >
              photo coming soon
            </span>
          </>
        )}
      </div>
      {/* Caption */}
      <div
        style={{
          color: "#1A1A1A",
          fontStyle: "italic",
          fontFamily: '"Playfair Display", serif',
          fontSize: "13px",
          textAlign: "center",
          paddingTop: "14px",
          letterSpacing: "0.03em",
        }}
      >
        {caption}
      </div>
    </div>
  );
}
