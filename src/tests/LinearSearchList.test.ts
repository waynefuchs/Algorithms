import { describe, expect, test } from "@jest/globals";
import linearSearchList from "../LinearSearchList";

describe("Linear Search List", () => {
  const array = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  it("Should return true when number exists in haystack", () => {
    expect(linearSearchList(array, 10)).toBe(true);
  });

  it("Should return false when number does not exist in haystack", () => {
    expect(linearSearchList(array, 11)).toBe(false);
  });

  it("Should return false when given incorrect data type for needle", () => {
    expect(linearSearchList(array, "hello")).toBe(false);
  });
  it("Should return false when given incorrect data type for haystack", () => {
    expect(linearSearchList("hello", 11)).toBe(false);
  });
  it("Should return false when given incorrect data type for needle and needle", () => {
    expect(linearSearchList(7, "three")).toBe(false);
  });
  it("Should return false when given null as haystack", () => {
    expect(linearSearchList(null, 0)).toBe(false);
  });
});
