/**
 * Mutably sorts a list.
 * @param list A number array to be sorted
 */
export default function BubbleSortList(
  list: number[],
  ascending: boolean = true
) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (
        // This will push the greater numbers to the end (ascending)
        (ascending && list[j] > list[j + 1]) ||
        // and will push the smaller numbers to the end (descending)
        (!ascending && list[j] < list[j + 1])
      ) {
        const neighbor = list[j + 1];
        list[j + 1] = list[j];
        list[j] = neighbor;
      }
    }
  }
  return list;
}
