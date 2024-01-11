import BinarySearchList from "../BinarySearchList";
import { getHalfIndex } from "../BinarySearchList";
import DataAnalysis from "../DataAnalysis";

describe("Binary Search List", () => {
  const array = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  it("Should be able to find the first element in the list", () => {
    expect(BinarySearchList(array, -10)).toBe(true);
  });

  it("Should be able to find the last element in the list", () => {
    expect(BinarySearchList(array, 10)).toBe(true);
  });

  it("Should find a number that exists in a sorted list", () => {
    expect(BinarySearchList(array, 0)).toBe(true);
  });

  it("Should not find a number that does not exist in a sorted list", () => {
    expect(BinarySearchList(array, 42)).toBe(false);
  });

  it("Should find every number in the array", () => {
    expect([...array].map((v) => BinarySearchList(array, v))).toEqual(
      Array(array.length).fill(true)
    );
  });

  it("Handles large data sets", () => {
    const count = 100_000;
    const data = DataAnalysis.getRandomLinearOrderedList(
      -100_000,
      500,
      1,
      count
    );
    const index = Math.floor(count * 0.77);
    expect(BinarySearchList(data, data[index])).toBe(true);
    expect(BinarySearchList(data, -100_001)).toBe(false);
  });

  it("Handles improper data input", () => {
    // @ts-ignore
    expect(BinarySearchList("hello", 0)).toBe(false);
    // @ts-ignore
    expect(BinarySearchList([1, 2, 3], "hello")).toBe(false);
  });

  it("Tests getHalfIndex", () => {
    expect(getHalfIndex(0, 100)).toBe(50);
  });

  describe("Tests by The Primeagen", () => {
    test("binary search array", function () {
      const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
      expect(BinarySearchList(foo, 69)).toEqual(true);
      expect(BinarySearchList(foo, 1336)).toEqual(false);
      expect(BinarySearchList(foo, 69420)).toEqual(true);
      expect(BinarySearchList(foo, 69421)).toEqual(false);
      expect(BinarySearchList(foo, 1)).toEqual(true);
      expect(BinarySearchList(foo, 0)).toEqual(false);
    });
  });
});
