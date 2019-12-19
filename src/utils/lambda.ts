export const getLambda = (lambda: string): string => {
  const host =
    document.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "";
  return `${host}/.netlify/functions/${lambda}`;
};
