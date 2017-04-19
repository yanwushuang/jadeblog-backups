title: 理解JS按为非运算符(~/~~ )
date: 2015-05-31 21:00
categories: Front-End
tags: JavaScript
---

按位运算符是把操作数看作一系列单独的位，而不是一个数字值。所以在这之前，不得不提到什么是“位”:数值或字符在内存内都是被存储为0和1的序列，每个0和1被称之为1个位,比如说10进制数据2在计算机内被存储为 0 0 0 0 0 0 1 0，当我们将内存内的位值改变之后，这个值代表的意义也就变了，比如把2前移动一位，现在存储单元里面变成了0 0 0 0 0 1 0 0,这个值表示的是十进制的4,这也就是按位操作符的运算原理。

<!-- more -->

按位运算符有6个`& 按位与`, `|按位或`, `^按位异或`, `~取反`, `>>右移`, `<<左移`;

下面就谈谈这按位非运算符(`~`)，简单的理解就是改变运算数的符号并减去1，当然，这是只是简单的理解能转换成number类型的数据;比如 ~9 == -10 ; ~~ 9==9;

那么，对于typeof var!==”number”的类型来说，进行运算时，会尝试转化成32位整形数据，如果无法转换成整形数据，就转换为NaN;

JS在位运算上用了更简便的一种方法来实现这中运算，那么它的实现原理大致上可以这样理解：
``` javascript
var testData=-2.9;
var testResult=(typeof testData==="number"&&!isNaN(testData)&&testData!==Infinity)?(testData>0)?-Math.floor(testData)-1:-Math.ceil(testData)-1:-1;
```

首先，如果一个数据在尝试转换为32整形数据时，结果小于 0,那么就需要对其上舍入，比如-2.9 -> -2,如果大于 0，对其下舍入，比如：2.6 -> 2;

一个数据如果不能转换为32位二进制表示，就转换为NaN；继而转为-1；比如~{}/~NaN ==-1;
又比如~function(){return 100;}->-1;

在Jquery里面，有用到比如 **if(!~this.className.indexOf(str)){//do some thing…..};** 这里，对于this.className.indexOf(str)的返回值，要么大于-1，要么就是等于-1；在其等于-1的时候，~-1===0；然后，!~-1===true;那么就可以得出this不包含str这个class名…；

对于 `~~` 运算符，同理，它也可以表示为：
``` javascript
var testData=2.1;
var testResult=(typeof testData==="number"&&!isNaN(testData)&&testData!==Infinity)?(testData>0)?Math.floor(testData):Math.ceil(testData):0;
```

`～～` 之运用：比如可以很方便的得到一个数的整形近似值：

``` javascript
rand = function(a,b){
    return ~~((Math.random()*(b-a+1)) + a);
}
```
