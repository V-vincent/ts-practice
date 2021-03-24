### 开始使用TypeScript
#### 安装 TypeScript
通过npm直接在全局安装 TypeScript
```
npm install -g typescript
```
#### 创建环境
创建一个目录：`ts-study`
接着创建 `src` 目录：`src/index.ts`
用npm将目录初始化：
```
npm init
```
初始化typescript:
```
tsc --init
```
这个时候目录会多一个tsconfig.json文件：
这是 `TypeScript` 的配置文件，里面已经包含官方初始化的一些配置以及注释，现在进行自定义的配置：
```
{
  "compilerOptions": {
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES5'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "moduleResolution": "node", // 选择模块解析策略
    "experimentalDecorators": true, // 启用实验性的ES装饰器
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    "sourceMap": true, // 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "alwaysStrict": true, // 以严格模式检查模块，并在每个文件里加入 'use strict'
    "declaration": true, // 生成相应的.d.ts文件
    "removeComments": true, // 删除编译后的所有的注释
    "noImplicitReturns": true, // 不是函数的所有返回路径都有返回值时报错
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "lib": [
      "es6",
      "dom"
    ], // 指定要包含在编译中的库文件
    "typeRoots": [
      "node_modules/@types"
    ],
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [ // 需要编译的ts文件一个*表示文件匹配**表示忽略文件的深度问题
    "./src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
  ]
}
```
然后在package.json中加入script命令：
```
{
  "name": "01-study",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "build:w": "tsc -w"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "^4.2.3"
  }
}
```

#### 编写第一个 TypeScript 程序
在`src/index.ts`中输入以下代码:
```ts
function greeter(person) {
    return "Hello, " + person
}
const user = "Jane User"
```
这个时候会看到一个警告,这个警告在官方默认配置中是不会出现的,正是由于我们开启了 noImplicitAny 选项,对于隐式含有 any 类型的参数或者变量进行警告⚠️.
之所以一开始就开启严格模式，是因为一旦开始放任any类型的泛滥，就会把 TypeScript 变成 AnyScript ，会很难改掉这个恶习，所以从一开始就要用规范的 TypeScript 编码习惯。
需要进行如下修改
```ts
function greeter(person: string) {
  return `Hello,${person}`;
}
const user = "Jane User"
```
这时可以看到，greeter函数自动加上了返回值类型，这是 TypeScript 自带的类型推导。