export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string) {
  const d = digitsOnly(value).slice(0, 19);
  if (brandFromNumber(d) === "amex") {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  }
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string) {
  const d = digitsOnly(value).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function brandFromNumber(num: string): CardBrand {
  const d = digitsOnly(num);
  if (/^3[47]/.test(d)) return "amex";
  if (/^4/.test(d)) return "visa";
  if (/^5[1-5]/.test(d) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(d)) return "mastercard";
  if (/^6(011|5)/.test(d)) return "discover";
  return "unknown";
}

export function brandLabel(brand: CardBrand) {
  if (brand === "visa") return "Visa";
  if (brand === "mastercard") return "Mastercard";
  if (brand === "amex") return "American Express";
  if (brand === "discover") return "Discover";
  return "Card";
}

function luhn(num: string) {
  const d = digitsOnly(num);
  if (d.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function validExpiry(value: string) {
  const m = /^(\d{2})\/(\d{2})$/.exec(value.trim());
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month, 0, 23, 59, 59);
  return exp >= now;
}

export function validCvc(cvc: string, brand: CardBrand) {
  const d = digitsOnly(cvc);
  if (brand === "amex") return d.length === 4;
  return d.length === 3;
}

export type ChargeResult =
  | { ok: true; last4: string; brand: CardBrand; auth: string }
  | { ok: false; error: string };

/** Simulated processor. 4242… authorizes. 4000 0000 0000 0002 declines. */
export function chargeCard(input: {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}): ChargeResult {
  const number = digitsOnly(input.number);
  const brand = brandFromNumber(number);
  if (!input.name.trim()) return { ok: false, error: "Name on card is required." };
  if (!luhn(number)) return { ok: false, error: "Check the card number." };
  if (!validExpiry(input.expiry)) return { ok: false, error: "Card is expired, or the date is wrong." };
  if (!validCvc(input.cvc, brand)) {
    return { ok: false, error: brand === "amex" ? "CID should be 4 digits." : "CVC should be 3 digits." };
  }
  if (number === "4000000000000002") {
    return { ok: false, error: "Card declined. Try another card." };
  }
  if (number === "4000000000009995") {
    return { ok: false, error: "Insufficient funds." };
  }
  const auth = `RP${Date.now().toString(36).toUpperCase()}`;
  return { ok: true, last4: number.slice(-4), brand, auth };
}

export function orderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `BR-${n}`;
}
