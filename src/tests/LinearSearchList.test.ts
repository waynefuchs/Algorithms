import LinearSearchList from "../LinearSearchList";

describe("Linear Search List", () => {
  const array = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  it("Should return true when number exists in haystack", () => {
    expect(LinearSearchList(array, 10)).toBe(true);
  });

  it("Should return false when number does not exist in haystack", () => {
    expect(LinearSearchList(array, 11)).toBe(false);
  });

  it("Should successfully locate every number in supplied array", () => {
    expect(array.map((v) => LinearSearchList(array, v))).toEqual(
      Array(array.length).fill(true)
    );
  });
});
