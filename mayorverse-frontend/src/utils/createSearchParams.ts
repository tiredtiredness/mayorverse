export const createSearchParams = (
  data: Record<string, string | string[] | boolean | undefined>,
) => {
  return Object.entries(data)
    .map(([k, v]) => {
      if (typeof v === "string" && v.length > 0) {
        return `${k}=${v}`;
      }
      if (Array.isArray(v) && v.length > 0) {
        return `${k}=${v.join(",")}`;
      }
      if (typeof v === "boolean") return `${k}=true`;
      return null;
    })
    .filter(Boolean)
    .join("&");
};
