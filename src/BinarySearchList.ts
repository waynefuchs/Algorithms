/**
 * Searches for a value in a sorted list, implementing Binary Search.
 *
 * O(log n)
 *
 * @param haystack - A sorted list of numbers
 * @param needle - The number to search for within haystack
 * @returns - true or false depending on whether the needle was successfully located
 */
export default function BinarySearchList(
  haystack: number[],
  needle: number
): boolean {
  // Simple guard to protect against ignored typescript typing
  if (!Array.isArray(haystack)) return false;
  if (typeof needle !== "number") return false;

  // Function to calculate the midpoint index for halving
  const getHalfIndex = (min: number, max: number): number =>
    Math.floor((min + max) / 2);

  for (
    let indexMin = 0,
      indexMax = haystack.length - 1,
      indexHalf = getHalfIndex(indexMin, indexMax);
    indexMin <= indexMax;
    indexHalf = getHalfIndex(indexMin, indexMax)
  ) {
    const currentValue = haystack[indexHalf];
    if (currentValue === needle) return true; // Found it
    else if (needle < currentValue && indexMax !== indexHalf)
      indexMax = indexHalf; // Move Left
    else if (currentValue < needle && indexMin !== indexHalf)
      indexMin = indexHalf; // Move Right
    else indexMin++; // "stuck", move right
  }
  return false;
}
