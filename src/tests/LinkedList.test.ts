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
    // it("Append should maintain correct order", () => {
    //   const ll = new LinkedList();
    //   const newNodeA = ll.append("hello");
    //   const newNodeB = ll.append("world");
    //   console.log(ll);
    //   expect(ll.start.da);
    // });
  });
});
