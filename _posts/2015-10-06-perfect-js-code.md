title: 精妙JS代码段搜集
date: 2015-10-06 17:00:00
categories: Front-End
tags:
- jQuery
- JavaScript
toc: true
iscopy: false
---

现在到处都是JavaScript，倘若花点时间去体察，每次都能知道点新的东西。一旦你入了门，你总能从这里或是那里领悟到很多知识。一旦发现些许有意思的东西，总习惯先收藏起来。待到时技(时间＋技术)成熟，再去感觉他们的源代码，看一看它们是怎么办到的，览一览大牛们的“奇技淫巧”。这里便是关于所遇精妙JS代码的收藏室，愿随时间的渐行渐远，这里收集的日渐丰盈，技术也能“层林尽染”。

<!-- more -->

## __CSS布局调试代码片段__
在浏览器控制台运行此段代码(当然也只能在控制台运用)，会给页面里所有的 DOM 元素添加一个 1px 的描边（outline），方便我们在调试 CSS 过程中分析、排查问题。当然这样的工具使用Chrome一些插件也易办到，但直接撸起如此代码，能够领悟到很多知识。
```js
[].forEach.call($$("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
})
```

![](http://www.jeffjade.com/img/css/console-css-outline.png)

### __代码分析：__
这段代码是 Github 上的 140 bytes 活动中的代码，简单分析下这段 JS 代码，作者使用了不少技巧：

首先是需要选择页面上的所有元素，这里使用了只能在console调试工具中使用的$$函数，你可以在console中输入$$('a')自己试一下。它会返回当前页面的所有anchor（链接）元素。`$$`与`document.querySelectorAll`是等价的，有兴趣可查看[$$和$选择器的历史](http://ourjs.com/detail/54ab768a5695544119000007)。

其次遍历所有元素，这里用的是`[].forEach.call(...)`，使用 `forEach` 替代 for 之类循环能减少不少代码量，而 forEach 是 Array 对象的方法，所以用了个 [] 空数组来代替Array.prototype,更显简洁;得到所有元素的节点列表（NodeList），但是它并没有实现Array的所有接口，因此使用 $$('*').forEach 会返回错误，这里使用`call`方法来更改forEach内部this环境，当然也可以使用`apply`。

之后就是让元素有一个漂亮的边框，并拥有不同的颜色了。这行代码使用了CSS的outline属性。在CSS渲染的盒子模型（Box Model）中，__outline并不会改变元素及其布局的位置__。这里较有意思的是：定义不同的颜色的色值：
```js
~~(Math.random()*(1<<24))).toString(16)
```
这里想构造的其实是一个16进制的颜色值，即000000～ffffff;也就是parseInt('0',16)到parseInt('ffffff',16)之间的一个值；而
```js
parseInt('ffffff',16) == 16777215 == (2^24-1) == (1<<24 - 1)
```
Math.random(),得到的是一个0～1之间的浮点数；(Math.random()*(1<<24)，即得到0～16777215之间的浮点数，而色值是需要整数的，所以就需要将浮点数进行int转换。这里用到了`~~`,可参见[理解JS按为非运算符(~/~~ )](http://www.jeffjade.com/2015/05/31/2015-05-31-javascript-operational－symbol/)。当然可以将~~视为parseInt的简写。并且使用按位或 "|"操作符也可以得到相同的结果：

```js
var a = 1.234567890;
var b = 0.000000001;
~~a == 0|a == parseInt(a, 10) == 1
~~b == 0|b == parseInt(b, 10) == 0
```

`toString(16)`使用数字类型的toString方法进行十进制到16进制的转换。至此我们得到了一个 0 到 16777215之间的随机数，然后使用toString(16)转换成16进制，将此值赋予到页面上所有元素节点的outline附加属性上，就有了如图效果，它就是这样工作的。精致巧妙而实用非常，顶一个。

参考文章[从一行CSS调试代码中学到的JavaScript知识](http://ourjs.com/detail/54be0a98232227083e000012)
