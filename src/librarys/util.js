export function decodeJWT(token) {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  return JSON.parse(atob(payload));
}