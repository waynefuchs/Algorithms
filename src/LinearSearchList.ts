/**
 * Searches linearly through a list, implementing Linear Search.
 *
 * O(n)
 *
 * @param haystack - A list of numbers in any order
 * @param needle - The number to to search for within haystack
 * @returns - true or false depending on whether the needle was successfully located
 */
export default function LinearSearchList(
  haystack: number[],
  needle: number
): boolean {
  if (!Array.isArray(haystack)) return false;
  if (typeof needle !== "number") return false;
  return haystack?.find((v) => v === needle) !== undefined;
}
