export function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function pointInRect(x, y, rect) {
  return inRange(x, rect.x, rect.x + rect.width) &&
         inRange(y, rect.y, rect.y + rect.height);
}

export function inRange(value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
}