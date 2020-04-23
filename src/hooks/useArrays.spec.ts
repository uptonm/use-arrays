import "jest";
import init from "jooks";
import useArrays from "./useArrays";

describe("Testing useArrays hook", () => {
  // Initialize the jooks wrapper
  const initialArr: string[] = ["a", "b", "c"];
  const jooks = init(() => useArrays<string>(initialArr));

  it("It should give the correct initial values and length", () => {
    const arr = jooks.run();

    expect(arr.length()).toBe(initialArr.length);
    expect(arr.value()).toBe(initialArr);
    initialArr.forEach((_: string, index: number) => {
      expect(arr.get(index)).toBe(initialArr[index]);
    });
  });

  it("Should properly `remove`, removing the element at `index` from the array", () => {
    const arr = jooks.run();

    arr.remove(2);
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.value()).toBe(initialArr.filter((n) => n !== "c"));
    }, 1);
  });

  it("Should properly `removeElement`, removing all instances of it from the array", () => {
    const arr = jooks.run();

    arr.removeElement("c");
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.value()).toBe(initialArr.filter((n) => n !== "c"));
    }, 1);
  });

  it("It should properly perform `pushElement`, adding to end of array", () => {
    const arr = jooks.run();

    arr.pushElement("d");
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(arr.length() - 1)).toBe("d");
    }, 1);

    arr.pushElement("e", "f");
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(arr.length() - 1)).toBe("f");
      expect(arr.get(arr.length() - 2)).toBe("e");
      expect(arr.value()).toBe([...initialArr, "d", "e", "f"]);
    }, 1);
  });

  it("Should properly `unshift`, adding it to the beginning of the array", () => {
    const arr = jooks.run();

    arr.unshiftElement("d");
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(0)).toBe("d");
    }, 1);

    arr.unshiftElement("e", "f");
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(0)).toBe("e");
      expect(arr.get(1)).toBe("f");
      expect(arr.value()).toBe(["f", "e", "d", ...initialArr]);
    }, 1);
  });

  it("Should properly `pop`, removing the element at the end of the array", () => {
    const arr = jooks.run();

    arr.pop();
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(1)).toBe("b");
    }, 1);

    arr.pop();
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(0)).toBe("a");
      expect(arr.value()).toBe(
        initialArr.filter((n) => n !== "b" && n !== "c")
      );
    }, 1);
  });

  it("Should properly `shift`, removing the element at the beginning of the array", () => {
    const arr = jooks.run();

    arr.shift();
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(0)).toBe("b");
    }, 1);

    arr.shift();
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(0)).toBe("c");
      expect(arr.value()).toBe(
        initialArr.filter((n) => n !== "a" && n !== "b")
      );
    }, 1);
  });

  it("Should properly `splice`, inserting an array of elements between an index, deleting x elements", () => {
    const arr = jooks.run();

    arr.splice(arr.length(), 0, ...["d", "e", "f"]);
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(3)).toBe("d");
      expect(arr.get(4)).toBe("e");
      expect(arr.get(5)).toBe("f");
      expect(arr.value()).toBe([...initialArr, ...["d", "e", "f"]]);
    }, 1);

    arr.splice(arr.length() - 3, 3, ...["d", "e", "f"]);
    setTimeout(() => {
      // useState is async, so we need to wait a ms or so before checking
      expect(arr.get(3)).toBe("d");
      expect(arr.get(4)).toBe("e");
      expect(arr.get(5)).toBe("f");
      expect(arr.value()).toBe([...initialArr, ...["d", "e", "f"]]);
    }, 1);
  });
});
