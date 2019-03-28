export function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function randBetweenInclusive (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function truncateString (string, length) {
  if (string.length <= length) return string;
  return string.substr(0, length) + '...';
};