type LinkedListNodeProp = {
  data: any;
  next: LinkedListNodeProp | null;
  prev?: LinkedListNodeProp | null;
};

export default class LinkedList {
  isDoublyLinked;
  isCircular;
  first: LinkedListNodeProp | null;
  last: LinkedListNodeProp | null;
  size: number;
  constructor(isDoublyLinked = false, isCircular = false) {
    this.isCircular = isCircular;
    this.isDoublyLinked = isDoublyLinked;
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  #createNode(data): LinkedListNodeProp {
    return {
      data,
      next: null,
      ...(this.isDoublyLinked ? { prev: null } : {}),
    };
  }

  getFirst() {
    return this.first;
  }
  // getEnd() {
  //   return this.list.length <= 0 ? null : this.list[this.list.length - 1];
  // }
  getSize(): number {
    return this.size;
  }
  append(data): LinkedListNodeProp {
    const newNode = this.#createNode(data);
    if (this.last === null) {
      this.first = this.last = newNode;
    } else {
      this.last.next = newNode;
    }
    this.size++;
    return newNode;
  }
  // get(index: number) {
  //   return index < this.getLength() ? this.list[index] : null;
  // }
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
