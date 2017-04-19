title: JavaScript对象length
date: 2015-10-08 17:30:00
categories: Front-End
tags:
- JavaScript
toc: true
iscopy: false
---

前几日有在[Javascript数组操作](http://www.jeffjade.com/2015/09/25/2015-09-25-js-array/#)一文中稍提及了数组的length属性；深入一点探究，就发现JS这length确有许多难为所知的特性。这就边学边探究下这朵奇葩属性;这里边深入边记载。

<!-- more -->

## 可变的数组length属性
和其他大多数语言不同的是，JavaScript数组的length属性是可变的，这一点需要特别注意。当length属性被设置得更大时，整个数组的状态事实上不会发生变化，仅仅是length属性变大；当length属性被设置得比原来小时，则原先数组中索引大于或等于length的元素的值全部被丢失。下面是演示改变length属性的例子：

```js
var arr=[12,23,5,3,25,98,76,54,56,76];
console.log(arr.length);  // 10

arr.length=5; //将数组的长度减少到5，索引等于或超过5的元素被丢弃
alert(arr[8]); //显示第9个元素已经变为"undefined"

arr.length=10; //将数组长度恢复为10
alert(arr[8]); //虽然长度被恢复为10，但第9个元素却无法收回，显示"undefined"

arr[15] = 34;
console.log(arr.length);  //16

console.log(arr[10]);     //undefine
console.log(arr.toString())
//12,23,5,3,25,98,76,54,56,76,,,,,,34
```

length对象不仅可以显式的设置，它也有可能被隐式修改。JavaScript中可以使用一个未声明过的变量，同样，也可以使用一个未定义的数组元素（指索引超过或等于length的元素），这时，length属性的值将被设置为所使用元素索引的值加1。例如下面的代码：

```js
var arr=[12,23,5,3,25,98,76,54,56,76];
console.log(arr.length);  // 10

arr[15] = 34;
console.log(arr.length);  //16

console.log(arr[10]);     //undefine
console.log(arr.toString())
//12,23,5,3,25,98,76,54,56,76,,,,,,34
```

## JS对象的length
在JS中来判断一个对象是否为数组，是需要费点周折的。但以是否具有length属性来衡量之，显然是不合理的。length数组不是独有的，JS对象也是可以用的(当然，数组也是对象的一种～数组对象)。譬如：
```js
var obj = {'1':'gg', '2':'love', '4':'meimei', length:5};
console.log(obj.length); // 5
```
_JavaScript中有一些看起来像却又不是数组的对象，唤作_: __类数组__。一个类数组对象：
* 具有：指向对象元素的数字索引下标以及`length`属性告诉我们对象的元素个数
* 不具有：诸如 `push`  `forEach` 以及 `indexOf` 等数组对象具有的方法

两个典型的类数组的例子是：DOM方法 `document.getElementsByClassName()`的返回结果（实际上许多DOM方法的返回值都是类数组）以及特殊变量 arguments [1]。例如你可以通过以下方法确定函数参数的个数：`arguments.length`
你也可以获取单个参数值，例如 `arguments[0]`。
如果这些对象想使用数组的方法，就必须要用某种方式“借用”。这里的“借用”可以借助JS的call，apply方法来实现。有时候处理类数组对象的最好方法是将其转化为数组。 这项工作也可以使用通用方法来完成：
```js
var obj = {'1':'gg','2':'love','4':'meimei',length:5};
Array.prototype.join.call(obj , '+'); //'+gg+love++meimei'
```

### 类数组判断
聊起JS对象的length就有必要说下这个__类数组判断__。之前有在[IOS 8 Safari JIT bug影响jQuery和underscore](http://www.jeffjade.com/2015/09/06/2015-09-06-ios8-safari-jitbug-record/)记录使用Underscore在IOS机器引起的问题。而对于此问题，jQuery，Underscore方面修复的办法就是改变了_类数组判断_的判断方式：
```js
//underscore 1.7.0 _.each部分代码
var i, length = obj.length;
if (length === +length) {
    ......
}
```

对比与underscore1.8.3 _.each部分代码(是采用isArrayLike来判断的)：
```js
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

var property = function(key){
  return function(obj){
    return obj == null ? void 0 : obj[key];
  }
}
```

对于数组是有下标的，其下标的范围是”大于等于0并小于2^32-1的整数”，如果数字太大的话你想难为JavaScript是做不到的。因为其会自动将其转化为”字符串”。而underscore1.8.3用的MaxLength是`Math.pow(2, 53) - 1`（其值:9007199254740992）,不解😄，待探究下～

而《javascript权威指南》上给出的代码用来判断一个对象是否属于“类数组”。其code如下：
```js
function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === 'object' &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967296)              // o.length < 2^32
        return true;                        // Then o is array-like
    else
        return false;                       // Otherwise it is not
}
```

##数组的存储
在JavaScript中数组元素存储是稀疏的，这也就意味着数组的下标不会落在一个连续的数字范围由，只有那些真正存储在数组中的元素才能够分配到内存，其余均不会浪费你宝贵的内存空间。比如如下代码：
```js
var arr = new Array();   //声明一个空数组
arr[0] = 'jeff';
arr[1000] = 'jade';
console.log(arr.length); //1001 嗯。从0到1000
console.log(arr[999]);   //undefined 没有定义
```

在JavaScript中数组元素本身，可以是各种类型Null，function，string，object对象等都可以。这一点毋庸置疑；但前两日在学习数组`reduce`方法的时候，竟然被涨了姿势了，代码走起：
```js
var arr = ["apple","orange",'pear','jade'];
var arrJade;
function passValue(){
    return arr.reduce(function(prev,next){
        console.log("prev---:",prev);
        console.log("next---:",next);

        prev[next] = 1;
        //console.info('prev type:'+ typeof(prev)); // [object Array]
        console.log(Object.prototype.toString.call(prev));
        arrJade = prev;
        return prev;
    }, []);    
}
console.log("reduce With [] as an additional parameter:",passValue());
//reduce With [] as an additional parameter: [ apple: 1, orange: 1, pear: 1, jade: 1 ]
console.log(arrJade.length); // 0
arrJade.push('jade');    
console.log(arrJade);        // [ 'jade', apple: 1, orange: 1, pear: 1, jade: 1 ]
console.log(arrJade.apple);  // 1
```
这里可以看出，可以得到一个类Object对象的数组：只是被包裹的是`[]`,而非`{}`；且此时该“数组”是有length属性的，只不过length是0而已。这个“数组”，以console.log(Object.prototype.toString.call(arrJade));来判别是数组无疑。但是倘若类同如此这样直接定义一个“数组”，却是断然不可以的，请看如下代码：。
```js
var arr = [apple: 1, orange: 1]; //这么搞，编译都过不了，语法错误❌
//Uncaught SyntaxError: Unexpected token : ...

//but,可以像使用reduce方法一样，可以构造出这样的数组！
var arrTest = [];
arrTest["apple"] = 1;
arrTest["orange"] = 1;
console.log(arrTest);       //[apple: 1, orange: 1]
console.log(arrTest.length) // 0
arrTest.push('pear');
console.log(arrTest);       // ["pear", apple: 1, orange: 1]
console.log(arrTest.length) // 1

console.log(arrTest.apple); //1   arrTest['apple']当然也可以访问。

arrTest["pear"] = 1;
console.log(arrTest);       //["pear", apple: 1, orange: 1, pear: 1]
```
既然这是一个数组，但为何不能直接如此构造，这一点现在还没搞搞明白，呜呜～。而这样：arrTest["apple"] = 1; 操纵一个数组，无形的将该项元素对象化了，又没用`{}`将其包裹，致使其“游离”于此数组一级对象一列，数组能够直接访问。但是，又不在length计数范围。length的数组下表是有对应关系的，当然这里也不能使用数组带下标来访问了。

JS数组，对于诸如Number,String之类的类型数据会被直接压入栈中，而引用类型只会压入对该值的一个索引（即C中所说的保存了数据的指针）。这些数据时储存在堆中的某块区间中，堆栈并不是独立的，栈中也可以在堆中存放。那么那些直接游离在数组中的Object元素项，存储地是在哪儿呢？额额，还是没搞搞明白，!?(･_･;?。

对于JS，尚有诸多未知，待学待探究，即便是这随便一个属性：length！！！

[javascript 类数组](http://segmentfault.com/a/1190000000415572)
[JavaScript 的怪癖 8：“类数组对象”](http://www.html-js.com/article/1619)
[JavaScript 创建数组的方法和基本操作](http://www.xiaoxiaozi.com/2009/06/29/1020/)
