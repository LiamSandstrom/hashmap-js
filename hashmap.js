import { LinkedList } from "./linkedList.js";

export class HashMap {
  #capacity;
  #loadFactor;
  #map = [];
  #length = 0;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashKey = this.hash(key);

    if (!this.#bucketIsEmpty(hashKey) && this.#map[hashKey].containsKey(key)) {
      const index = this.#map[hashKey].findKey(key);
      this.#map[hashKey].at(index).value[1] = value;
      return;
    }

    this.#length++;

    if (this.#shouldGrow()) {
      this.#grow(key, value);
      return;
    }

    if (this.#bucketIsEmpty(hashKey)) {
      this.#map[hashKey] = new LinkedList();
    }

    this.#map[hashKey].append([key, value]);
  }

  get(key) {
    const hashKey = this.hash(key);
    if (this.#bucketIsEmpty(hashKey)) return null;

    const index = this.#map[hashKey].findKey(key);
    if (index === null) return null;

    return this.#map[hashKey].at(index).value[1];
  }

  has(key) {
    const hashKey = this.hash(key);
    if (this.#bucketIsEmpty(hashKey)) return false;

    const index = this.#map[hashKey].findKey(key);
    if (index === null) return false;

    return true;
  }

  remove(key) {
    const hashKey = this.hash(key);
    if (this.#bucketIsEmpty(hashKey)) return false;

    const index = this.#map[hashKey].findKey(key);
    if (index === null) return false;

    this.#map[hashKey].removeAt(index);
    this.#length--;
    return true;
  }

  clear() {
    this.#map = [];
    this.#length = 0;
  }

  keys() {
    const result = [];
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#map[i];
      if (!bucket) continue;

      for (const node of bucket) {
        result.push(node.value[0]);
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#map[i];
      if (!bucket) continue;

      for (const node of bucket) {
        result.push(node.value[1]);
      }
    }
    return result;
  }

  entries() {
    const result = [];
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#map[i];
      if (!bucket) continue;

      for (const node of bucket) {
        result.push(node.value);
      }
    }
    return result;
  }

  get length() {
    return this.#length;
  }
  get capacity() {
    return this.#capacity;
  }
  get load() {
    return this.#length / this.#capacity;
  }

  #bucketIsEmpty(hashKey) {
    return !this.#map[hashKey];
  }

  #shouldGrow() {
    return this.#length / this.#capacity > this.#loadFactor;
  }

  #grow(lastKey, lastValue) {
    const cpy = this.entries();
    cpy.push([lastKey, lastValue]);

    this.clear();
    this.#capacity *= 2;

    for (const [key, value] of cpy) {
      this.set(key, value);
    }
  }
}
