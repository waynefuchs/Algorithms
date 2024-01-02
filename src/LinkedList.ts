type LinkedListNodeProp = {
  data: any;
  next: LinkedListNodeProp | null;
  prev?: LinkedListNodeProp | null;
};

// - getSize
// - get(index)
// - append(item)

// - prepend(item)
// - insertAt(item, index)
// - remove(item)
// - removeAt(index)

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
    const newNode = this.#createNode(data);
    this.#insertAfter(this.#last, newNode);
    this.#size++;
    return newNode;
  }

  #insertAfter(
    node: LinkedListNodeProp | null,
    newNode: LinkedListNodeProp
  ): undefined {
    // Handle the insertion

    // Guard against node being null
    // There is one case in which null is valid, if there aren't any nodes yet in the linked list
    if (node === null) {
      if (this.#last === null && this.#first === null && this.#size === 0) {
        this.#first = newNode;
        this.#last = newNode;
        // TODO: Handle circular
        return;
      }
      throw new Error("Invalid state: can not insert a new node after 'null'");
    }

    // Handle special case if `node` is the last node in the list
    if (node.next === null) {
      if (node === this.#last) {
        node.next = newNode;
        this.#last = newNode;
        if (this.#isDoublyLinked) {
          newNode.prev = node;
        }
        // TODO: Handle circular
        return;
      }
      throw new Error("Invalid state: Next node is null but node is not #last");
    }

    // Normal insertion
    // [node] -> [newNode] -> [nextNode]
    const nextNode = node.next;
    node.next = newNode;
    newNode.next = nextNode;
    if (this.#isDoublyLinked) {
      nextNode.prev = newNode;
      newNode.prev = node;
    }
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
}
