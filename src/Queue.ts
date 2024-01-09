type QueueNode<T> = {
  value: T;
  next?: QueueNode<T>;
};

export default class Queue<T> {
  #head?: QueueNode<T>;
  #tail?: QueueNode<T>;
  #length: number;

  constructor() {
    this.#head = this.#tail = undefined;
    this.#length = 0;
  }

  get length(): number {
    return this.#length;
  }

  enqueue(value: T) {
    const node = { value } as QueueNode<T>;

    // no nodes yet
    if (!this.#tail || !this.#head) {
      this.#head = this.#tail = node;
      this.#length = 1;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
    this.#length++;
  }

  dequeue(): T | undefined {
    if (!this.#head) return undefined;
    const oldHead = this.#head;
    this.#head = this.#head.next;
    this.#length--;
    return oldHead.value;
  }

  peek(): T | undefined {
    return this.#head?.value;
  }
}
