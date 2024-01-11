/**
 * Recursive portion of the QuickSort algorithm
 * @param inputArray Array to be sorted
 * @param rangeLow index start
 * @param rangeHigh index end
 */
function quickSort(inputArray: number[], rangeLow: number, rangeHigh: number) {
  if (rangeLow >= rangeHigh) return;

  const pivotIndex = partition(inputArray, rangeLow, rangeHigh);
  quickSort(inputArray, rangeLow, pivotIndex - 1);
  quickSort(inputArray, pivotIndex + 1, rangeHigh);
}

/**
 * The business end of the QuickSort algorithm
 * @param inputArray Array to be sorted
 * @param rangeLow index start
 * @param rangeHigh index end
 * @returns index of the pivot
 */
function partition(
  inputArray: number[],
  rangeLow: number,
  rangeHigh: number
): number {
  const pivotValue = inputArray[rangeHigh];
  let pivotIndex = rangeLow - 1;

  for (let i = rangeLow; i <= rangeHigh; i++) {
    // guard clause to prevent swap
    if (i !== rangeHigh && inputArray[i] >= pivotValue) continue;
    pivotIndex++;
    const tempSwap = inputArray[i];
    inputArray[i] = inputArray[pivotIndex];
    inputArray[pivotIndex] = tempSwap;
  }
  return pivotIndex;
}

/**
 * Implementation of the QuickSort algorithm.
 * @param inputArray Array to be sorted in place
 */
export default function QuickSort(inputArray: number[]): number[] {
  quickSort(inputArray, 0, inputArray.length - 1);
  return inputArray;
}
