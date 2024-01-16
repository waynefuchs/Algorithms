// LinkedList.ts
/**
 * This is a generic implementation of the `Linked List` data structure.
 *
 * @author Wayne Fuchs
 * @version 2024.01JAN.16
 * @module LinkedList
 */

/**
 * Using a Key/Value pair forces option visibility at time of list creation
 * @param doublyLinked boolean to define whether a linked list is doubly linked or not
 */
type LinkedListOptions = {
  doublyLinked?: boolean;
};

/**
 * @internal This type is only useful in the LinkedList class
 * @param value the value of the node
 * @param next link to the next node, not present if no link exists
 * @param prev link to the previous node, not present if no link exits
 */
type LinkedListNode<T> = {
  value: T;
  next?: LinkedListNode<T>;
  prev?: LinkedListNode<T>;
};

/**
 * @internal This type is only useful in the LinkedList class
 * @remarks This type is used for node insertion and removal
 * @param nodeA The node directly before nodeB
 * @param nodeB The node directly after nodeA
 */
type LinkedListNodePair<T> = {
  nodeA?: LinkedListNode<T>;
  nodeB?: LinkedListNode<T>;
};

export default class LinkedList<T> {
  #head?: LinkedListNode<T>;
  #tail?: LinkedListNode<T>;
  #doublyLinked: boolean;
  #length: number;

  constructor(options: LinkedListOptions = {}) {
    this.#head = this.#tail = undefined;
    this.#length = 0;
    this.#doublyLinked = options?.doublyLinked ? true : false;
  }

  /* Getters and setters ******************************************************/

  get length(): number {
    return this.#length;
  }

  /* Private ******************************************************************/

  /**
   * @private
   * Get the edge nodes around a removed
   * @param index insertion index
   * @returns node at index-1
   */
  #getNodePairAt(index: number): LinkedListNodePair<T> {
    if (index === 0) return { nodeB: this.#head };
    // locate previous node
    let nodePrev = this.#head;
    for (let x = 1; x < index; x++) nodePrev = nodePrev?.next;
    // validate located node
    // and the next node
    return { nodeA: nodePrev, nodeB: nodePrev?.next } as LinkedListNodePair<T>;
  }

  /**
   * @private
   * Remove nodeB from the list, using a node pair
   * @param nodePair nodeA -> nodeB(target) -> [nodeC]
   * @returns The value of the removed node (nodeB.value)
   */
  #removeUsingNodePair(nodePair) {
    // Keep reference for the "next" node
    const nodeC = nodePair.nodeB?.next;
    // A.next -> C
    if (nodePair.nodeA) nodePair.nodeA.next = nodeC;
    // A <- C.prev
    if (this.#doublyLinked && nodeC) nodeC.prev = nodePair.nodeA;
    // housekeeping
    this.#length--;
    return nodePair.nodeB.value;
  }

  /* Public *******************************************************************/

  /**
   * Create an array holding the contents of the linked list
   * @remarks This can be a somewhat performance heavy operation
   * @returns The Linked List as an array
   */
  asArray(): T[] {
    const arr = new Array<T>();
    let node = this.#head;
    do {
      if (!node) break;
      arr.push(node.value);
      node = node?.next;
    } while (node);
    return arr;
  }

  /**
   * View the value at a specified index
   * @param index Index
   * @returns Value at specified index
   */
  getAt(index: number): T | undefined {
    if (index >= this.#length || index < 0) return;
    const { nodeB: node } = this.#getNodePairAt(index);
    return node?.value;
  }

  /**
   * Add value to list at specified index
   * @param value Value to add
   * @param index Position to place value
   */
  insertAt(value: T, index: number) {
    if (index > this.length || index < 0) return;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);

    const node = { value } as LinkedListNode<T>;
    const { nodeA: nodePrev, nodeB: nodeNext } = this.#getNodePairAt(index);
    this.#length++;

    // Always: forward links
    if (nodePrev) nodePrev.next = node;
    node.next = nodeNext;

    // Sometimes: back links only if this is a doubly linked list
    if (this.#doublyLinked) {
      if (nodeNext) nodeNext.prev = node;
      node.prev = nodePrev;
    }
  }

  /**
   * Remove and return the value from the tail of the linked list
   * @returns Value at the end of the linked list
   */
  pop(): T | undefined {
    // pop with nothing in the list (undefined)
    if (this.#length === 0 || !this.#head || !this.#tail) return;

    const node = this.#tail;
    if (this.#length === 1) this.removeAll();
    else {
      let newTail: LinkedListNode<T> | undefined = this.#head;
      if (this.#doublyLinked) newTail = this.#tail.prev;
      else {
        for (let x = 1; x < this.#length - 1 && !!newTail; x++)
          newTail = newTail?.next;
      }
      if (newTail) delete newTail.next;
      this.#tail = newTail;
      this.#length--;
    }
    return node.value;
  }

  /**
   * Add a value to the end of this linked list
   * @param value Value to add
   */
  push(value: T) {
    const node = { value } as LinkedListNode<T>;

    if (this.#length === 0 || !this.#tail || !this.#head) {
      this.#head = this.#tail = node;
      this.#length = 1;
      return;
    }

    if (this.#doublyLinked) node.prev = this.#tail;
    this.#tail.next = node;
    this.#tail = node;
    this.#length++;
  }

  /**
   * Search for a value and remove the first instance of it from the linked list
   * @param value Value to search for
   * @returns The value removed or undefined
   */
  remove(value: T): T | undefined {
    if (!this.#head || !this.#tail || this.#length === 0) return;
    if (this.#head.value === value) return this.shift();
    if (this.#tail.value === value) return this.pop();

    let nodeA = this.#head;
    let nodeB = nodeA.next;
    let isFound = false;
    do {
      if (!nodeB) return;
      if (nodeB.value === value) {
        isFound = true;
        break;
      }
      nodeA = nodeB;
      nodeB = nodeB.next;
    } while (nodeB && nodeA);
    if (!isFound) return;

    return this.#removeUsingNodePair({ nodeA, nodeB } as LinkedListNodePair<T>);
  }

  /**
   * Remove all nodes in the Linked List
   * @returns Number of nodes that were unlinked
   */
  removeAll(): number {
    // In case any nodes are held elsewhere in memory
    let node = this.#head;
    let unlinkCount = 0;
    do {
      const currentNode = node;
      node = node?.next;
      delete currentNode?.prev;
      delete currentNode?.next;
      unlinkCount++;
    } while (node);

    // housekeeping, and GC will do the rest
    this.#head = this.#tail = undefined;
    this.#length = 0;

    return unlinkCount;
  }

  /**
   * Remove the node at specified index
   * @param index removal index
   * @returns value removed
   */
  removeAt(index: number): T | undefined {
    if (index >= this.#length || index < 0) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    return this.#removeUsingNodePair(this.#getNodePairAt(index));
  }

  /**
   * Remove and return the value from the head of the linked list
   * @returns Value from the front of the linked list
   */
  shift(): T | undefined {
    if (this.#length === 0 || !this.#head || !this.#tail) return;

    const node = this.#head;
    if (this.length === 1) this.removeAll();
    else {
      this.#head = this.#head.next;
      delete this.#head?.prev; // can do this, even if not doubly linked
      this.#length--;
    }
    return node.value;
  }

  /**
   * Add a value to the front of this linked list
   * @param value Value to add
   */
  unshift(value: T) {
    const node = { value } as LinkedListNode<T>;

    // push and unshift are identical on 0-length linked list
    if (this.#length === 0 || !this.#head || !this.#tail)
      return this.push(value);

    node.next = this.#head;
    if (this.#doublyLinked) this.#head.prev = node;
    this.#head = node;
    this.#length++;
  }

  /* Alias ********************************************************************/

  /**
   * Alias for push (to support ThePrimeagen tests)
   * @deprecated
   */
  append(value: T) {
    this.push(value);
  }

  /**
   * Alias for getAt (to support ThePrimeagen tests)
   * @deprecated
   */
  get(index: number): T | undefined {
    return this.getAt(index);
  }

  /**
   * Alias for unshift (to support ThePrimeagen tests)
   * @deprecated
   */
  prepend(value: T) {
    this.unshift(value);
  }
}
