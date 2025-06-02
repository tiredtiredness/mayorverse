export const createSearchParams = (data: Record<string, string | string[]>) => {
  const str = Object.entries(data)
    .map(([k, v]) => (v.length ? `${k}=${v}` : null))
    .filter(Boolean)
    .join('&');
  return str;
};
