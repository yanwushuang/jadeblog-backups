title: JavaScript字符串间的比较
date: 2015-08-28 21:00
categories: Front-End
tags: 
- JavaScript
---

字符串在JavaScript中几乎无处不在，在你处理用户的输入数据的时候，在读取或设置DOM对象的属性时，在操作cookie时，当然还有更 多...。@雪斌在[JavaScript中的字符串操作](http://www.cnblogs.com/xuebin/articles/1296837.html)一文中讲的很详细，但是对于涉及Js字符串的比较，还是有必要再学习和探究下的。

<!-- more -->

## __字符串和其他对象比较大小__ ##

字符串和其他对象进行比较，大体要遵循下面的这些考量：

1. 两个操作数都是数值，则进行数值比较
2. 两个操作数都是字符串，则比较两个字符串对应的字符编码值
3. 两个操作数有一个是数值，则将另一个转换为数值，再进行数值比较
4. 两个操作数有一个是对象，则先调用valueOf()方法或toString()方法，再用结果比较

言不如例子，例不如图；然后，请看下面代码：
__1)纯数字之间比较__
```js
alert(1<3);//true
```

__2)数字字符串比较，会将其先转成数字__
```js
alert("1"<"3");//true
alert("123"<"123");//false
```

__3)纯字符串比较,先转成ascii码__
```js
alert("a"<"b");//true
alert("abc"<"aad");//false,多纯字母比较，会依次比较ascii码
```

__4)汉字比较__
```js
alert("我".charCodeAt());//25105
alert("的".charCodeAt());//30340
alert("我"<"的");//true,汉字比较,转成ascii码
```

__5)当数字和字符串比较，且字符串为数字。则将数字字符串转为数字__
```js
alert(123<"124");//true,下面一句代码得出124的ascii码为49，所以并不是转成ascii比较
alert("124".charCodeAt());//49
```

__6)当数字和字符串比较,且字符串为非纯数字时,则将非数字字符串转成数字的时候会转换为NaN,__当NaN和数字比较时不论大小都返回false(NaN “Not a Number”。出现这个数值比较少见，以至于我们可以不理它。当运算无法返回正确的数值时，就会返回“NaN”值。NaN 值非常特殊，因为它“不是数字”，所以任何数跟它都不相等，_甚至 NaN 本身也不等于 NaN_ 。 )
```js
alert(13>"abc");//false
```

## __判断两个字符串(/对象)是否相等__ ##
1. 如果一个操作值为布尔值，则在比较之前先将其转换为数值，false转成0，true为1；
2. 如果一个操作值为字符串，另一个操作值为数值，则通过Number()函数将字符串转换为数值
3. 如果一个操作值是对象，另一个不是，则调用对象的valueOf()方法，得到的结果按照前面的规则进行比较
4. null与undefined是相等的；avaScript的设计者希望用null表示一个空的值，而undefined表示值未定义。事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。
5. 如果一个操作值为NaN，则相等比较返回false（__NaN 本身也不等于 NaN__）唯一能判断NaN的方法是通过isNaN()函数：isNaN(NaN); // true
6. 如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true，否则，返回false
7. 在全等和不全等的判断上，只有值和类型都相等，才返回true，否则返回false；
8. 注意浮点数的相等比较：浮点数在运算过程中会产生误差；所以：1 / 3 === (1 - 2 / 3); // false。要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true

十言不如一例，请看下面的代码：
```js
var num =2==2;  //true
var num = '2'==2; //true,'2'会转成数值2
var num = false == 0; //true,false转成数值就是0
var num = false == "0"; //true,false转成数值就是0,"0"会转化成0
var num = 'a'=='A';  //false,转换后的编码不一样
var num = 2==NaN; //false,只要有NaN，都是false
var num = {}=={}; //false,比较的是他们的地址，每个新创建对象的引用地址都不同

var age = {};
var height = age;
var box = age == height;//true,引用地址一样，所以相等
```

JavaScript有两种相等运算符。一种是完全向后兼容的，标准的"=="，如果两个操作数类型不一致，它会在某些时候自动对操作数进行类型转换，考虑下面的赋值语句：

```js
var strA = "i love you!";
var strB = new String("i love you!");
```

这两个变量含有相同的字符序列，但数据类型却不同，前者为string，后者为object，在使用"=="操作符时，JavaScript会尝试各种求值，以检测两者是否会在某种情况下相等。所以下面的表达式结果为true： strA == strB。

第二种操作符是"严格"的"==="，它在求值时不会这么宽容，不会进行类型转换。所以表达式strA === strB的值为false，虽然两个变量持有的值相同。
有时代码的逻辑要求你判断两个值是否不相等，这里也有两个选择："!="和严格的"!=="，它们的关系就类似于"=="和"==="。

"=="和"!="在求值时会尽可能地寻找值的匹配性，但你可能还是想在比较前进行显式的类型转换，以"帮助"它们完成工作。比如，如果想判断一个用户的输入值（字符串）是否等于一个数字，你可以让"=="帮你完成类型转换：
>if(document.form1.txtAge.value == someNumericVar) { ... }

也可以提前转换：
>if(parseInt(document.form1.txtAge.value) == someNumericVar) { ... }

如果你比较习惯于强类型的编程语言(比如C#,Java等)，那么这里你可以延续你的习惯(类型转换)，这样也会增强程序的可读性。

有一种情况需要注意，就是计算机的区域设置。如果用"<"和">"来比较字符串，那么JavaScript把它们作为Unicode来比较， 但显然，人们在浏览网页时不会把文本当作Unicode来阅读:) 比如在西班牙语中，按照传统的排序，"ch"将作为一个字符排在"c"和"d"之间。localeCompare()提供了一种方式，可以帮助你使用默认 区域设置下的字符排序规则。
```js
var strings;  // 要排序的字符串数组，假设已经得到初始化
strings.sort(function(a,b) { return a.localeCompare(b) });  // 调用sort()方法进行排序
```

@阮一峰在[如何判断Javascript对象是否存在](http://www.ruanyifeng.com/blog/2011/05/how_to_judge_the_existence_of_a_global_object_in_javascript.html)中详细的写到如何判断Javascript是否存在；涉及10种不同的写法（据悉有超过50种写法）。值得一提的是，Javascript语言的设计，造成了写一个判断一个Javascript对象是否存在，都得小心翼翼。比如下面写法：
```js
if (!myObj) {
　　　myObj = { };
}
```
根据其他脚本语言经验，直觉上这是对的，然而运行这段代码，浏览器会直接抛出ReferenceError错误，导致运行中断。对了，if语句判断myObj是否为空时，这个变量还不存在，所以才会报错。改成下面这样，就能正确运行了。
```js
if (!myObj) {
　　var myObj = { };
}
```
究其原因，在于Javascript语言是"__先解析，后运行__"，解析时就已经完成了变量声明，所以上面的代码实际等同于：
```js
var myObj;
if (!myObj) {
　	var myObj = { };
}
```

>因为，if语句做判断时，myObj确实已经存在了，所以就不报错了。这就是var命令的"代码提升"（hoisting）作用。Javascript解释器，只"提升"var命令定义的变量，对不使用var命令、直接赋值的变量不起作用，这就是为什么不加var会报错的原因。

也就是说，程序运行到判断对象是否相等之前，必须确认二者是否都'存在'。否则就会报错：
>ReferenceError: xxx is not defined

==参考文章链接==：

[详解js运算符－segmentfault](http://segmentfault.com/a/1190000002423935 "详解js运算符") 

[js如何比较数字字符串之间大小](http://www.esnsc.com/news655.html)

[廖雪峰－javascript教程](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

[如何判断Javascript对象是否存在](http://www.ruanyifeng.com/blog/2011/05/how_to_judge_the_existence_of_a_global_object_in_javascript.html)