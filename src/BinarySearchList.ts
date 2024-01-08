/**
 * Searches for a value in a sorted list, implementing Binary Search.
 *
 * O(log n)
 *
 * @param haystack - A sorted list of numbers
 * @param needle - The number to search for within haystack
 * @returns - true or false depending on whether the needle was successfully located
 */
// Function to calculate the midpoint index for halving
export const getHalfIndex = (min: number, max: number): number =>
  Math.floor((min + max) / 2);

export default function BinarySearchList(
  haystack: number[],
  needle: number
): boolean {
  // Simple guard to protect against ignored typescript typing
  if (!Array.isArray(haystack)) return false;
  if (typeof needle !== "number") return false;

  let iterations = 0;
  for (
    let indexMin = 0,
      indexMax = haystack.length - 1,
      indexMidpoint = getHalfIndex(indexMin, indexMax);
    indexMin <= indexMax;
    indexMidpoint = getHalfIndex(indexMin, indexMax), iterations++
  ) {
    const valueMidpoint = haystack[indexMidpoint];
    if (valueMidpoint === needle) return true; // Found it
    else if (needle < valueMidpoint && indexMax !== indexMidpoint)
      indexMax = indexMidpoint; // Move Left
    else if (valueMidpoint < needle && indexMin !== indexMidpoint)
      indexMin = indexMidpoint; // Move Right
    else indexMin++; // "stuck", collapse window by increasing indexMin
  }
  return false;
}
