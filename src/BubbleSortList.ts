/**
 * Mutably sorts a list.
 * @param list A number array to be sorted
 */
export default function BubbleSortList(
  list: number[],
  ascending: boolean = true
) {
  for (let iterationCount = 0; iterationCount < list.length; iterationCount++) {
    for (
      let passCount = 0;
      passCount < list.length - iterationCount - 1;
      passCount++
    ) {
      // This will push the greater numbers to the end (ascending)
      // and will push the smaller numbers to the end (descending)
      if (
        (ascending && list[passCount] > list[passCount + 1]) ||
        (!ascending && list[passCount] < list[passCount + 1])
      ) {
        const neighbor = list[passCount + 1];
        list[passCount + 1] = list[passCount];
        list[passCount] = neighbor;
      }
    }
  }
}
