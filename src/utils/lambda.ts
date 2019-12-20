export const getLambda = (lambda: string): string => {
  const host = ["localhost", "127.0.0.1"].includes(document.location.hostname)
    ? "http://127.0.0.1:4000"
    : "";
  return `${host}/.netlify/functions/${lambda}`;
};
