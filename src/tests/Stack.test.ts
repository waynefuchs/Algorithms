import DataAnalysis from "../DataAnalysis";
import Stack from "../Stack";

describe("Stack", () => {
  it("Push increases stack length", () => {
    const stack = new Stack();
    expect(stack.length).toBe(0);
    stack.push("hello");
    expect(stack.length).toBe(1);
    stack.push("world");
    expect(stack.length).toBe(2);
  });

  it("Pop decreases stack length", () => {
    const stack = new Stack();
    expect(stack.length).toBe(0);
    stack.push("this");
    stack.push("is");
    stack.push("a");
    stack.push("test");
    expect(stack.length).toBe(4);
    expect(stack.pop()).toBe("test");
    expect(stack.length).toBe(3);
    expect(stack.pop()).toBe("a");
    expect(stack.length).toBe(2);
    expect(stack.pop()).toBe("is");
    expect(stack.length).toBe(1);
    expect(stack.pop()).toBe("this");
    expect(stack.length).toBe(0);
  });

  it("Peek and Pop returns the correct value", () => {
    const stack = new Stack();
    const list = DataAnalysis.getRandomList(1000, -500, 1000);
    list.forEach((v) => stack.push(v));
    list.reverse().forEach((v) => {
      expect(stack.peek()).toBe(v);
      expect(stack.pop()).toBe(v);
    });
  });

  it("Peek and Pop on empty list returns undefined", () => {
    const stack = new Stack();
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
    stack.push("test");
    stack.pop();
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
  });
});
