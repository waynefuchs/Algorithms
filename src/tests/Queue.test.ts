import Queue from "../Queue";

describe("Queue", () => {
  type Person = {
    name: string;
    age: number;
  };

  it("Enqueue and Dequeue work", () => {
    const q = new Queue();
    expect(q.dequeue()).toBeUndefined();
    expect(q.length).toBe(0);
    q.enqueue("Hello");
    expect(q.length).toBe(1);
    q.enqueue("World");
    expect(q.length).toBe(2);
    expect(q.dequeue()).toBe("Hello");
    expect(q.length).toBe(1);
    expect(q.dequeue()).toBe("World");
    expect(q.length).toBe(0);
    expect(q.dequeue()).toBeUndefined();
    expect(q.length).toBe(0);
  });

  it("Peek functions", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue("hello");
    q.enqueue({ name: "John Doe", age: 12 } as Person);
    expect(q.length).toBe(3);
    expect(q.peek()).toBe(1);
    expect(q.peek()).toBe(1);
    expect(q.length).toBe(3);

    q.dequeue();
    q.dequeue();
    expect((q.peek() as Person)?.age).toBe(12);
  });

  describe("Tests by The Primeagen", () => {
    test("queue", function () {
      const list = new Queue<number>();

      list.enqueue(5);
      list.enqueue(7);
      list.enqueue(9);

      expect(list.dequeue()).toEqual(5);
      expect(list.length).toEqual(2);

      list.enqueue(11);
      expect(list.dequeue()).toEqual(7);
      expect(list.dequeue()).toEqual(9);
      expect(list.peek()).toEqual(11);
      expect(list.dequeue()).toEqual(11);
      expect(list.dequeue()).toEqual(undefined);
      expect(list.length).toEqual(0);

      // just wanted to make sure that I could not blow up myself when i remove
      // everything
      list.enqueue(69);
      expect(list.peek()).toEqual(69);
      expect(list.length).toEqual(1);
    });
  });
});
