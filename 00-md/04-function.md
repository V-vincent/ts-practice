## 函数(Function)
函数是 JavaScript 应用程序的基础，它帮助我们实现抽象层、模拟类、信息隐藏和模块。
在 TypeScript 里，虽然已经支持类、命名空间和模块，但函数仍然是主要的定义行为的地方，TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。
### 定义函数类型
在 TypeScript 中的函数并不需要刻意去定义，比如我们实现一个加法函数：
```ts
const add = (a: number, b: number) => a + b
```
实际上我们只定义了函数的两个参数类型，这个时候整个函数虽然没有被显式定义，但是实际上 TypeScript 编译器是能『感知』到这个函数的类型的。
TypeScript 已经推断出了整个函数的类型，虽然我们并没有显式定义出来，这就是所谓的『类型推断』。
那么我应该如何显式定义一个函数的类型呢？
括号里的 `(a: number, b: number)` 为参数类型，而通过 `=>` 来连接参数与返回值，最后则是返回值的类型。
### 函数的参数详解
#### 可选参数
一个函数的参数可能是不存在的，这就需要使用 `?` 可选参数来定义，只需要在参数后面加上 `?` 即代表参数可能不存在。
```ts
const add = (a: number, b?: number) => a + (b ? b : 0);
```
参数 `b` 有 `number` 与 `undefined` 两种可能。
#### 默认参数
默认参数在 JavaScript 同样存在，即在参数后赋值即可。
```ts
const add = (a: number, b = 10) => a + b
```
#### 剩余参数
剩余参数与JavaScript种的语法类似，需要用 `...` 来表示剩余参数，而剩余参数 `rest` 则是一个由 `number` 组成的数组，在这里用 `reduce` 进行了累加求和。
```ts
const add = (a: number, ...rest: number[]) => rest.reduce(((a, b) => a + b), a)
```
### 重载（Overload）
在 TypeScript 中它的作用是什么呢？
先看一下例子：
```ts
function assigned(a: number, b?: number, c?: number, d?: any) {
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
```
如果上述代码是我的同事写的，我只负责调用这个函数，那么我如果不看具体实现，只通过代码提示能搞清楚需要传几个参数吗？传不同的参数其返回值是一样的吗？
对于我而言，我只能去看这个函数的实现，来决定我如何传参，那么上述函数实现算是比较简单的，如果是个复杂函数呢？这增加了协作的成本也造成了类型的不安全。
比如上面的函数实际上只接受1、2、4个参数，但是如果我传入三个，是不会报错的，这就是类型的不安全。
为了解决上述问题，因此函数重载出现了。
我们用同样的函数名声明参数分别为1、2、4情况下：
```ts
// 重载
interface Direction {
  top: number,
  bottom?: number,
  left?: number,
  right?: number
}
function assigned(all: number): Direction
function assigned(topAndBottom: number, leftAndRight: number): Direction
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
```
最后我们分别传入不同数量的参数，发现只有三个参数的情况下报错了。
函数重载在多人协作项目或者开源库中使用非常频繁，因为一个函数可能会被大量的开发者调用，如果不使用函数重载，那么会造成额外的麻烦。