import LinkedList from "../LinkedList";

describe("Linked List", () => {
  describe("Append", () => {
    it("Should append an item", () => {
      const ll = new LinkedList();
      const newNode = ll.append("hello");
      expect(ll.getSize()).toBe(1);
      expect(newNode.data).toBe("hello");
      expect(ll.getFirst()?.data).toBe("hello");
    });
    it("Append should maintain correct order", () => {
      const ll = new LinkedList();
      const newNodeA = ll.append("hello");
      const newNodeB = ll.append("there");
      const newNodeC = ll.append("world");
      // Check first node
      expect(ll.getFirst()?.data).toBe("hello");
      expect(newNodeA.data).toBe("hello");
      // Check second node
      expect(newNodeA.next?.data).toBe("there");
      expect(newNodeB.data).toBe("there");
      //Check third / last node
      expect(newNodeB.next?.data).toBe(ll.getLast()?.data);
      expect(ll.getLast()?.data).toBe("world");

      console.log(JSON.stringify(ll.getFirst()));
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
      ].map((v) => ll.append(v));
      // check every returned data value against the linked list get(index) data value
      nodes.every((v, i) => expect(v.data).toBe(ll.get(i)?.data));
    });
  });
});
