import LinkedList from "../LinkedList";

describe("Linked List", () => {
  describe("Push", () => {
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

    it("Prepends correctly with unshift", () => {
      const ll = new LinkedList({ doublyLinked: true });
      const nodes = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((v) => ll.unshift(v))
        .reverse();
      nodes.every((v, i) => expect(v.value).toBe(ll.get(i)?.value));
      expect(ll.length).toBe(nodes.length);
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
    });
  });
});
