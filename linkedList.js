export class LinkedList {
  #head;
  #foot;
  constructor() {
    this.#head = null;
    this.#foot = null;
  }

  append(value) {
    if (this.#head === null) return this.addEmpty(value);

    this.#foot.next = new Node(value);
    this.#foot = this.#foot.next;
    return this.#foot;
  }

  prepend(value) {
    if (this.#head === null) return this.addEmpty(value);

    const newNode = new Node(value);
    newNode.next = this.#head;
    this.#head = newNode;
    return this.#head;
  }

  size() {
    let result = 0;
    let curr = this.#head;

    while (curr != null) {
      result++;
      curr = curr.next;
    }
    return result;
  }

  at(index) {
    let i = 0;
    let curr = this.#head;

    while (i < index && curr != null) {
      curr = curr.next;
      i++;
    }
    return curr;
  }

  pop() {
    if (!this.#head) return null;
    if (!this.#head.next) return this.shift();

    let curr = this.#head;
    while (curr.next.next != null) {
      curr = curr.next;
    }

    const removed = curr.next;
    curr.next = null;
    this.#foot = curr;
    return removed;
  }

  contains(value) {
    let curr = this.#head;
    while (curr != null) {
      if (curr.value === value) return true;
      curr = curr.next;
    }
    return false;
  }

  containsKey(key) {
    let curr = this.#head;
    if (typeof curr != "object") return false;
    while (curr != null) {
      if (curr.value[0] === key) return true;
      curr = curr.next;
    }
    return false;
  }

  find(value) {
    let curr = this.#head;
    let index = 0;
    while (curr != null) {
      if (curr.value === value) return index;
      curr = curr.next;
      index++;
    }
    return null;
  }

  findKey(key) {
    let curr = this.#head;
    let index = 0;
    while (curr != null) {
      if (curr.value[0] === key) return index;
      curr = curr.next;
      index++;
    }
    return null;
  }

  toString() {
    if (!this.#head) return "Empty :(";
    let curr = this.#head;
    let string = "";

    while (curr != null) {
      string += `( ${curr.value} ) -> `;
      curr = curr.next;
    }
    string += "null";

    return string;
  }

  insertAt(value, index) {
    if (index === 0) return this.prepend(value);

    let curr = this.#head;
    let i = 0;

    while (curr != null && i < index - 1) {
      curr = curr.next;
      i++;
    }

    if (!curr) {
      console.log("Invalid index");
      return null;
    }

    const newNode = new Node(value);
    newNode.next = curr.next;
    curr.next = newNode;
    if (!newNode.next) this.#foot = newNode;
    return newNode;
  }

  removeAt(index) {
    if (index === 0) return this.shift();

    let curr = this.#head;
    let i = 0;

    while (curr.next != null && i < index - 1) {
      curr = curr.next;
      i++;
    }

    if (!curr.next) {
      console.log("Invalid index");
      return null;
    }

    const removed = curr.next;
    curr.next = curr.next.next;
    if (!curr.next) this.#foot = curr;
    return removed;
  }

  shift() {
    if (this.#head === null) return null;
    const removed = this.#head;
    this.#head = this.#head.next;
    if (this.#head === null) this.#foot = null;
    return removed;
  }

  head = () => this.#head;
  foot = () => this.#foot;

  addEmpty(value) {
    this.#head = new Node(value);
    this.#foot = this.#head;
    return this.#head;
  }

  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (current) {
          const value = current;
          current = current.next;
          return { value, done: false };
        }
        return { done: true };
      },
    };
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
