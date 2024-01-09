type StackNode<T> = {
  value: T;
  prev: StackNode<T>;
};

export default class Stack<T> {
  #head: StackNode<T> | undefined;
  #tail: StackNode<T> | undefined;
  #length: number;

  // (tail)A <-- B <-- C <-- D(head)
  constructor() {
    this.#head = this.#tail = undefined;
    this.#length = 0;
  }

  get length(): number {
    return this.#length;
  }

  /**
   * Add a value to the top of the stack
   * @param value Value to add to the top of the stack
   */
  push(value: T) {
    const node = { value } as StackNode<T>;

    if (!this.#head || !this.#tail || this.length === 0) {
      this.#head = this.#tail = node;
      this.#length = 1;
      return;
    }

    node.prev = this.#head;
    this.#head = node;
    this.#length++;
  }

  /**
   * Remove value from top of stack
   * @returns Value from top of stack
   */
  pop(): T | undefined {
    // Error check
    if (!this.#head || !this.#tail || this.length <= 0) return undefined;

    // Remove the node and decrement length
    const popNode = this.#head as StackNode<T>;
    this.#head = this.#head.prev;
    this.#length = Math.max(0, this.#length - 1);

    // if length has reached 0, set head and tail to default state
    if (this.#length === 0) this.#head = this.#tail = undefined;

    // Return the value
    return popNode.value;
  }

  /**
   * Look at top of stack without mutating stack
   * @returns Value from top of stack
   */
  peek(): T | undefined {
    if (!this.#head || !this.#tail || this.#length <= 0) return undefined;
    return this.#head.value;
  }
}
