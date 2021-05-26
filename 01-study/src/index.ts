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
