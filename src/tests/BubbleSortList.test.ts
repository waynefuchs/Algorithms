import BubbleSortList from "../BubbleSortList";
import DataAnalysis from "../DataAnalysis";

describe("Bubble Sort List", () => {
  it("Should properly sort a list in ascending order", () => {
    const list = [5, 4, 3, 2, 1];
    const newList = BubbleSortList(list);
    expect(list).toEqual([1, 2, 3, 4, 5]);
    expect(newList).toEqual([1, 2, 3, 4, 5]);
  });
  it("Should sort a list in descending order", () => {
    const list = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const newList = BubbleSortList(list, false);
    expect(list).toEqual([5, 5, 4, 4, 3, 3, 2, 2, 1, 1]);
    expect(newList).toEqual([5, 5, 4, 4, 3, 3, 2, 2, 1, 1]);
  });
  it("Sorts random lists of moderate size", () => {
    const randomList = DataAnalysis.getRandomList(500, -250, 10_000);
    const builtinSortedList = [...randomList].sort((a, b) => a - b);
    const bubbleSortedList = BubbleSortList(randomList);
    expect(bubbleSortedList).toEqual(builtinSortedList);
    expect(bubbleSortedList).toEqual(randomList);
  });

  describe("Tests by The Primeagen", () => {
    test("bubble-sort", function () {
      const arr = [9, 3, 7, 4, 69, 420, 42];

      debugger;
      BubbleSortList(arr);
      expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
    });
  });
});
