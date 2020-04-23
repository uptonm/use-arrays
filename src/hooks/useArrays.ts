import { useState, useCallback } from "react";

/**
 * A React hook function that allows you to utilize JavaScript
 * array functions on an element stored in React State
 * @typeParam `T` - The type of the array
 * @param initialValue The starting value of the array
 */
function useArrays<T>(initialValue?: T[]) {
  /* istanbul ignore next */
  const [arr, setArr] = useState<T[]>(initialValue || []);
  /* istanbul ignore next */
  const array = {
    /**
     * Returns the current state of the array
     */
    value: useCallback(() => arr, [arr]),
    /**
     * Returns the current length of the array
     */
    length: useCallback(() => arr.length, [arr]),
    /**
     * Returns the value of an index within the array
     * @param i - index of the array
     * @returns value at index
     */
    get: useCallback((i: number) => arr[i], [arr]),
    /**
     * Removes the element at an index from the array
     * @param i index to remove from the array
     */
    remove: useCallback(
      (i: number) =>
        setArr((arr) => [...arr.filter((_: T, _i: number) => i !== _i)]),
      [setArr]
    ),
    /**
     * Removes all instances of the element supplied from the array
     * @param e element to remove
     */
    removeElement: useCallback(
      (e: T) => setArr((arr) => [...arr.filter((n: T) => n !== e)]),
      [setArr]
    ),
    /**
     * Pushes the new element to the end of the array
     * @param e element to add
     */
    pushElement: useCallback((...e: T[]) => setArr((arr) => [...arr, ...e]), [
      setArr,
    ]),
    /**
     * Pushes the new element to the beginning of the array
     * @param ele element to add
     */
    unshiftElement: useCallback(
      (...e: T[]) => setArr((arr) => [...e, ...arr]),
      [setArr]
    ),
    /**
     * Removes an item from the end of the array
     */
    pop: useCallback(() => setArr((arr) => [...arr.slice(0, arr.length - 1)]), [
      setArr,
    ]),
    /**
     * Removes an item from the beginning of the array
     */
    shift: useCallback(() => setArr((arr) => [...arr.slice(1, arr.length)]), [
      setArr,
    ]),
    /**
     * Inserts an array of elements between the indicies of [[start]], [[start]] + [[deleteCount]]
     * @param s start index
     * @param d number of elements to delete
     * @param e array of elements to add
     */
    splice: useCallback(
      (s: number, d: number, ...e: T[]) =>
        setArr((arr) => [
          ...arr.slice(0, s),
          ...e,
          ...arr.slice(s + d, arr.length),
        ]),
      [setArr]
    ),
  };

  return array;
}

export default useArrays;
