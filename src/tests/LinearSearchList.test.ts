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

  it("Should gracefully fail on empty arrays", () => {
    expect(LinearSearchList([], 5)).toBe(false);
  });

  it("Should gracefully fail on non-array types", () => {
    //@ts-ignore
    expect(LinearSearchList("hi there", "hi")).toBe(false);
  });

  it("Should gracefully fail if needle is not a number", () => {
    //@ts-ignore
    expect(LinearSearchList([1, 2, 3], "hello"));
  });

  describe("Tests by The Primeagen", () => {
    test("linear search array", function () {
      const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
      expect(LinearSearchList(foo, 69)).toEqual(true);
      expect(LinearSearchList(foo, 1336)).toEqual(false);
      expect(LinearSearchList(foo, 69420)).toEqual(true);
      expect(LinearSearchList(foo, 69421)).toEqual(false);
      expect(LinearSearchList(foo, 1)).toEqual(true);
      expect(LinearSearchList(foo, 0)).toEqual(false);
    });
  });
});
