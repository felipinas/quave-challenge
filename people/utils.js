export function isWithinFiveSeconds(date) {
  const now = new Date();

  const diff = now - date;

  const diffInSeconds = diff / 1000;

  return diffInSeconds <= 5;
}
