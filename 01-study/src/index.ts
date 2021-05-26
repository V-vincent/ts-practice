function greeter(person: string) {
  return `Hello,${person}`;
}
const user = "Jane User";
// unknown
let value: unknown;

// 元组
let x: [string, number];
x = ['hello', 10]; // OK
// 元组越界
// x.push(2);
// console.log(x[2]);

// 接口（interface）
interface Say {
  (words: string): string
}
interface User {
  name: string
  age?: number
  readonly isMale: boolean
  say: Say
}
const getUserName = (user: User) => user.name

// 类
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...');
  }
}
class Cat extends Animal {
  makeSound() {
    console.log('miao miao')
  }
}
const cat = new Cat()
cat.makeSound() // miao miao
cat.move() // roaming the earch...

// 函数
const add = (a: number, b: number) => a + b
// 重载
interface Direction {
  top: number,
  bottom?: number,
  left?: number,
  right?: number
}
function assigned(all: number): Direction
function assigned(topAndBottom: number, leftAndRight: number): Direction
function assigned(top: number, right: number, bottom: number): Direction
function assigned(top: number, right: number, bottom: number, left: number): Direction

function assigned(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  }
}

assigned(1)
assigned(1, 2)
assigned(1, 2, 3)
assigned(1, 2, 3, 4)