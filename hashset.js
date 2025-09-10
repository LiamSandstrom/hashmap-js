import { LinkedList } from "./linkedList.js";

export class HashSet {
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

  add(key) {
    const hashKey = this.hash(key);

    if (!this.#bucketIsEmpty(hashKey) && this.#map[hashKey].contains(key)) {
      return;
    }

    this.#length++;

    if (this.#shouldGrow()) {
      this.#grow(key);
      return;
    }

    if (this.#bucketIsEmpty(hashKey)) {
      this.#map[hashKey] = new LinkedList();
    }

    this.#map[hashKey].append(key);
  }

  has(key) {
    const hashKey = this.hash(key);
    if (this.#bucketIsEmpty(hashKey)) return false;

    const index = this.#map[hashKey].find(key);
    if (index === null) return false;

    return true;
  }

  remove(key) {
    const hashKey = this.hash(key);
    if (this.#bucketIsEmpty(hashKey)) return false;

    const index = this.#map[hashKey].find(key);
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
        result.push(node.value);
      }
    }
    return result;
  }

  values(){
    return this.keys();
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

  #grow(lastKey) {
    const cpy = this.keys();
    cpy.push(lastKey);

    this.clear();
    this.#capacity *= 2;

    for (const key of cpy) {
      this.add(key);
    }
  }
}
