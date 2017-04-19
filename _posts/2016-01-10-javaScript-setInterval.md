title: 你所不知道的setInterval
date: 2016-01-10 18:30
categories: Front-End
tags: JavaScript
description: setInterval详解
---

在[你所不知道的setTimeout](http://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/)记载了下**setTimeout**相关,此篇则整理了下**setInterval**；作为拥有广泛应用场景(定时器，轮播图，动画效果，自动滚动等等)，而又充满各种不确定性的这setInterval，自当先洞悉它，才能很好的驾驭它。

<!-- more -->

![你所不知道的setInterval](http://7xoosr.com1.z0.glb.clouddn.com/jiangXin.jpg)

## **1. setInterval()基础**
setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

```js
<input type="button" onclick="clearInterval(timer)" value="stop">

<script>
  var i = 1
  var timer = setInterval(function() {
    console.log(2);
  }, 1000);
</script>
```

上面代码表示每隔1000毫秒就输出一个2，直到用户点击了停止按钮。

与setTimeout一样，除了前两个参数，setInterval 方法还可以接受更多的参数，它们会传入回调函数，下面是一个例子。
```js
function f(){
  for (var i=0;i<arguments.length;i++){
    console.log(arguments[i]);
  }
}

setInterval(f, 1000, "Hello World");
// Hello World
// Hello World
// Hello World
// ...
```

如果网页不在浏览器的当前窗口（或tab），许多浏览器限制setInteral指定的反复运行的任务最多每秒执行一次。

setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的事件。因此实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval指定每100ms执行一次，每次执行需要5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。
```js
var i = 1;
var timer = setInterval(function() {
  alert(i++);
}, 2000);
```
上面代码每隔2000毫秒，就跳出一个alert对话框。如果用户一直不点击“确定”，整个浏览器就处于“堵塞”状态，后面的执行就一直无法触发，将会累积起来。举例来说，第一次跳出alert对话框后，用户过了6000毫秒才点击“确定”，那么第二次、第三次、第四次执行将累积起来，它们之间不会再有等待间隔。

为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间。上面代码用setTimeout，可以改写如下。
```js
var i = 1;
var timer = setTimeout(function() {
  alert(i++);
  timer = setTimeout(arguments.callee, 2000);
}, 2000);
```
上面代码可以确保两次执行的间隔是2000毫秒。

根据这种思路，可以自己部署一个函数，实现间隔时间确定的setInterval的效果。
```js
function interval(func, wait){
  var interv = function(){
    func.call(null);
    setTimeout(interv, wait);
  };

  setTimeout(interv, wait);
}

interval(function(){
  console.log(2);
},1000);
```
上面代码部署了一个interval函数，用循环调用setTimeout模拟了setInterval。

HTML 5标准规定，setInterval的最短间隔时间是**10毫秒**，也就是说，小于10毫秒的时间间隔会被调整到10毫秒。

## **2. setInterval运行机制**
**setInterval**的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。

每一轮Event Loop时，都会将“任务队列”中需要执行的任务，一次执行完。setTimeout和setInterval都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。

这一点对于setInterval影响尤其大。
```js
setInterval(function(){
  console.log(2);
},1000);

(function (){
  sleeping(3000);
})();
```
上面的第一行语句要求每隔1000毫秒，就输出一个2。但是，第二行语句需要3000毫秒才能完成，请问会发生什么结果？

~~结果就是等到第二行语句运行完成以后，立刻连续输出三个2，然后开始每隔1000毫秒，输出一个2。也就是说，setIntervel具有**累积效应**，如果某个操作特别耗时，超过了setInterval的时间间隔，排在后面的操作会被累积起来，然后在很短的时间内连续触发，这可能或造成性能问题（比如集中发出Ajax请求）。~~
上一示例，根据网友 @看吓不说话 指出，在Nodejs环境下测试，并不会连续输出三个2；理由：setInterval 在准备把回调函数加入到事件队列的时候，会判断队列中是否还有未执行的回调，如果有的话，它就不会再往队列中添加回调函数。
```js
var count = 0;

var countId = setInterval(function() {
  if(count >= 5){
    clearInterval(countId)
  }
  count++;
  console.log(2+ " time: " +Date.now());
}, 1000);

(function() {
  var start = Date.now();
  for(i=1; i<=200000000;i++){
    if(i==200000000){
    console.log(i);
  }
}
console.log(Date.now() - start);
})();
```
打印测试结果，如下：
>200000000
1771
2 time: 1457495719375
2 time: 1457495720378
2 time: 1457495721380
2 time: 1457495722383
2 time: 1457495723395
2 time: 1457495724397
[Finished in 8.5s]

为了进一步理解JavaScript的单线程模型，请看下面这段伪代码。
```js
function init(){
  { 耗时5ms的某个操作 }
  触发mouseClickEvent事件
  { 耗时5ms的某个操作 }
  setInterval(timerTask,10);
  { 耗时5ms的某个操作 }
}

function handleMouseClick(){
  耗时8ms的某个操作
}

function timerTask(){
  耗时2ms的某个操作
}
init();
```
请问调用init函数后，这段代码的运行顺序是怎样的？
>**0-15ms**：运行init函数。
>**15-23ms**：运行handleMouseClick函数。请注意，这个函数是在5ms时触发的，应该在那个时候就立即运行，但是由于单线程的关系，必须等到init函数完成之后再运行。
>**23-25ms**：运行timerTask函数。这个函数是在10ms时触发的，规定每10ms运行一次，即在20ms、30ms、40ms等时候运行。由于20ms时，JavaScript线程还有任务在运行，因此必须延迟到前面任务完成时再运行。
>**30-32ms**：运行timerTask函数。
>**40-42ms**：运行timerTask函数。

对于setInterval得使用，个人建议是能不用尽量不用。涉及到必须要的定时器，前文已经叙述可以使用两个setTimeout嵌套组合来实现，并且还能规避掉一些问题得发生。涉及到要用它来制作动画（ jQuery就使用setInterval来写动画，也是导致其慢原因之一），更建议使用**requestAnimationFrame**(RAF)，或者直接采用CSS来写（如果可以的话）。

**requestAnimationFrame**比起setTimeout、setInterval的优势主要有两点：
1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
2. 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

参考文章链接：
[阮一峰-javaScript标准参考教程](http://javascript.ruanyifeng.com/bom/timer.html#toc2)

---
您可能会感兴趣的文章：
[你所不知道的setTimeout](http://www.jeffjade.com/2016/01/10/2016-01-10-javaScript-setInterval/)
