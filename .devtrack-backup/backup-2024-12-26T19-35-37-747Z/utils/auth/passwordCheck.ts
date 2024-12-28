/**
 * Generate a SHA-256 hash for the given string using the Web Crypto API.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

/**
 * Verify if a plain password matches the hashed password using the Web Crypto API.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const hash = await hashPassword(password);
  const hashBuffer = hexToBuffer(hash);
  const hashedPasswordBuffer = hexToBuffer(hashedPassword);

  // Use timingSafeEqual-like comparison to avoid timing attacks.
  return buffersEqual(hashBuffer, hashedPasswordBuffer);
}

/**
 * Convert an ArrayBuffer to a hexadecimal string.
 */
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert a hexadecimal string to an ArrayBuffer.
 */
function hexToBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes.buffer;
}

/**
 * Compare two ArrayBuffers for equality in a way that prevents timing attacks.
 */
function buffersEqual(buffer1: ArrayBuffer, buffer2: ArrayBuffer): boolean {
  if (buffer1.byteLength !== buffer2.byteLength) return false;

  const view1 = new Uint8Array(buffer1);
  const view2 = new Uint8Array(buffer2);

  let isEqual = true;
  for (let i = 0; i < view1.length; i++) {
    isEqual = isEqual && view1[i] === view2[i];
  }
  return isEqual;
}
