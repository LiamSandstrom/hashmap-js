import { HashSet } from "./hashset.js";
import { HashMap } from "./hashmap.js";

const test = new HashSet();

test.add("dog");
test.add("cat");
test.add("bird");
test.add("fish");
test.add("lion");
test.add("tiger");
test.add("bear");
test.add("wolf");
test.add("snake");
test.add("frog");
test.add("horse");
test.add("monkey");

test.add("monkey");
test.add("money");
console.log(test.length)
console.log(test.capacity)

// const test = new HashMap();

//  test.set('apple', 'red')
//  test.set('banana', 'yellow')
//  test.set('carrot', 'orange')
//  test.set('dog', 'brown')
//  test.set('elephant', 'gray')
//  test.set('frog', 'green')
//  test.set('grape', 'purple')
//  test.set('hat', 'black')
//  test.set('ice cream', 'white')
//  test.set('jacket', 'blue')
//  test.set('kite', 'pink')
//  test.set('lion', 'golden')

//  console.log(test.entries())
//  console.log(test.capacity())

//  test.set('loooion', 'golden')
//  console.log(test.capacity())
//  test.set('loooion', 'gg')
//  console.log(test.get("loooion"))
//  console.log(test.load())