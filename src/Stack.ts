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

  pop(): T | undefined {
    if (!this.#head || !this.#tail || this.length <= 0) return undefined;
    const node = this.#head;
    this.#head = this.#head.prev;
    this.#length--;
    if (this.#length === 0) this.#head = this.#tail = undefined;
    return node.value;
  }

  peek(): T | undefined {
    if (!this.#head || !this.#tail || this.#length <= 0) return undefined;
    return this.#head.value;
  }
}
