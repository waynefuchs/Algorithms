import DataAnalysis from "../DataAnalysis";
import LinkedList from "../LinkedList";

describe("Linked List", () => {
  test("Pushing values increases length", () => {
    const ll = new LinkedList();
    expect(ll.length).toBe(0);
    ll.push("hello");
    expect(ll.length).toBe(1);
    ll.push("there");
    expect(ll.length).toBe(2);
    ll.push("world");
    expect(ll.length).toBe(3);
  });

  test("Popping values decreases length and values come off in the correct order", () => {
    const ll = new LinkedList();
    const values = ["one", "two", "three", "four", "five"];
    expect(ll.pop()).toBeUndefined();
    expect(ll.length).toBe(0);
    values.forEach((v, i) => {
      ll.push(v);
      expect(ll.length).toBe(i + 1);
    });
    values.reverse().forEach((v, i) => {
      expect(ll.length).toBe(values.length - i);
      expect(ll.pop()).toBe(v);
    });
  });

  test("Shifting in error behaves as expected", () => {
    const ll = new LinkedList();
    expect(ll.shift()).toBeUndefined();
  });

  test("Unshifting values and then popping them off results in correct order (FIFO)", () => {
    const ll = new LinkedList({ doublyLinked: true });
    const values = ["one", "two", "three", "four", "five"];
    values.forEach((v, i) => {
      ll.unshift(v);
      expect(ll.length).toBe(i + 1);
    });
    values.forEach((v, i) => {
      expect(ll.length).toBe(values.length - i);
      expect(ll.pop()).toBe(v);
    });
  });

  test("Pushing and then shifting values from the linked list results in correct order", () => {
    const ll = new LinkedList();
    const values = ["one", "two", "three", "four", "five"];
    values.forEach((v, i) => {
      ll.push(v);
      expect(ll.length).toBe(i + 1);
    });
    values.forEach((v, i) => {
      expect(ll.length).toBe(values.length - i);
      expect(ll.shift()).toBe(v);
    });
  });

  test("Edge case for insertAt: index, negative out of bounds", () => {
    const ll = new LinkedList({ doublyLinked: true });
    ll.insertAt("hello", -1);
    expect(ll.length).toBe(0);
  });
  test("Edge case for insertAt: index, positive out of bounds", () => {
    const ll = new LinkedList({ doublyLinked: true });
    ll.insertAt("hello", 1);
    expect(ll.length).toBe(0);
  });
  test("Edge case for insertAt: Properly aliases unshift and push", () => {
    const ll = new LinkedList({ doublyLinked: true });
    // testing insertion at postion "0" (should alias unshift)
    ll.insertAt("hello", 0);
    expect(ll.length).toBe(1);
    // testing insertion at postion "1" (should alias push)
    ll.insertAt("world", 1);
    expect(ll.length).toBe(2);
  });

  test("Ensure insertAt inserts values in the correct location", () => {
    const ll = new LinkedList({ doublyLinked: true });
    const values = ["one", "two", "three", "four", "five"];
    ll.insertAt("First", 0);
    ll.insertAt("Last", 1);
    values.forEach((v, i) => ll.insertAt(v, 1));
    expect(ll.length).toBe(7);

    // check values coming off the list
    expect(ll.shift()).toBe("First");
    expect(ll.pop()).toBe("Last");
    expect(ll.length).toBe(5);

    values.forEach((v) => expect(ll.pop()).toBe(v));
    expect(ll.length).toBe(0);
  });

  test("Edge case for remove: List has no items", () => {
    const ll = new LinkedList({ doublyLinked: true });
    expect(ll.remove("I can not exist")).toBeUndefined();
    expect(ll.length).toBe(0);
  });

  test("Removing an item that doesn't exist in the list fails as expected", () => {
    const ll = new LinkedList({ doublyLinked: true });
    ll.push("I exist");
    expect(ll.remove("But, I can not exist")).toBeUndefined();
    expect(ll.length).toBe(1);
  });

  test("Removing from the list with > two elements engages do..while safeguard", () => {
    const ll = new LinkedList({ doublyLinked: true });
    ll.push("Filler");
    ll.push("Filler");
    ll.push("Filler");
    ll.push("I exist");
    expect(ll.remove("I exist")).toBe("I exist");
    expect(ll.remove("I exist")).toBeUndefined();
    expect(ll.length).toBe(3);
  });

  test("Expect asArray to return an empty array if the linked list is empty", () => {
    const ll = new LinkedList({ doublyLinked: true });
    expect(ll.asArray()).toEqual([]);
  });

  test("Ensure removeAt exception cases work properly", () => {
    const ll = new LinkedList();
    expect(ll.removeAt(-1)).toBeUndefined(); // negative
    expect(ll.removeAt(0)).toBeUndefined(); // doesn't exist
    expect(ll.removeAt(1)).toBeUndefined(); // doesn't exist
    ll.push("test");
    expect(ll.removeAt(1)).toBeUndefined(); // doesn't exist, but equal to length
  });

  test("Ensure get returns the correct value", () => {
    const ll = new LinkedList();
    const values = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    values.forEach((v) => ll.push(v));
    expect(ll.get(-1)).toBeUndefined();
    expect(ll.get(ll.length)).toBeUndefined();
    values.forEach((v, i) => expect(ll.get(i)).toBe(v));
  });

  test("Ensure removeAt returns and removes the correct value", () => {
    const ll = new LinkedList({ doublyLinked: true });

    ll.push("First");
    expect(ll.removeAt(0)).toBe("First");

    const values = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    // forwards
    values.forEach((v) => ll.push(v));
    values.forEach((v) => expect(ll.removeAt(0)).toBe(v));
    // reverse
    values.forEach((v) => ll.push(v));
    [...values]
      .reverse()
      .forEach((v) => expect(ll.removeAt(ll.length - 1)).toBe(v));
    // from middle
    values.forEach((v) => ll.push(v));
    values.slice(2).forEach((v) => expect(ll.removeAt(2)).toBe(v));
    expect(ll.pop()).toBe("two");
    expect(ll.pop()).toBe("one");
  });

  test("Ensure asArray functions", () => {
    const ll = new LinkedList();
    const values = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    values.forEach((v) => ll.push(v));
    expect(ll.asArray()).toEqual(values);
  });

  test("Ensure remove (by value) functions", () => {
    const ll = new LinkedList();
    const values = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    values.forEach((v) => ll.push(v));
    ll.insertAt("BOOM", 1);
    expect(ll.remove("BOOM")).toBe("BOOM");
    expect(ll.length).toBe(values.length);
    values.reverse().forEach((v) => expect(ll.remove(v)).toBe(v));
    expect(ll.length).toBe(0);
  });

  test("Linked List can be cleared with removeAll", () => {
    const ll = new LinkedList();
    const count = 10_000;
    const data = DataAnalysis.getRandomList(1000, -500, count);
    data.forEach((v) => ll.push(v));
    expect(ll.length).toBe(count);
    expect(ll.removeAll()).toBe(count);
    expect(ll.length).toBe(0);
  });

  test("The Primeagen Test", () => {
    const list = new LinkedList();
    list.append(5);
    list.append(7);
    list.append(9);

    expect(list.get(2)).toEqual(9);
    expect(list.removeAt(1)).toEqual(7);
    expect(list.length).toEqual(2);

    list.append(11);
    expect(list.removeAt(1)).toEqual(9);
    expect(list.remove(9)).toEqual(undefined);
    expect(list.removeAt(0)).toEqual(5);
    expect(list.removeAt(0)).toEqual(11);
    expect(list.length).toEqual(0);

    list.prepend(5);
    list.prepend(7);
    list.prepend(9);

    expect(list.get(2)).toEqual(5);
    expect(list.get(0)).toEqual(9);
    expect(list.remove(9)).toEqual(9);
    expect(list.length).toEqual(2);
    expect(list.get(0)).toEqual(7);
  });
});
