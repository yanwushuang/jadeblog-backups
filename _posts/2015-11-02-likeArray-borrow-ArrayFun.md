title: 类数组借用数组方法
date: 2015-11-02 12:00:00
categories: Front-End
tags: JavaScript
toc: true
iscopy: false
---

于JavaScript如何将对象转化为数组对象，其用法写法已经很常见且完善，比如JQuery中的`makeArray`函数对此的实现，也是跟大家想的差不多，只是考虑的周全些罢了,[看源码](#3)；但对于`类数组借用数组方法`的写法，对其学习探究过程中大长了些许姿势，觉其倒是一个挺有趣问题。

<!-- more -->

## **何为“类数组”**
JavaScript中有一些看起来像却又不是数组的对象，唤作: **类数组**。一个类数组对象：

* 具有：指向对象元素的数字(非负整数)索引下标以及length属性告诉我们对象的元素个数
* 不具有：诸如 push forEach 以及 indexOf 等数组对象具有的方法

javascript中常见的类数组有arguments对象,DOM方法或者JQuery方法的返回结果。
比如`document.getElementsByTagName()`。实际上，只要有length属性，且它的属性值为number类型即可。

**类数组示例：**
```js
var a = {'1':'gg','2':'love','4':'jeffjade',length:5};
Array.prototype.join.call(a,'+');//'+gg+love++jeffjade'
```

**非类数组示例：**
```js
var c = {'1':2};
```
没有length属性，所以就不是类数组。

## **借用数组方法**
### **法一**：用数组什么方法，借助call或者apply即可，比如；
```js
(function(){
    Array.prototype.push.call(arguments, 4);
    console.log(arguments instanceof Array);  // false
    console.log(arguments);
    //OutPut: [1,2,3,4]  //Chrome Console
    //OutPut: / { '0': 1, '1': 2, '2': 3, '3': 4 } //SublimeText NodeJs
})(1,2,3);
```

### **法二：**函数反柯里化(function uncurrying)
`Array.prototype`上的方法原本只能用来操作array对象。但用`call` `apply` 可以把任意对象当做this传入某个方法，如此一来，方法中用到的this的地方就不再局限于原来规定的对象，而是加以泛华并且得到更广的适用性。

但是直接使用这样使用，多少是有些繁琐的。如需使用Array的shift方法，就还得写Like This：`Array.prototype.shift.call(arguments);`;如能将泛化this的过程提取出来，岂不方便很多？并且代码还能复用。

**uncurrying**的话题来自JavaScript之父Brendan Eich在2011年发表的一篇Twitter。
以下代码是uncurrying的实现方式之一**@[注解^](#1)**：
```js
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
```
其作用如是：在类数组对象借用`Array.prototype`方法之前，先把Array.prototype.push.call这句代码转换为一个通用的`push`函数：
```js
var push = Array.prototype.push.uncurrying();
(function(){
	push(arguments , 4);
	console.log(arguments);
	//OutPut: [1,2,3,4]  //Chrome Console
    //OutPut: / { '0': 1, '1': 2, '2': 3, '3': 4 } //SublimeText NodeJs
})(1,2,3);
```
通过`uncurrying`方式，使得Array.prototype.push.call变成了一个通用的push函数，且其函数的作用也不再仅仅局限于只能操作array对象。于使用者而言，也显得更加简洁和意图明了。

幸甚，还可以一次性地将Array.prototype上的方法“复制”到array对象上。
```js
var ary = ['push', 'shift', 'forEach']
for (var i = 0, fn ; fn = ary[i++];) {
	Array[ fn ] = Array.prototype[ fn ].uncurrying();
};

var obj = {
	"length": 2,
	"0":1,
	"1":2
};

Array.push(obj, 3); // 3
console.log(obj.length);
console.log(obj); //Object {0: 1, 1: 2, 2: 3, length: 3}

var first = Array.shift(obj);
console.log(first);  // 1
console.log(obj);    //Object {0: 2, 1: 3, length: 2}

Array.forEach(obj , function(i , n){
	console.log(i);  // 分别输出 2 3
	console.log(n);  // 分别输出 0 1
})
```

当然，`function uncurrying`还有其他实现方式**@[注解^](#2)**，比如：
```js
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        // var obj = Array.prototype.shift.call(arguments);
        // return self.apply(obj, arguments);
        return Function.prototype.call.apply(self, arguments);
    }
}
```

#### **代码稍做分析**
就取Array.prototype.push.uncurrying()这句代码来分析下，`uncurrying`的时候发生了什么：
```js
Function.prototype.uncurrying = function() {
    var self = this; // self此时是Array.prototype.push
    return function() {
        // var obj = Array.prototype.shift.call(arguments);
        // return self.apply(obj, arguments);
        return Function.prototype.call.apply(self, arguments); //法2
    }
}

var push = Array.prototype.push.uncurrying();
var obj = {
    "length":1,
    "0":1
}
push(obj , 2); //uncurrying函数接收到的arguments即'obj ,2'
console.log(obj); //Outpt: {0:1, 1:2,length:2}
```
<h4 id="1">function uncurrying 法一：</h4>

用法一，因为`Array.prototype.shift`的截断，arguments,即剩下[2]了；相当于如下代码
```js
var obj = Array.prototype.shift.call(arguments);
return Array.prototype.push.apply(obj, arguments);//此时arguments=2；
```

<h4 id="2">function uncurrying 法二：</h4>

实现方式二，很有趣;可参见@[stackoverflow透彻回答](http://stackoverflow.com/questions/13004342/call-and-apply-in-javascript)；
```js
return Function.prototype.call.apply(self, arguments);
//self此时是Array.prototype.push
```
大体如此：`Function.prototype.call`是一个函数；`call`的this指向`Function.prototype`;使用`apply`改变了this的指向到`Array.prototype.push`;`arguments` 就被给传了call。原文如下：

>1. `Function.prototype.call` is a function.
2. The `this` pointer of `call` points to `Function.prototype`.
3. We use `apply` to change the `this` pointer of `call` to `Array.prototype.push`.
4. `arguments` is applied (not passed as a parameter) to call.
>>The advantage of this is that we're creating a **[fast unbound wrapper](http://stackoverflow.com/questions/7459769/whats-the-purpose-of-using-function-call-apply-in-javascript)** for `push` in a single line.

继续看该Answer，其文提到了[bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind);而`bind`~绑定函数，会以创建它是传入bind()方法的第一个参数作为`this`，传入bind()方法的第二个及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

按照bind的功能，其实在这里bind就可以替代apply， 从而可以有这种写法了咯;而这个bind"听起来"怎么那么像`call`呢？后面那个方法不过就是改变下前面`call`的this的指向，所以`apply`替换`call`也没什么不可以的嘛，测试一下：果然可以！
```js
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        // return Function.prototype.call.apply(self, arguments);
        return Function.prototype.call.bind(self, arguments);
        // return Function.prototype.call.call(self, arguments);
    }
}
```

只是，这样用的话就得为考虑浏览器的兼容性而写些Shim了.如原回答所述：
>A better way to create fast unbound wrappers is as follows (note that it may not work in some older browsers, but you don't really need to worry about that now - you may always use a ***shim*** for browsers which don't support **bind**):


---
@JQuery的v2.1.4版本对makeArray方法实现源码：
```js
// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}
		return ret;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;
		return first;
	}
```
其中`isArraylike()`代码实现可以参见[这里](http://www.jeffjade.com/2015/09/06/2015-09-06-ios8-safari-jitbug-record/)。

**参考出处**：@曾探 所著的《JavaScript设计模式与开发实践》第三章~高阶函数.
