## TypeScript的数据类型
### 原始类型
`TypeScript`的原始类型包括: `boolean`、`number`、`string`、`undefined`、`null`、`symbol`、`void`、`bigint`。

#### 布尔类型
用 `boolean` 来表示布尔类型，注意开头是**小写**的，如果在`Typescript`文件中写成 `Boolean` 那代表是 `JavaScript` 中的布尔对象。
```ts
const isLoading: boolean = false
```
```!
很多 TypeScript 的原始类型比如 boolean、number、string等等，在JavaScript中都有类似的关键字 Boolean、Number、String，后者是 JavaScript 的构造函数，比如我们用 Number 用于数字类型转化或者构造 Number 对象用的，而 TypeScript 中的 number 类型仅仅是表示类型，两者完全不同。
```
#### 数字
`JavaScript`中的二进制、十进制、十六进制等数都可以用 `number` 类型表示。
```ts
const decLiteral: number = 6
const hexLiteral: number = 0xf00d
const binaryLiteral: number = 0b1010
const octalLiteral: number = 0o744
```
#### 字符串
```ts
const study: string = 'Typescript'
```
#### 空值
表示没有任何类型，当一个函数没有返回值时，通常会见到其返回值类型是 `void`：
```ts
function warnUser(): void {
  alert("This is my warning message");
}
```
实际上只有`null`和`undefined`可以赋给`void`:
```ts
const v: void = undefined
```
#### Null 和 Undefined
`TypeScript` 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`，和`void`相似，它们的本身的类型用处不是很大：
```ts
let a: undefined = undefined;
let b: null = null;
```
默认情况下 `null` 和 `undefined` 是所有类型的子类型，就是说可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

但是在正式项目中一般都是开启 `--strictNullChecks` 检测的，即 `null` 和 `undefined` 只能赋值给 `any` 和它们各自(一个例外是 `undefined` 是也可以分配给`void`)，可以规避非常多的问题。
#### Symbol
注意：在使用 `Symbol` 的时候，必须添加 `es6` 的编译辅助库
`Symbol` 是在ES6之后成为新的原始类型，它通过 `Symbol` 构造函数创建:
```ts
const sym1 = Symbol('key1');
const sym2 = Symbol('key2');
```
#### BigInt
`BigInt` 类型在 `TypeScript3.2` 版本被内置，使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了`JavaScript`构造函数 `Number` 能够表示的安全整数范围。

注意：我们在使用 `BigInt` 的时候，必须添加 `ESNext` 的编译辅助库

在 `JavaScript` 中采用双精度浮点数，这导致精度有限，比如 `Number.MAX_SAFE_INTEGER` 给出了可以安全递增的最大可能整数，即`2**53-1`，来看一下案例:
```js
const max = Number.MAX_SAFE_INTEGER;
const max1 = max + 1
const max2 = max + 2
max1 === max2 // true
```
`max1`与`max2`居然相等？这就是超过精读范围造成的问题，而`BigInt`正是解决这类问题而生的:
```js
// 注意，这里是 JavaScript 代码，并不是 typescript
const max = BigInt(Number.MAX_SAFE_INTEGER);
const max1 = max + 1n
const max2 = max + 2n
max1 === max2 // false
```
值得注意的是我们需要用 `BigInt(number)` 把 `Number` 转化为 `BigInt`，同时如果类型是 `BigInt` ，那么数字后面需要加 `n` ，就如同上面例子的 `const max1 = max + 1n` 中的 `1n`。

在`TypeScript`中，`number` 类型虽然和 `BigInt` 都是有表示数字的意思，但是实际上两者类型是不同的:
```ts
declare let foo: number;
declare let bar: bigint;

foo = bar; // error: Type 'bigint' is not assignable to type 'number'.
bar = foo; // error: Type 'number' is not assignable to type 'bigint'.
```

### 其它常见类型
计算机类型系统理论中的顶级类型：`any`、`unknown`；
类型系统中的底部类型：`never`；
非原始类型（non-primitive type）：`object`；
还有比较常见的数组、元祖等

#### any
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。

这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。

这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用`any`类型来标记这些变量：
```ts
let notSure: any = 4;
notSure = "maybe a string instead";
```
`any`类型是多人协作项目的大忌，很可能把`Typescript`变成`AnyScript`，通常在不得已的情况下，不应该首先考虑使用此类型。
#### unknown
`unknown` 是 `TypeScript 3.0` 引入了新类型，是 `any` 类型对应的安全类型。

`unknown` 和 `any` 的主要区别是 `unknown` 类型会更加严格：在对`unknown`类型的值执行大多数操作之前,我们必须进行某种形式的检查，而在对 `any` 类型的值执行操作之前，我们不必进行任何检查。

先看一下他跟 `any` 的共同点，它跟 `any` 一样，可以是任何类型:
```ts
let value: any;

value = true;             // OK
value = 1;                // OK
value = "Hello World";    // OK
value = Symbol("type");   // OK
value = {}                // OK
value = []                // OK
```
如果换成 `unknown`，结果一样：
```ts
let value: unknown;

value = true;             // OK
value = 1;                // OK
value = "Hello World";    // OK
value = Symbol("type");   // OK
value = {}                // OK
value = []                // OK
```
来看看它们的区别：
```ts
let value: any;

value.foo.bar;  // OK
value();        // OK
new value();    // OK
value[0][1];    // OK
```
如果是 `unknown` 类型，那么结果大不相同：
```ts
let value: unknown;

value.foo.bar;  // ERROR
value();        // ERROR
new value();    // ERROR
value[0][1];    // ERROR
```
就是 `unknown` 与 `any` 的不同之处，虽然它们都可以是任何类型，但是当 `unknown` 类型被确定是某个类型之前，它不能被进行任何操作比如实例化、`getter`、函数执行等等。

而 `any` 是可以的，这也是为什么说 `unknown` 是更安全的 `any`， `any` 由于过于灵活的设定，导致它与 `JavaScript` 没有太多区别,很容易产生低级错误，很多场景下可以选择 `unknown` 作为更好的替代品。

#### never
`never` 类型表示的是那些永不存在的值的类型，`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给 `never` 类型（除了`never`本身之外）。即使`any`也不可以赋值给`never`。
两个场景中 `never` 比较常见:
```ts
// 抛出异常的函数永远不会有返回值
function error(message: string): never {
  throw new Error(message);
}
// 空数组，而且永远是空的
const empty: never[] = []
```
#### 数组
数组有两种类型定义方式，一种是使用泛型:
```ts
const list: Array<number> = [1, 2, 3]
```
另一种使用更加广泛那就是在元素类型后面接上 `[]`:
```ts
const list: number[] = [1, 2, 3]
```
#### 元组（Tuple）
元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。

比如，可以定义一对值分别为`string`和`number`类型的元组：
```ts
let x: [string, number];
x = ['hello', 10, false] // Error
x = ['hello'] // Error
```
可以看到，这就是元组与数组的不同之处，元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。

如果类型完全一致，只是顺序错了有没有问题，比如上个例子中我们把 `string`、`number` 调换位置：
```ts
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```
可以看到，元组非常严格，即使类型的顺序不一样也会报错。

元组中包含的元素，必须与声明的类型一致，而且不能多、不能少，甚至顺序不能不符。

可以把元组看成严格版的数组，比如`[string, number]`可以看成是：
```ts
interface Tuple extends Array<string | number> {
  0: string;
  1: number;
  length: 2;
}
```
元组继承于数组，但是比数组拥有更严格的类型检查。

此外，还有一个元组越界问题，比如 `Typescript` 允许向元组中使用数组的`push`方法插入新元素:
```ts
const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok
console.log(tuple); // ["a", 1, 2] -> 正常打印出来
```
但是当访问新加入的元素时，会报错：
```ts
console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```

#### Object
`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。
```ts
enum Direction {
    Center = 1
}
let value: object
value = Direction
value = [1]
value = [1, 'hello']
value = {}
```
可以看到，普通对象、枚举、数组、元组通通都是 `object` 类型。