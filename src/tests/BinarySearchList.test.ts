import BinarySearchList from "../BinarySearchList";

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
});
