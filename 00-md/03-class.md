## 类(Class)
### 抽象类
抽象类做为其它派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。
`abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

比如创建一个 `Animal` 抽象类:
```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...');
  }
}
```
在实例化此抽象类会报错。
我们不能直接实例化抽象类，通常需要我们创建子类继承基类，然后可以实例化子类。
```ts
class Cat extends Animal {
  makeSound() {
    console.log('miao miao')
  }
}
const cat = new Cat()
cat.makeSound() // miao miao
cat.move() // roaming the earch...
```
### 访问限定符
传统面向对象语言通常都有访问限定符，TypeScript 中有三类访问限定符，分别是: `public`、`private`、`protected`。
#### `public`
在 TypeScript 的类中，成员都默认为 `public`， 被此限定符修饰的成员是可以被外部访问。
```ts
class Car {
  public run() {
    console.log('启动...')
  }
}
const car = new Car()
car.run() // 启动...
```
#### `private`
当成员被设置为 `private` 之后, 被此限定符修饰的成员是只可以被类的内部访问。
#### `protected`
当成员被设置为 `protected` 之后, 被此限定符修饰的成员是只可以被类的内部以及类的子类访问。
```ts
class Car {
  protected run() {
    console.log('启动...')
  }
}
class GTR extends Car {
  init() {
    this.run()
  }
}
const car = new Car()
const gtr = new GTR()
car.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
gtr.init() // 启动...
gtr.run() // [ts] 属性“run”受保护，只能在类“Car”及其子类中访问。
```

### `class` 可以作为接口
实际上类（`class`）也可以作为接口。而把 `class` 作为 `interface` 使用，在 React 工程中是很常用的。
如：
```ts
export default class Carousel extends React.Component<Props, State> {}
```
由于组件需要传入 `props` 的类型 `Props` ，同时有需要设置默认 `props` 即 `defaultProps`。
这个时候 `class` 作为接口的优势就体现出来了。
先声明一个类，这个类包含组件 `props` 所需的类型和初始值：
```ts
// props的类型
export default class Props {
  public children: Array<React.ReactElement<any>> | React.ReactElement<any> | never[] = []
  public speed: number = 500
  public height: number = 160
  public animation: string = 'easeInOutQuad'
  public isAuto: boolean = true
  public autoPlayInterval: number = 4500
  public afterChange: () => {}
  public beforeChange: () => {}
  public selesctedColor: string
  public showDots: boolean = true
}
```
当我们需要传入 `props` 类型的时候直接将 `Props` 作为接口传入，此时 `Props` 的作用就是接口，而当需要我们设置 `defaultProps` 初始值的时候，只需要:
```ts
public static defaultProps = new Props()
```
`Props` 的实例就是 `defaultProps` 的初始值，这就是 `class` 作为接口的实际应用，我们用一个 `class` 起到了接口和设置初始值两个作用，方便统一管理，减少了代码量。