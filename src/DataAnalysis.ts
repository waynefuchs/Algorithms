export default class DataAnalysis {
  /**
   * Generate a random number between (0, max) with offset
   * O(1)
   * @param max - The maximum value in range(0,1)
   * @param offset - Add offset to result
   * @returns - Offset summed with random number between 0 and max
   */
  static getRandomInt(max: number, offset: number = 0): number {
    return Math.floor(Math.random() * max + offset);
  }

  /**
   * Generate an ordered list with random spacing, approximating linear growth.
   * O(n)
   * @param start Minimum starting value
   * @param stepVariation Random variation between steps
   * @param stepOffset Value for static offset between steps
   * @param n Amount of numbers to populate
   * @returns An ordered numerical list
   */
  static getRandomLinearOrderedList(
    start: number,
    stepVariation: number,
    stepOffset: number,
    n: number
  ): number[] {
    let tally = start;
    return [...Array(n)].map(() => {
      tally += this.getRandomInt(stepVariation, stepOffset);
      return tally;
    });
  }

  /**
   * Create a list of randomly generated numbers
   * @param max The maximum value in range 0..max
   * @param offset Offset to add to the max value
   * @param n Number of generated numbers
   * @returns A list of n randomly generated numbers
   */
  static getRandomList(max: number, offset: number, n: number): number[] {
    return [...Array(n)].map(() => this.getRandomInt(max, offset));
  }

  /**
   * Determine if a numerical list is sorted in ascending order
   * O(n)
   * @param list A list of numbers
   * @returns A boolean indicating whether the list is sorted or not
   */
  static isListOrderedAscending(list: number[]): boolean {
    if (!Array.isArray(list)) return false;
    return list.every((v, i, a) => {
      return i === 0 ? true : v > a[i - 1] && v !== undefined;
    });
  }
}
