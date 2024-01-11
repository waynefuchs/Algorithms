import QuickSort from "../QuickSort";
import DataAnalysis from "../DataAnalysis";

describe("QuickSort", () => {
  it("Correctly sorts one hundred random lists of one thousand random numbers", () => {
    for (let n = 0; n < 100; n++) {
      const inputArray = DataAnalysis.getRandomList(1000, -500, 1000);
      const sortedArray = [...inputArray].sort((a, b) => a - b);
      expect(QuickSort(inputArray)).toEqual(sortedArray);
    }
  });

  describe("The Primeagen", () => {
    test("quick-sort", function () {
      const arr = [9, 3, 7, 4, 69, 420, 42];

      debugger;
      QuickSort(arr);
      expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
    });
  });
});
