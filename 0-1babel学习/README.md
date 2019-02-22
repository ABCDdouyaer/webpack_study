> 官方介绍：将 ECMAScript 2015 及其版本以后的 javascript 代码转为旧版本浏览器或者是环境中向后兼容版本的  javascript 代码。简而言之，就是把不兼容的 JavaScript 代码转为可兼容，可以执行的 JavaScript 代码

**功能**

  - 语法转换
  - 添加一些兼容性的polyfill功能
  - 源码转化

**简单配置**

```
{
  "plugins": [], //插件配置 是某一类 plugin 的集合，包含了某一类插件的所有功能。
  "presets": [] //预设配置 将某一种需要转化的代码，转为浏览器可以执行代码。
}
```

**编译顺序**

  - 执行 plugins 中所有的插件
  - plugins 的插件，按照顺序依赖编译
  - 所有 plugins 的插件执行完成，在执行 presets 预设。
  - presets 预设，按照倒序的顺序执行。(从最后一个执行)
  - 完成编译。


**插件介绍**

#### babel-preset-es2015 ( ES2015 / ES6 插件集合 )

> 将 ES2015(es6) 的 javascript 代码 转化 浏览器兼容 javascript 代码

arrow-functions: 箭头函数

block-scoped-functions: 函数命名的方式转换，改为赋值形式

block-scoping: let转var

classes: es6的类转换

computed-properties: 属性命名的转化，如：var obj = { ['x'+a]: 1 }

destructuring: 析构函数转化

duplicate-keys: 属性优化

for-of: for of 的转化

function-name: 优化函数命名

instanceof: instanceof 转化

literals: 不同类型复制优化

new-target: 继承 extends 转化

object-super: super 转化

parameters: params ，(a=1,b=2)=>{} , 默认参数转化

shorthand-properties: 对象属性转化 {a,b} => {a:a,b:b}

spread: 扩展属性转化 {...other}

sticky-regex: regex 优化，用 new Regex构建

template-literals: 字符串模版 

typeof-symbol: symbol 转化

unicode-regex: 将正则的匹配字符串转为 unicode

#### babel-preset-es2016 （ ES2016 / ES7 插件集合 ）

> 将 ES2016(es7) 的 javascript 代码 转为 浏览器兼容代码

exponentiation-operator: 幂运算转化  x **= 3 ，x的3次幂

#### babel-preset-es2017（ ES2017 / es8 插件集合 ）

> 将 ES2017(es8) 的代码进行转化　　　　

async-to-generator: 转化 async/await 转为 generator 函数

#### babel-preset-stage-x （ ES2018/stage 插件集合 ）

> 将 stage 阶段的代码转化

#### Modules(modules-amd / modules-commonjs / modules-systemjs / modules-umd)

> 将不同的 export default x  转为不同的模块形式 amd / commonjs / systemjs / umd

#### babel-preset-react ( react 集合 )

>react 的相关编译转化,jsx 和 element 的一下转化,直接添加 react 的预设就可以了。

**presets配置**

默认配置( es2015/es2016/es2017一起使用 )

```
{
  "presets": ["dev"]
}
```

配置详情

```
{
  　　"presets": [
  　　　　[
  　　　　　　'@babel/preset-env',
  　　　　　　{
  　　　　　　　　'target':{ //描述项目配置的支持、定位的环境
  　　　　　　　　　　"browser":["ie>=8","chrome>=62"],
  　　　　　　　　　　"node":"8.9.0",
  　　　　　　　　　　"safari":"tp"
  　　　　　　　　},
  　　　　　　　　"modules":false,//启用es6转换为其他模块
  　　　　　　　　"debug":true,//启用console.log
  　　　　　　　　"uglify":true,//压缩代码
  　　　　　　　　"useBuiltIns":true,//false引用所有的polyfill true根据preset-env引用部分
               "include": "",//必须启用的plugin
               "exclude": ""//不启用的plugin
  　　　　　　}
  　　　　]
  　　]
  }
```

**babel-cli:** Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

**babel-core:**  如果你需要以编程的方式来使用 Babel，可以使用 babel-core 这个包。babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。

**babel-preset-env:**  最早的```babel-preset-2016```，```babel-preset-2017```到后来的```babel-preset-latest```

**babel-preset-stage-x:** 官方预设(preset), 有两种，一个是按年份(babel-preset-2017)，一个是按阶段(babel-preset-stage-0)。 这主要是根据TC39 委员会ECMASCRPIT 发布流程来制定的。TC39 委员会决定，从2016年开始，每年都会发布一个版本，它包括每年期限内完成的所有功能，同时ECMAScript的版本号也按年份编制，就有了ES2016, ES2017。所以也就有了babel-present-2016, babel-preset-2017， 对每一年新增的语法进行转化。babel-preset-latest 就是把所有es2015, es2016, es2017 全部包含在一起了。

  - babel-preset-stage-0

  - babel-preset-stage-1

  - babel-preset-stage-2

  - babel-preset-stage-3

以上每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。也就是说这些stage包含的特性是比latest更新的特性但还未被写入标准进行发布。

**执行babel生成的代码**

Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。

为了达成使用这些新API的目的，社区又有2个实现流派：babel-polyfill和babel-runtime+babel-plugin-transform-runtime。

这两个模块功能几乎相同，就是转码新增 api，模拟 es6 环境，但实现方法完全不同。babel-polyfill 的做法是将全局对象通通污染一遍，比如想在 node 0.10 上用 Promise，调用 babel-polyfill 就会往 global 对象挂上 Promise 对象。对于普通的业务代码没有关系，但如果用在模块上就有问题了，会把模块使用者的环境污染掉。

babel-runtime 的做法是自己手动引入 helper 函数，还是上面的例子，const Promise = require('babel-runtime/core-js/promise') 就可以引入 Promise。

但 babel-runtime 也有问题，第一，很不方便，第二，在代码中中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码。所以，babel 又开发了 babel-plugin-transform-runtime，这个模块会将我们的代码重写，如将 Promise 重写成 _Promise（只是打比方），然后引入_Promise helper 函数。这样就避免了重复打包代码和手动引入模块的痛苦。

**babel-polyfill**

为了解决这个问题，我们使用一种叫做 Polyfill（代码填充，也可译作兼容性补丁） 的技术。 简单地说，polyfill即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。能让你提前使用还不可用的 APIs，Array.from 就是一个例子。
Babel 用了优秀的 core-js 用作 polyfill，并且还有定制化的 regenerator 来让 generators（生成器）和 async functions（异步函数）正常工作。

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。


要使用 Babel polyfill，首先用 npm 安装它：

> $ npm install --save babel-polyfill

然后只需要在文件顶部导入 polyfill 就可以了：

> import "babel-polyfill";

Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的definitions.js文件

**babel-runtime**

与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。只不过，babel-polyfill 是针对全局环境的，引入它，我们的浏览器就好像具备了规范里定义的完整的特性 – 虽然原生并未实现。
babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 require(‘babel-runtime/core-js/promise’) ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。

通过安装 babel-plugin-transform-runtime 和 babel-runtime 来开始。

```
$ npm install --save-dev babel-plugin-transform-runtime
$ npm install --save babel-runtime
```

然后更新 .babelrc：
```
    {
    "plugins": [
      "transform-runtime",
      "transform-es2015-classes"
    ]
  }
```


现在，Babel 会把这样的代码：

```
class Foo {
  method() {}
}

```

编译成：

```
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

let Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);

  return Foo;
}();
```

这样就不需要把 _classCallCheck 和 _createClass 这两个助手方法放进每一个需要的文件里去了。

那什么时候用 babel-polyfill 什么时候用 babel-runtime 呢？如果你不介意污染全局变量（如上面提到的业务代码），放心大胆地用 babel-polyfill ；而如果你在写模块，为了避免污染使用者的环境，没的选，只能用 babel-runtime + babel-plugin-transform-runtime。


**options**

很多预设和插件都有选项用于配置他们自身的行为。 例如，很多转换器都有“宽松”模式，通过放弃一些标准中的行为来生成更简化且性能更好的代码。

要为插件添加选项，只需要做出以下更改：

```
{
    "plugins": [
      "transform-runtime",
-     "transform-es2015-classes",
+     ["transform-es2015-classes", { "loose": true }]
    ]
}
```

plugins/presets排序:

  - 具体而言，plugins优先于presets进行编译。

  - plugins按照数组的index增序(从数组第一个到最后一个)进行编译。

  - presets按照数组的index倒序(从数组最后一个到第一个)进行编译。因为作者认为大部分会把presets写成["es2015", "stage-0"]。具体细节可以看这个。

**webpack 中定义 babel-loader**

很少有大型项目仅仅需要 babel，一般都是 babel 配合着 webpack 或 glup 等编译工具一起上的。
为了显出 babel 的能耐，我们分别配个用 babel-polyfill 和 babel-runtime 、支持 react 的webpack.config.js
先来配使用 babel-runtime 的：
首先安装：

```
npm install babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime webpack --save-dev
```

```
npm install babel-runtime --save
```

然后配置

```
module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      plugins: ['transform-runtime'],
      presets: [
        ["env", {
          "targets": {
            "chrome": 52
          },
          "modules": false,
          "loose": true
        }],
        'stage-2',
        'react'
      ],
    }
  }]
}
```

需要注意的是，babel-runtime 虽然没有出现在配置里，但仍然需要安装，因为 transform-runtime 依赖它。
再来个 babel-polyfill 的：

```
entry: [
  'babel-polyfill',
  'src/index.jsx',
],

module: {
  loaders: [{
    loader: 'babel',
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    query: {
      presets: [
        ["env", {
          "targets": {
            "chrome": 52
          },
          "modules": false,
          "loose": true
        }],
        'stage-2',
        'react',
      ],
    }
  }]
}
```

**babel-node**

babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

它不用单独安装，而是随babel-cli一起安装。然后，执行babel-node就进入PEPL环境。

```
$ babel-node
> (x => x * 2)(1)
2
```

babel-node命令可以直接运行ES6脚本。将上面的代码放入脚本文件es6.js，然后直接运行。

```
$ babel-node es6.js
2
```

babel-node也可以安装在项目中。

```
$ npm install --save-dev babel-cli
```

然后，改写package.json。

```
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

上面代码中，使用babel-node替代node，这样script.js本身就不用做任何转码处理。

**babel-register**

babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。

```
$ npm install --save-dev babel-register
```

使用时，必须首先加载babel-register。

```
require("babel-register");
require("./index.js");
```

然后，就不需要手动对index.js转码了。

需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

**babel-core**

如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

安装命令如下。

```
$ npm install babel-core --save
```

然后，在项目中就可以调用babel-core。

```
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

配置对象options，可以参看官方文档http://babeljs.io/docs/usage/options/。

下面是一个例子。

```
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

上面代码中，transform方法的第一个参数是一个字符串，表示需要转换的ES6代码，第二个参数是转换的配置对象。


**浏览器环境**

Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。


> $ npm install babel-core@old
运行上面的命令以后，就可以在当前目录的node_modules/babel-core/子目录里面，找到babel的浏览器版本browser.js（未精简）和browser.min.js（已精简）。

然后，将下面的代码插入网页。

```
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

上面代码中，browser.js是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在script标签之中，但是要注明type="text/babel"。

另一种方法是使用babel-standalone模块提供的浏览器版本，将其插入网页。

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

注意，网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

下面是如何将代码打包成浏览器可以使用的脚本，以Babel配合Browserify为例。首先，安装babelify模块。


> $ npm install --save-dev babelify babel-preset-es2015

然后，再用命令行转换ES6脚本。

```
$  browserify script.js -o bundle.js \
  -t [ babelify --presets [ es2015 react ] ]
```

上面代码将ES6脚本script.js，转为bundle.js，浏览器直接加载后者就可以了。

在package.json设置下面的代码，就不用每次命令行都输入参数了。

```
{
  "browserify": {
    "transform": [["babelify", { "presets": ["es2015"] }]]
  }
}
```

**ESLint 用于静态检查代码的语法和风格，安装命令如下**


>$ npm install --save-dev eslint babel-eslint

然后，在项目根目录下，新建一个配置文件.eslint，在其中加入parser字段。

```
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```

再在package.json之中，加入相应的scripts脚本。

```
  {
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```