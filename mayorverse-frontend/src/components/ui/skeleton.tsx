interface ISkeleton {
  width?: number | string;
  height?: number | string;
  className?: string;
  full?: boolean;
  lighter?: boolean;
  rounded?: "md" | "full";
}

export function Skeleton({
  width,
  height,
  full = false,
  lighter = false,
  rounded = "md",
  className = "",
}: ISkeleton) {
  return (
    <div
      className={`${
        lighter ? "bg-gray-600" : "bg-gray-700"
      } rounded-${rounded} inline-block animate-pulse ${className}`}
      style={
        full
          ? { width: "100%", height: "100%" }
          : {
              width: typeof width === "string" ? width : `${width}px`,
              height: typeof height === "string" ? height : `${height}px`,
            }
      }
    />
  );
}
