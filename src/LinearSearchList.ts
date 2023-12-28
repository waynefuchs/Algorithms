export default function linearSearchList(
  haystack: number[],
  needle: number,
): boolean {
  if (!Array.isArray(haystack)) return false;
  if (typeof needle !== "number") return false;
  return haystack?.find((v) => v === needle) !== undefined;
}
