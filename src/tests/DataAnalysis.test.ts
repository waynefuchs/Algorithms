import DataAnalysis from "../DataAnalysis";

describe("Data Analysis", () => {
  describe("Get Random Int", () => {
    it("Should generate numbers within correct range", () => {
      const count = 5000;
      const testArray = [...Array(count)].map(() =>
        DataAnalysis.getRandomInt(10)
      );
      expect(testArray.map((v) => v <= 10 && v >= 0)).toEqual(
        Array(count).fill(true)
      );
    });
  });

  describe("Get Random Linear Ordered List", () => {
    it("Should generate an ordered list", () => {
      const data = DataAnalysis.getRandomLinearOrderedList(-500, 10, 10, 1000);
      expect(DataAnalysis.isListOrderedAscending(data)).toBe(true);
    });

    it("Should generate the correct number of items", () => {
      const n = 3000;
      const data = DataAnalysis.getRandomLinearOrderedList(-1000, 3, 3, n);
      expect(data.length).toBe(n);
    });
  });

  describe("Get Random List", () => {
    it("Should generate a list with the correct number of items", () => {
      expect(DataAnalysis.getRandomList(100, 0, 5000).length).toBe(5000);
    });
    it("Should only contain numbers", () => {
      expect(
        DataAnalysis.getRandomList(100, 0, 100).every(
          (v) => typeof v === "number"
        )
      ).toBe(true);
    });
    it("Mean for large data sets should be close to midpoint of range", () => {
      const n = 100_000;
      const data = DataAnalysis.getRandomList(100, 0, n);
      const mean = data.reduce((p, v) => p + v, 0) / data.length;
      expect(mean * 0.1).toBeCloseTo(5, 0);
    });
  });

  describe("Is List Ordered Ascending", () => {
    it("Should correctly identify that a list is ordered ascending", () => {
      const data = [1, 2, 3, 4, 5];
      expect(DataAnalysis.isListOrderedAscending(data)).toBe(true);
    });

    it("Should detect when numbers are not in order", () => {
      const data = [1, 2, 3, 5, 4];
      expect(DataAnalysis.isListOrderedAscending(data)).toBe(false);
    });

    it("Should return false instead of error on ts override", () => {
      //@ts-ignore
      expect(DataAnalysis.isListOrderedAscending([1, "hi", 3])).toBe(false);
      //@ts-ignore
      expect(DataAnalysis.isListOrderedAscending("hello")).toBe(false);
    });
  });
});
