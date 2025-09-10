# HashMap & HashSet

This repository contains **custom implementations** of `HashMap` and `HashSet` in JavaScript using **separate chaining with linked lists** for collision handling. Both classes support **dynamic resizing** when the load factor is exceeded.

## Features

### HashMap

* Stores key-value pairs (strings only).
* Methods:

  * `set(key, value)` — Add or update a key-value pair.
  * `get(key)` — Retrieve the value for a key.
  * `has(key)` — Check if a key exists.
  * `remove(key)` — Remove a key-value pair.
  * `clear()` — Clear the map.
  * `keys()`, `values()`, `entries()` — Iteration helpers.
* Automatic resizing when the load factor exceeds the threshold.

### HashSet

* Stores unique string values.
* Methods:

  * `add(key)` — Add a value if not already present.
  * `has(key)` — Check if a value exists.
  * `remove(key)` — Remove a value.
  * `clear()` — Clear the set.
  * `keys()` — Retrieve all values.
* Automatic resizing when the load factor exceeds the threshold.

## Example Usage

```javascript
import { HashMap } from './hashMap.js';
import { HashSet } from './hashSet.js';

// HashMap
const map = new HashMap();
map.set('apple', 1);
map.set('banana', 2);
console.log(map.get('apple')); // 1
console.log(map.has('banana')); // true
map.remove('apple');


// HashSet
const set = new HashSet();
set.add('apple');
set.add('banana');
console.log(set.has('apple')); // true
set.remove('banana');
console.log(set.keys()); // ['apple']
```
