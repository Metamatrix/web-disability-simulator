export function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

export function isUpperCase(c) {
  return c === c.toUpperCase();
}