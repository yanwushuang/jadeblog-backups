title: IOS 8 Safari JIT bug影响jQuery和underscore
date: 2015-09-06 11:00
categories: Front-End
tags: 
- JavaScript
---

前端时间为移动游戏做一个网页活动需求（9宫格的刮奖），遇到一个很诡异的问题:Android端OK，就是在Ios设备上，点击非第一块区域，显示却是第一块区域被刮开咯，查看后端返回数据缺失OK的【前端采用backbone写法，遍历返回数据用的是underscore.js中的each】。经过一番查证，原来如此。

<!-- more -->

参考[水木社区](http://www.newsmth.net/nForum/#!article/WebDev/36711)这里的叙述，知晓原来这个属于：IOS 8 Safari JIT bug 影响 jQuery 和 underscore，致使： $.each/_.each，看到 .length 后，会把一个 object 当作数组来遍历。这个bug 会造成莫名其妙的结果。而我那里的结果就是：object数据对象，会在_.each遍历之后被乱序了。然后就造成以上所描述的问题。

于此，当时的解决办法是:将后端返回的object对象数据，做了转数组处理后，set给定义的模板，交付给_.each遍历就没有问题了。

```js
var arrList = [];
for(var i=0; i<9; i++){
	arrList.push(data.datainit.list[i]);
};
this.model.set('arrList',arrList);
```

好吧,可以看到这里for循环用的是这种传统的方式（还有一个魔数9,额の）。一开始，这里用for..in方式进行遍历的，代码如下：

```js
for (k in data.datainit.list){
  arrList.push(data.datainit.list[k]);
}
```

惊奇的结果是：这样搞，不行的;好奇怪的样子(得更努力的深入Js才行哇～)？在chrome的console下比较两者转化的数组结果一模一样。然后以ipod机器（系统版本Ios8.4.1）alert数组的长度，得到的结果是一样的，都是9。额，奇怪啊。就在即将放弃的时候alert了下转化数组结果，发现采用for..in 方式遍历object对象数据，在ios机器上（没试过所有，拿了ipad，iphone相对高版本系统）会打乱原有的顺序（原来以为是以value从大到小呢，后来多次尝试，不是如此，也未发现规律）；可见,__Ios8 Safari上，以for..in方式遍历object对象会造成乱序;__但是为何会造成这样子呢？按照Jquery方面对此问题的修复时说法，此时该Object对象the highest property is 10，且是从data.datainit.list[1]开始轮询的～😄。

JQuery方面在 https://github.com/jquery/jquery/issues/2145 有过对此问题的叙述：
>There is a timing bug in iOS8 that causes mobile Safari to incorrectly report a 'length' on objects that don't have one.

>To the best of my knowledge, this happens on iOS8+, possibly only on 64-bit systems. The bug is triggered for objects that have only numeric properties. For example:

```js
foo = { 1: 'a', 2: 'b', 3: 'c' } 
```
>In this case, if you query foo.length then mobile Safari will sometimes return 4 (the highest property + 1).

>This causes functions like $.each() to treat objects such as foo above as arrays instead of objects, and when it tries to iterate them as such it fails since there is no foo[0].

>The problem can be fixed in the function isArrayLike(). Instead of just checking for 

```js
typeof length === "number"
```

>you also need to check for

>obj.hasOwnProperty('length')
The latter check is immune to the iOS bug.

>I realize this is a fix just for one browser, but it's a browser with a very large user base.

---

当然：jQuery 1.11.3 和 underscore 1.8.3修正了这个问题。事实上，对于此问题：jquery方面在Github这里[$.each fails intermittently on iOS due to Safari bug#2145](https://github.com/jquery/jquery/issues/2145)有过相关的论述；有兴趣一探究竟，可以点进去看下。

来对比下underscore 1.7.0和underscore1.8.3中_.each的代码差异，来窥测下其修正手法：
```js
// The cornerstone, an `each` implementation, aka `forEach`. Handles raw objects in addition to array-likes. Treats all sparse array-likes as if they were dense.   _.each = _.forEach = function(obj, iteratee, context) {
  if (obj == null) return obj;
  iteratee = createCallback(iteratee, context);
  var i, length = obj.length;
  if (length === +length) {
    for (i = 0; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;   };
```

在underscore1.8.3中，做了如下改进，并附有相应注释：
```js
// Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object
// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
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

// Collection Functions
// --------------------

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
_.each = _.forEach = function(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};
```
    