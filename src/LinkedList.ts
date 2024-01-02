type LinkedListNodeProp = {
  data: any;
  next: LinkedListNodeProp | null;
  prev?: LinkedListNodeProp | null;
};

export default class LinkedList {
  #isDoublyLinked;
  #isCircular;
  #first: LinkedListNodeProp | null;
  #last: LinkedListNodeProp | null;
  #size: number;
  constructor(isDoublyLinked = false, isCircular = false) {
    this.#isCircular = isCircular;
    this.#isDoublyLinked = isDoublyLinked;
    this.#first = null;
    this.#last = null;
    this.#size = 0;
  }

  /**
   * Private method to create a linked list node
   * @param data Data to place in the node
   * @returns A LinkedListNode object with null links
   */
  #createNode(data): LinkedListNodeProp {
    return {
      data,
      next: null,
      ...(this.#isDoublyLinked ? { prev: null } : {}),
    };
  }

  /**
   * Get the first node in the linked list
   * @returns The first node in the linked list, null if there are no nodes in the linked list
   */
  getFirst(): LinkedListNodeProp | null {
    return this.#first;
  }

  /**
   * Get the last node in the linked list
   * @returns The last node in the linked list, null if there are no nodes in the linked list
   */
  getLast() {
    return this.#last;
  }

  /**
   * Get the number of elements in the linked list
   * @returns A number representing the number of nodes in the linked list
   */
  getSize(): number {
    return Number(this.#size);
  }

  /**
   * Create a new node containing data and place it at the end of the linked list
   * @param data Data to store in the new node
   * @returns The newly created node
   */
  append(data): LinkedListNodeProp {
    // Create the node
    const newNode = this.#createNode(data);

    if (this.#last === null || this.#size === 0 || this.#first === null) {
      // New node is the first node
      this.#first = this.#last = newNode;
    } else {
      // Let the last node to be the newly created node and set links
      const staleLast = this.#last;
      staleLast.next = newNode;
      this.#last = newNode;
    }

    // Handle circular exception
    if (this.#isCircular) {
      this.#last.next = this.#first;
      if (this.#isDoublyLinked) {
        this.#first.prev = this.#last;
      }
    }

    // Increment linked list size and return the newly created node
    this.#size++;
    return newNode;
  }

  /**
   * Iterate through the list and return the node at the supplied index
   * @param index Numerical index in linked list
   * @returns The node at the index if that index exists, otherwise null
   */
  get(index: number): LinkedListNodeProp | null {
    if (index < 0 || index > this.#size || this.#first === null) return null;
    let node: LinkedListNodeProp | null = this.#first;
    for (let x = 1; x <= index; x++) node = node?.next || null;
    return node;
  }

  // #isLastIndex(index: number) {
  //   return index === this.getLength() - 1;
  // }
  // #getNode(index: number) {
  //   const data = this.list[index];
  //   const nextLink =
  //     this.getLength() === 0
  //       ? null
  //       : this.#isLastIndex(index)
  //         ? this.isCircular
  //           ? this.getStart()
  //           : null
  //         : this.get(index + 1);
  //   const node = { data };
  //   return node;
  // }
}
