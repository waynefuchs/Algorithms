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

  /**
   * Add a value to the queue
   * @param value Value to queue
   */
  enqueue(value: T) {
    const node = { value } as QueueNode<T>;

    // no nodes yet, set the node to head and tail
    if (!this.#head || !this.#tail || this.#length === 0) {
      this.#head = this.#tail = node;
      this.#length = 1;
      return;
    }

    // add the node at the end of the queue
    this.#tail.next = node;
    this.#tail = node;
    this.#length++;
  }

  /**
   * Remove a value from the queue
   * @returns Value from queue
   */
  dequeue(): T | undefined {
    if (!this.#head) return undefined;
    const oldHead = this.#head;
    this.#head = this.#head.next;
    this.#length--;
    if (this.#length === 0) this.#head = this.#tail = undefined;
    return oldHead.value;
  }

  /**
   * Remove the value from the front of the queue
   * @returns The value at the front of the queue
   */
  peek(): T | undefined {
    return this.#head?.value;
  }
}
