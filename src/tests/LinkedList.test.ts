import LinkedList from "../LinkedList";

describe("Linked List", () => {
  describe("Push and Pop", () => {
    it("Should push a single item correctly", () => {
      const ll = new LinkedList();
      const newNode = ll.push("hello");
      expect(ll.length).toBe(1);
      expect(newNode.value).toBe("hello");
      expect(ll.head?.value).toBe("hello");
    });

    it("Push should maintain correct order", () => {
      const ll = new LinkedList();
      const newNodeA = ll.push("hello");
      const newNodeB = ll.push("there");
      const newNodeC = ll.push("world");
      // Check first node
      expect(ll.head?.value).toBe("hello");
      expect(newNodeA.value).toBe("hello");
      // Check second node
      expect(newNodeA.next?.value).toBe("there");
      expect(newNodeB.value).toBe("there");
      //Check third / last node
      expect(newNodeB.next?.value).toBe(ll.tail?.value);
      expect(ll.tail?.value).toBe("world");
    });

    it("Should pop no items correctly", () => {
      const ll = new LinkedList();
      expect(ll.pop()).toBeNull();
    });

    it("Should push and pop one item correctly", () => {
      const ll = new LinkedList();
      ll.push("oops");
      expect(ll.pop()?.value).toBe("oops");
    });

    it("Should push and pop one item correctly with doubly linked lists", () => {
      const ll = new LinkedList({ doublyLinked: true });
      ll.push("push the first");
      ll.push("HMMMM");
      expect(ll.pop()?.value).toBe("HMMMM");
    });

    it("Should push and pop more than one item correctly", () => {
      const ll = new LinkedList();
      ll.push("One");
      ll.push("Two");
      ll.push("Three");

      // pop
      expect(ll.pop()?.value).toBe("Three");
      expect(ll.pop()?.value).toBe("Two");
      expect(ll.pop()?.value).toBe("One");
    });

    it("Pop should throw an error when list data is corrupt", () => {
      const ll = new LinkedList();
      ll.push("One");
      ll.push("Two");

      // Screw things up... (this is why you don't mutate class data...)
      !!ll.head && !!ll.head.next && (ll.head.next = null);
      expect(() => {
        ll.pop();
      }).toThrow(Error);
    });
  });

  describe("Get", () => {
    it("Returns the proper node for a given index", () => {
      // create a new linked list
      const ll = new LinkedList();
      // with 9 nodes
      const nodes = [
        "abc",
        "def",
        "ghi",
        "jkl",
        "mno",
        "pqr",
        "stu",
        "vwx",
        "yz",
      ].map((v) => ll.push(v));
      // check every returned data value against the linked list get(index) data value
      nodes.every((v, i) => expect(v.value).toBe(ll.get(i)?.value));
      expect(ll.length).toBe(nodes.length);
    });

    it("Get with invalid index should return null", () => {
      const ll = new LinkedList();
      expect(ll.get(-1)).toBeNull();
      expect(ll.get(1)).toBeNull();
      expect(ll.get(0)).toBeNull();
    });
  });

  describe("Shift and Unshift", () => {
    it("Prepends correctly with unshift", () => {
      const ll = new LinkedList({ doublyLinked: true });
      const nodes = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((v) => ll.unshift(v))
        .reverse();
      nodes.every((v, i) => expect(v.value).toBe(ll.get(i)?.value));
      expect(ll.length).toBe(nodes.length);
    });

    it("Shift should set prev link on head for more than one node (edge case)", () => {
      const ll = new LinkedList({ doublyLinked: true });
      ll.push("One");
      ll.push("Two");
      expect(ll.shift()?.value).toBe("One");
    });

    it("Shift should throw an error when list data is corrupt", () => {
      const ll = new LinkedList();
      ll.push("One");
      ll.push("Two");

      // Screw things up... (this is why you don't mutate class data...)
      !!ll.head && !!ll.head.next && (ll.head.next = null);
      expect(() => {
        ll.shift();
      }).toThrow(Error);
    });

    it("Should shift no items correctly", () => {
      const ll = new LinkedList();
      expect(ll.shift()).toBeNull();
    });

    it("Should unshift and shift one item correctly", () => {
      const ll = new LinkedList();
      expect(ll.unshift("Alpha").value).toBe("Alpha");
      expect(ll.length).toBe(1);
      expect(ll.shift()?.value).toBe("Alpha");
      expect(ll.length).toBe(0);
    });

    it("Should unshift and shift more than one item correctly", () => {
      const ll = new LinkedList();
      // add to front
      expect(ll.unshift("Alpha").value).toBe("Alpha");
      expect(ll.length).toBe(1);
      expect(ll.unshift("Bravo").value).toBe("Bravo");
      expect(ll.length).toBe(2);
      expect(ll.unshift("Charlie").value).toBe("Charlie");
      expect(ll.length).toBe(3);

      // remove one at a time (one pop to check ordering)
      expect(ll.shift()?.value).toBe("Charlie");
      expect(ll.length).toBe(2);
      expect(ll.pop()?.value).toBe("Alpha");
      expect(ll.length).toBe(1);
      expect(ll.shift()?.value).toBe("Bravo");
      expect(ll.length).toBe(0);
    });
  });

  describe("Insert", () => {
    it("Insert will throw an error when corrupt link data is encountered", () => {
      const ll = new LinkedList();
      ll.push("one");
      ll.push("two");
      ll.push("three");
      // break a link
      !!ll && !!ll.head && (ll.head.next = null);
      expect(() => {
        ll.insert(2, "NOPE");
      }).toThrow(Error);
    });

    it("Will insert things in the correct location", () => {
      const ll = new LinkedList();
      expect(ll.insert(-1, "fail")).toBeNull();
      expect(ll.insert(1, "fail")).toBeNull();
      expect(ll.length).toBe(0);

      // first insertion
      expect(ll.insert(0, "first")?.value).toBe("first");
      expect(ll.head?.value).toBe("first");
      expect(ll.tail?.value).toBe("first");

      // second
      expect(ll.insert(1, "last")?.value).toBe("last");
      expect(ll.head?.value).toBe("first");
      expect(ll.tail?.value).toBe("last");
      expect(ll.get(0)?.value).toBe("first");
      expect(ll.get(1)?.value).toBe("last");

      // let's put 100 insertions in the middle (reverse order)
      const arr = [...new Array(100)].map((_, i) => i);
      arr.forEach((v) => ll.insert(1, v));
      expect(ll.get(1)?.value).toBe(99);
      expect(ll.get(50)?.value).toBe(50);
      expect(ll.get(100)?.value).toBe(0);

      // Check length for funsies
      expect(ll.length).toBe(102);
    });

    it("Will insert things in the correct location with doubly linked list", () => {
      const ll = new LinkedList({ doublyLinked: true });
      expect(ll.insert(0, "zero")?.value).toBe("zero");
      expect(ll.insert(1, "two")?.value).toBe("two");
      expect(ll.insert(1, "one")?.value).toBe("one");
    });
  });

  describe("removeNode", () => {
    it("Will remove a single item", () => {
      const ll = new LinkedList({ doublyLinked: true });
      const head = ll.push("How now");
      expect(ll.removeNode(head)?.value).toBe("How now");
      expect(ll.length).toBe(0);
    });

    it("Will remove head and tail", () => {
      const ll = new LinkedList();
      const head = ll.push("How");
      ll.push("now");
      ll.push("brown");
      const tail = ll.push("cow");
      expect(ll.removeNode(head)?.value).toBe(head.value);
      expect(ll.length).toBe(3);
      expect(ll.removeNode(tail)?.value).toBe(tail.value);
      expect(ll.length).toBe(2);
    });

    it("Will remove from the middle", () => {
      const ll = new LinkedList({ doublyLinked: true });
      ll.push("How");
      const middle1 = ll.push("now");
      const middle2 = ll.push("brown");
      ll.push("cow");
      expect(ll.removeNode(middle1)?.value).toBe(middle1.value);
      expect(ll.length).toBe(3);
      expect(ll.removeNode(middle2)?.value).toBe(middle2.value);
      expect(ll.length).toBe(2);
    });

    it("Will not remove a null input", () => {
      const ll = new LinkedList();
      ll.push("testing");
      ll.push("## this will not be found ##");
      const pop = ll.pop();
      expect(ll.removeNode(pop!)).toBeNull();
    });
  });

  describe("removeIndex", () => {
    it("Will remove index 0", () => {
      const ll = new LinkedList();
      const head = ll.push("test");
      expect(ll.removeIndex(0)!.value).toBe(head.value);
      expect(ll.length).toBe(0);
    });

    it("Will remove index `length-1`", () => {
      const ll = new LinkedList();
      ll.push("test");
      const tail = ll.push("This one gets removed");
      expect(ll.length).toBe(2);
      expect(ll.removeIndex(ll.length - 1)!.value).toBe(tail.value);
      expect(ll.length).toBe(1);
    });

    it("Will not remove invalid index", () => {
      const ll = new LinkedList();
      // @ts-ignore
      expect(ll.removeIndex("howdy")).toBeNull();
      expect(ll.removeIndex(-1)).toBeNull();
      expect(ll.removeIndex(0)).toBeNull();
      expect(ll.removeIndex(1)).toBeNull();
      expect(ll.length).toBe(0);
      ll.push("Insert data");
      expect(ll.removeIndex(1)).toBeNull();
      expect(ll.length).toBe(1);
    });

    it("Will remove middle indices", () => {
      const ll = new LinkedList();
      const head = ll.push("head");
      const test1 = ll.push("test 1");
      const test2 = ll.push("test 2");
      const tail = ll.push("tail");
      expect(ll.length).toBe(4);
      expect(ll.removeIndex(1)!.value).toBe(test1.value);
      expect(ll.removeIndex(1)!.value).toBe(test2.value);
      expect(ll.removeIndex(1)!.value).toBe(tail.value);
      expect(ll.length).toBe(1);
      expect(ll.removeIndex(1)).toBeNull();
      expect(ll.removeIndex(0)!.value).toBe(head.value);
      expect(ll.length).toBe(0);
    });
  });
});
