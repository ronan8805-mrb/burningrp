const ADMIN_USER = "cowboybrp";
const ADMIN_PASS = "brpcowboy";

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function adminCredentialsOk(username: string, password: string) {
  return safeEqual(username.trim(), ADMIN_USER) && safeEqual(password, ADMIN_PASS);
}
