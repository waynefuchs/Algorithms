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

  describe("Is List Ordered Ascending", () => {
    it("Should correctly identify that a list is ordered ascending", () => {
      const data = [1, 2, 3, 4, 5];
      expect(DataAnalysis.isListOrderedAscending(data)).toBe(true);
    });

    it("Should detect when numbers are not in order", () => {
      const data = [1, 2, 3, 5, 4];
      expect(DataAnalysis.isListOrderedAscending(data)).toBe(false);
    });
  });
});
