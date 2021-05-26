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

### 枚举类型
枚举类型是很多语言都拥有的类型，它用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型。
#### 数字枚举
当声明一个枚举类型时，虽然没有给它们赋值，但是它们的值其实是默认的数字类型，而且默认从 `0` 开始依次累加：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```
因此当我们把第一个值赋值后，后面也会根据第一个值进行累加：
```ts
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right); // 10 11 12 13
```

#### 字符串枚举
枚举类型的值也可以是字符串类型：
```ts
enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

console.log(Direction['Right'], Direction.Up); // Right Up
```
#### 异构枚举
已经有了字符串枚举和数字枚举，那么这两个枚举是不是可以混合使用呢？
```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```
是的，这样也是没问题的，通常情况下很少会这样使用枚举，但是从技术的角度来说，它是可行的。
#### 反向映射
看一个例子：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```
可以通过枚举名字获取枚举值，那么能不能通过枚举值获取枚举名字呢？
是可以的：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction[0]); // Up
```
印象中一个 JavaScript 对象一般都是正向映射的，即 `name => value`，为什么在枚举中是可以正反向同时映射的？即 `name <=> value`。接下来了解枚举的本质就可以解答该疑问了
#### 枚举的本质
以上面的 `Direction` 枚举类型为例，来看看枚举类型被编译为 JavaScript 后是什么样子:
```js
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 10] = "Up";
  Direction[Direction["Down"] = 11] = "Down";
  Direction[Direction["Left"] = 12] = "Left";
  Direction[Direction["Right"] = 13] = "Right";
})(Direction || (Direction = {}));
```
编译后的代码可能看起来比较复杂，不过我们可以把 `Direction` 看成一个对象，比如我们在 TypeScript 中做几个小实验:
```ts
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
}

console.log(Direction[10], Direction['Right']); // Up 13
```
原因就在编译后的 JavaScript 中体现出来了，因为 `Direction[Direction["Up"] = 10] = "Up"` 也就是 `Direction[10] = "Up"` ，所以我们可以把枚举类型看成一个JavaScript对象，而由于其特殊的构造，导致其拥有正反向同时映射的特性。

#### 常量枚举
枚举其实可以被 `const` 声明为常量的，这样有什么好处？看以下例子:
```ts
const enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

const a = Direction.Up;
```
编译为 JavaScript 后是这样的：
```js
var a = "Up";
```
在上面看到枚举类型会被编译为 JavaScript 对象，怎么这里没有了?

这就是常量枚举的作用，因为下面的变量 `a` 已经使用过了枚举类型，之后就没有用了，也没有必要存在与 JavaScript 中了， TypeScript 在这一步就把 `Direction` 去掉了，直接使用 `Direction` 的值即可，这是性能提升的一个方案。
如果非要 TypeScript 保留对象 `Direction`，那么可以添加编译选项 `--preserveConstEnums`。

#### 联合枚举与枚举成员的类型
假设枚举的所有成员都是字面量类型的值，那么枚举的每个成员和枚举值本身都可以作为类型来使用。
- 任何字符串字面量，如：
```ts
const enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
```
- 任何数字字面量，如：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
``` 
- 应用了一元 `-` 符号的数字字面量，如:
```ts
enum Direction {
  Up = -1,
  Down = -2,
  Left = -3,
  Right = -4,
}
```
#### 枚举成员类型
当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义，即枚举成员成为了类型。
比如声明一个数字类型：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
const a = 0;
console.log(a === Direction.Up); // true
```
把成员当做值使用，看来是没问题的，因为成员值本身就是 `0`，那么再加几行代码：
```ts
type c = 0
declare let b: c
b = 1 // 不能将类型“1”分配给类型“0”
b = Direction.Up // ok
```
可以看到，上面的结果显示这个枚举的成员居然也可以被当做类型使用，这就是枚举成员当做类型使用的情况。

#### 联合枚举类型
由于联合联合枚举，类型系统可以知道枚举里的值的集合。
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

declare let a: Direction

enum Animal {
  Dog,
  Cat
}

a = Direction.Up // ok
a = Animal.Dog // 不能将类型“Animal.Dog”分配给类型“Direction”
```
把 `a` 声明为 `Direction` 类型，可以看成我们声明了一个联合类型 `Direction.Up | Direction.Down | Direction.Left | Direction.Right`，只有这四个类型其中的成员才符合要求。
#### 枚举合并
可以分开声明枚举，它们会自动合并
```ts
enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

enum Direction {
  Center = 1
}
```
编译为 JavaScript 后的代码如下：
```js
var Direction;
(function (Direction) {
  Direction["Up"] = "Up";
  Direction["Down"] = "Down";
  Direction["Left"] = "Left";
  Direction["Right"] = "Right";
})(Direction || (Direction = {}));
(function (Direction) {
  Direction[Direction["Center"] = 1] = "Center";
})(Direction || (Direction = {}));
```
#### 为枚举添加静态方法
借助 `namespace` 命名空间，可以给枚举添加静态方法。举个简单的例子，假设有十二个月份：
```ts
enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
```
现在编写一个静态方法，这个方法可以帮助我们把夏天的月份找出来：
```ts
function isSummer(month: Month) {
  switch (month) {
    case Month.June:
    case Month.July:
    case Month.August:
      return true;
    default:
      return false
  }
}
```
想要把两者结合就需要借助命名空间的力量了：
```ts
namespace Month {
  export function isSummer(month: Month) {
    switch (month) {
      case Month.June:
      case Month.July:
      case Month.August:
        return true;
      default:
        return false
    }
  }
}

console.log(Month.isSummer(Month.January)) // false
```