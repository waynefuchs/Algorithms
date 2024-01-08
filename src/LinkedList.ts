type LinkedListNode = {
  value: any;
  next: LinkedListNode | null;
  prev?: LinkedListNode | null;
};

// TODO: Implement Circular (maybe..someday)
type LinkedListOptions = {
  // circular?: boolean;
  doublyLinked?: boolean;
};

export default class LinkedList {
  #isDoublyLinked;
  #isCircular;
  #head: LinkedListNode | null;
  #tail: LinkedListNode | null;
  #length: number;
  constructor(options: LinkedListOptions = {}) {
    // this.#isCircular = options?.circular ? options.circular : false;
    this.#isDoublyLinked = options?.doublyLinked ? options.doublyLinked : false;
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  /*****************************************************************************
   * Read only access to private vars
   ****************************************************************************/

  /**
   * Number of nodes in the linked list
   */
  get length(): number {
    return this.#length;
  }

  /**
   * The first node in the linked list
   */
  get head(): LinkedListNode | null {
    return this.#head;
  }

  /**
   * The last node in the linked list
   */
  get tail(): LinkedListNode | null {
    return this.#tail;
  }

  /*****************************************************************************
   * PUBLIC
   ****************************************************************************/

  /**
   * Create a new node containing data and place it at the end of the linked list
   * @param value Data to store in the new node
   * @returns The newly created node
   */
  push(value: any): LinkedListNode {
    const newNode = this.#createNode(value);
    if (!this.#head || !this.#tail) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      if (this.#isDoublyLinked) newNode.prev = this.#tail;
      this.#tail.next = newNode;
      this.#tail = newNode;
    }

    this.#length++;
    return newNode;
  }

  /**
   * Remove the last node in the linked list
   * @returns The removed node or null if node was not removed
   */
  pop(): LinkedListNode | null {
    // empty list
    if (!this.#head || !this.#tail) return null;

    // Keep a reference
    const deletedNode: LinkedListNode | null = this.#tail;

    // one node
    if (this.#length === 1) {
      this.#head = this.#tail = null;
      this.#length = 0;
      return deletedNode;
    }

    // more than one node
    const newTail = this.#getPreviousNode(deletedNode);
    if (newTail === null) throw new Error("Failed to locate new tail");
    this.#tail = newTail;
    this.#tail.next = null;
    this.#length--;
    return deletedNode;
  }

  /**
   * Create a new node containing data and place it at the beginning of the linked list
   * @param value Data to store in the new node
   * @returns The newly created node
   */
  unshift(value: any): LinkedListNode {
    const newNode = this.#createNode(value);

    // empty list
    if (this.#length === 0 || this.#head === null || this.#tail === null) {
      this.#head = this.#tail = newNode;
      this.#length = 1;
      return this.#head;
    }

    // at least one node
    newNode.next = this.#head;
    if (this.#isDoublyLinked) this.#head.prev = newNode;
    this.#head = newNode;
    this.#length++;
    return this.#head;
  }

  /**
   * Removes the first node in the linked list
   * @returns The first node in the linked list
   */
  shift(): LinkedListNode | null {
    // empty list
    if (!this.#head || !this.#tail || this.#length === 0) return null;

    // Keep a reference
    const deletedNode: LinkedListNode = this.#head;

    // one node
    if (this.#length === 1) {
      this.#head = this.#tail = null;
      this.#length = 0;
      return deletedNode;
    }

    // more than one node
    this.#head = deletedNode.next;
    deletedNode.next = null;
    if (!this.#head) {
      throw new Error("Second node in linked list should not be null");
    }
    if (this.#isDoublyLinked) {
      this.#head.prev = null;
      deletedNode.prev = null;
    }
    this.#length--;
    return deletedNode;
  }

  /**
   * Create and insert a node at a specific index
   * @param index The position to insert a new node
   * @param value The value contained in the new node
   * @returns The new node
   */
  insert(index: number, value: any): LinkedListNode | null {
    if (index < 0 || index > this.#length) return null;

    // at beginning
    if (index === 0) return this.unshift(value);

    // at end
    if (index === this.length) return this.push(value);

    // somewhere in the middle
    const newNode = this.#createNode(value);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode?.next || null;
    if (prevNode === null)
      throw new Error("Previous node was null in the middle");
    newNode.next = nextNode;
    prevNode.next = newNode;
    if (this.#isDoublyLinked) {
      newNode.prev = prevNode;
      nextNode !== null && (nextNode.prev = newNode);
    }
    this.#length++;
    return newNode;
  }

  /**
   * Iterate through the list and return the node at the supplied index
   * @param index Numerical index in linked list
   * @returns The node at the index if that index exists, otherwise null
   */
  get(index: number): LinkedListNode | null {
    if (
      index < 0 ||
      index > this.#length - 1 ||
      this.#head === null ||
      this.#tail === null
    )
      return null;

    // Iterate through list until found
    let node: LinkedListNode | null = this.#head;
    for (let x = 1; x <= index; x++) node = node?.next || null;
    return node;
  }

  /*****************************************************************************
   * PRIVATE
   ****************************************************************************/
  /**
   * Create a linked list node
   * @param value Data to place in the node
   * @returns A LinkedListNode object with null links
   */
  #createNode(value): LinkedListNode {
    return {
      value: value,
      next: null,
      ...(this.#isDoublyLinked ? { prev: null } : {}),
    };
  }

  /**
   * The the node just before the reference node
   * @param node Reference node
   * @returns The node that links to the reference node via 'next'
   */
  #getPreviousNode(node: LinkedListNode): LinkedListNode | null {
    // Doubly linked list will point back
    // @ts-ignore
    if (this.#isDoublyLinked) return node!.prev;

    // Otherwise, walk the list starting with #head
    let prevNode = this.#head;
    do {
      if (prevNode?.next === node) break;
      prevNode = prevNode?.next || null;
    } while (prevNode !== null);
    return prevNode;
  }
}
