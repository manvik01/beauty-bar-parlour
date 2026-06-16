const ALPHANUMERIC = "ACDEFGHJKLMNPQRTUVWXY2345679"

function randomToken(length: number) {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buf = new Uint32Array(length)
    crypto.getRandomValues(buf)
    let out = ""
    for (let i = 0; i < length; i++) {
      out += ALPHANUMERIC[buf[i] % ALPHANUMERIC.length]
    }
    return out
  }

  let out = ""
  for (let i = 0; i < length; i++) {
    out += ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)]
  }
  return out
}

export function generateLeadReference(date: Date = new Date()): string {
  const yyyy = date.getUTCFullYear().toString().padStart(4, "0")
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, "0")
  const dd = date.getUTCDate().toString().padStart(2, "0")
  return `BBP-${yyyy}${mm}${dd}-${randomToken(4)}`
}
