title: Backbone事件模块及其用法
date: 2015-06-18 11:11
categories: Front-End
tags:
- Backbone
- JavaScript
---

事件模块Backbone.Events在Backbone中占有十分重要的位置，其他模块Model，Collection，View所有事件模块都依赖它。通过继承Events的方法来实现事件的管理，可以说，它是Backbone的核心组成部分。

<!-- more -->

此外，事件模块的所有方法都挂在了全局的Backbone上，如果你的代码中需要用到自定义事件(实现观察者模式)，可以直接使用它。

## **一、Events API**

1.0之前只提供了三个基本方法 on/once/off/trigger，1.0开始增加了几个实用方法 listenTo/listenToOnce/stopListening。

![Backbone](http://images.cnitblog.com/blog/532971/201411/090838293464523.png)

以下是各个方法的意义
>on 添加自定义事件
off 删除自定义事件
trigger 派发自定义事件
once 添加只执行一次的自定义事件 （内部依赖于_.once）
listenTo 添加一个观察对象
listenToOnce 添加一个仅执行一次的观察对象
stopListening 删除添加的观察对象

## **二、基本事件方法**

### **1. 绑定on方法**

使用on方法可以给一个对象的自定义事件绑定触发该事件时执行的函数，当自定义的事件触发时，绑定的函数将会被执行。其调用格式如下：
>obj.on(eventName, function, [context])

其中，参数Obj表示对象本身；eventName表示自定义事件的事件名；function表示当事件触发时被执行的函数；可选参数context表示上下文对象，用于对象级事件的监听，即当一个对象需要监听另一个对象的事件时，可以使用该参数。

使用on方法不仅可以绑定用户的自定义事件，可以直接监听对象自带的一些事件，下面通过一些简单示例来演示具体使用过程。

**示例1：使用on方法监听默认事件**
``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : ""
  }
});
var man = new Person();
man.on('change', function () {
  console.log('对象的默认值发生了变化');
});
man.set('name', 'breezefeng');
```
在上述代码中，首先定义一个名称为Person的数据模型类。在定义时，通过defaults参数设置两个名为“name” 和 “sex” 的默认数据项。然后，实例化一个名为man的模型类对象，并使用on方法向该对象绑定触发change事件时执行的函数，即只要对象的属性值发生变化，将会触发change事件。

**示例2：使用on方法监听属性事件**
``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女"
  }
});
var man = new Person();
man.on('change', function () {
  console.log('对象的默认值发生了变化');
});
man.on('change:sex', function (model, value) {
  console.log('你修改了性别属性值，最新值是：' + value)
});
man.set('sex', '男');
```
在上述代码中，分别给man对象绑定了两个事件，一个是默认事件change，另一个是属性事件change:sex，即sex属性变化事件。在属性变化事件的回调函数中，通过回传的value参数获取最新修改后的属性值。

**示例3：使用on方法获取属性修改前的值**

在使用on方法绑定change和change属性事件时，还可以通过回调函数中的model对象获取属性修改前的所有值，如下所示：

```js
model.previous('attrName')  //用于获取对象中某个属性的原有值

model.previousAttributes()  //返回一个对象，保存上一个状态的所有属性的原有值

var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
man.on('change:score', function (model, value) {
  var oldScore = model.previous('score');
  if (value > oldScore) {
    console.log('你比上次进步了' + (value - oldScore) + '分');
  } else if (value < oldScore) {
    console.log('你比上次落后了' + (oldScore - value) + '分');
  } else {
    console.log('你的成绩没有变化');
  }
});
man.on('change:age', function (model, value) {
  var objAttr = model.previousAttributes();
  var oldAge = objAttr.age;
  if (value > oldAge) {
    console.log('你又长大了' + (value - oldAge) + '岁');
  } else if (value < oldAge) {
    console.log('你又年轻了' + (oldAge - value) + '岁');
  } else {
    console.log('你的年龄没有变化');
  }
});
man.set({
  age : '36',
  score : 200
});
```
在上述代码中，通过使用on方法分别绑定对象man的change:score 和 change:age两个属性事件。

在第一个属性事件change:score 中，通过回调函数中model模型对象的previous方法，获取上一次保存的score属性值。

在第二个属性事件change:age 中，通过回调函数中model模型对象的previousAttributes方法，获取上一次保存结果的对象，并将对象保存至变量objAttr中，再通过访问对象变量objAttr的方式获取上一次保存的age属性值。

**示例4：使用on方法绑定多个事件**

在Backbone中，除了使用on方法绑定单个对象的事件，还可以使用该方法同时绑定多个对象的事件。绑定的格式有两种，第一种为各个事件使用空格隔开，格式如下：

obj.on("eventName1 eventName2", function)

其中，使用空格隔开的参数eventName1 和 eventName2 表示被绑定的多个事件名称，function表示所有被绑定事件都要执行的自定义函数。

第一种绑定方式代码：
``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
man.on('change:score change:age', function (model, value) {
  var oldAge = model.previous('age');
  var newAge = model.get('age');
  if (oldAge != newAge) {
    console.log('age原值:' + oldAge + ', 新值:' + newAge);
  }

  var oldScore = model.previous('score');
  var newScore = model.get('score');
  if (oldScore != newScore) {
    console.log('score原值:' + oldScore + ', 新值:' + newScore);
  }
});

man.set('age', 36);
man.set('score', 200);
```
在使用on方法绑定事件中，有两种格式可以绑定多个事件，除第一种使用空格之外，第二种方法为使用对象方式绑定多个事件，格式如下：
``` js
var objEvent = {
    eventName1 : function1,
    eventName2 : function2
    ...
};
obj.on(objEvent);
```
在上述代码中，首先定义一个哈希对象objEvent，并以key/value的方式向该对象批量添加各个事件名称和要执行的事件函数，然后通过使用on方法绑定哈希对象即可。

接下来将第一种使用空格方式绑定多个事件的代码修改成使用哈希对象绑定多个事件功能，修改代码如下：

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var objEvent = {
  'change:score' : score_change,
  'change:age' : age_change
};
man.on(objEvent);
function score_change (model, value) {
  var oldScore = model.previous('score');
  var newScore = model.get('score');
  if (oldScore != newScore) {
    console.log('score原值:' + oldScore + ', 新值:' + newScore);
  }
}
function age_change (model, value) {
  var oldAge = model.previous('age');
  var newAge = model.get('age');
  if (oldAge != newAge) {
    console.log('age原值:' + oldAge + ', 新值:' + newAge);
  }
}
man.set({
  age : 36,
  score : 200
});
```

### **2.绑定一次 once方法**

在Backbone中，除使用on方法可以绑定对象的事件之外，还可以使用once完成对象事件的绑定，只不过once方法绑定的事件只执行一次，之后即使触发也不执行，其调用格式如下：

>obj.once(eventName, function, [context])

示例代码如下：

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var intNum = 0;
man.once('change', function () {
  intNum++;
  console.log('事件触发的次数为 : ' + intNum);  //1
});
man.set('age', 36);
man.set('age', 37);
```
最终intNum打印出1，说明绑定的事件函数只执行了一次。

### **3. 触发事件 trigger方法**

trigger也是Backbone事件API中的一个重要方法，它的功能是触发对象的某一个事件，其调用格式如下：

>obj.trigger(eventName)

使用trigger方法可以手动触发对象的任何事件，不仅是系统自带的系统事件，还可以是自定义事件。示例代码如下：
``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
man.on('change_age_sex', function () {
  console.log('你手动触发了一个自定义事件');
});
man.on('change:age', function (model, value) {
  if (value != undefined) {
    console.log('你修改后的年龄为 : ' + value);
  } else {
    console.log('你手动触发了一个年龄修改事件');
  }
});
man.trigger('change_age_sex');
man.trigger('change:age');
man.set('age', 36);
```
不难看出，trigger方法的功能就是手动执行对象绑定的事件，类似于自定义一个函数后，调用该事件名。因此，该方法就是执行事件，不论该事件是自定义的还是系统自带的。

### **4. 移出事件 off方法**

在Backbone中，与绑定事件的on方法相对的是移除事件的off方法，该方法的功能是移除对象中已绑定的某个、多个或全部的时间，其调用格式如下：

>obj.off(eventName, function, [context])

**示例1：使用off方法移出对象的某个或多个绑定事件**

在Backbone中，如果要移除对象的某个绑定事件，可以调用对象的off方法，指定需要移除的事件名称；如果有多个事件名称，则用空格隔开。
``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var m = 0, n = 0;
var callback_a = function () {
  m++;
  console.log('你执行事件的次数为：' + m);
};
var callback_b = function () {
  n++;
  console.log('你执行事件的次数为：' + n)
};
man.on('event_a', callback_a);
man.on('event_b', callback_b);
man.off('event_a');
man.trigger('event_a event_b');
man.off('event_a event_b');
man.trigger('event_a event_b');
```
**示例2：使用off方法移除绑定事件的某个函数**

在Backbone中，不仅可以调用对象的off方法移除已绑定的一个或多个事件，还可以移除绑定事件执行的某个函数。

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var m = 0, n = 0;
var callback_a = function () {
  m++;
  console.log('你执行事件的次数为：' + m);
};
var callback_b = function () {
  n++;
  console.log('你执行事件的次数为：' + n)
};
man.on('event_a', callback_a);
man.on('event_b', callback_b);
man.off('event_a', callback_a);
man.trigger('event_a event_b');
man.off('event_b', callback_b);
man.trigger('event_a event_b');
```
**示例3：使用off方法移除对象的全部绑定事件**

在Backbone中，对象的off方法除了可以移除某个或多个事件、事件执行函数外，还可以通过不带参数的方式移除全部已绑定的事件，其调用格式如下：

>obj.off()

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var m = 0, n = 0;
var callback_a = function () {
  m++;
  console.log('你执行事件的次数为：' + m);
};
var callback_b = function () {
  n++;
  console.log('你执行事件的次数为：' + n)
};
man.on('event_a', callback_a);
man.on('event_b', callback_b);
man.off();
man.trigger('event_a event_b');
```

## **三、新增事件方法**

### **1. 监听事件 listenTo方法**

相对于对象的on方法而言，listenTo方法的监听效果更为突出，它是一个对象监听另一个对象的事件，如果被监听对象触发了被监听的事件，执行相应的回调函数或代码块。例如，view对象要监听model对象的change事件，如果model对象触发了change事件，则需要刷新当前view对象，即执行下列监听方法的代码：

>view.listenTo(model, 'change', view.render)

上面监听方法也等价于如下代码：

>model.on('change', view.render, view)

其中，第三个参数为上下文环境对象，此时它的值为view，即model对象在触发change事件时，关联view对象进行执行view.render动作。

通过上述对listenTo方法的简单介绍，我们知道它是一个对象级别的事件监听方法，即在执行该方法时，必须要有两个对象，其调用格式如下：

>obj1.listenTo(obj2, eventName, function

其中，参数obj1，obj2都为对象，参数eventName是obj2对象触发的事件名称，参数function为当obj2触发指定的eventName事件时，obj1所执行的自定义函数。

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var obj = _.extend({}, Backbone.Events);
obj.listenTo(man, 'change:age', function (model, value) {
  var oldAge = model.previous('age');
  var newAge = model.get('age');
  if (oldAge != newAge) {
    console.log('age原值:' + oldAge + ', 新值:' + newAge);
  }
});
man.set('age', 36);
```

### **2.监听一次 listenToOnce方法**

在BackBone中listenTo方法 和 listenToOnce方法调用方式完全一致，唯一区别是前者是一个对象一直监听另一个对象事件的触发，而后者是仅监听一次。

```js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var obj = _.extend({}, Backbone.Events);
var intNum = 0;
obj.listenToOnce(man, 'change:age', function (model, value) {
  intNum++;
  console.log('事件触发的次数为:' + intNum);
});
man.set('age', 36);
man.set('age', 37);
```
### **3.停止监听 stopListening方法**

在Backbone中，与单个对象的off方法相同，对象级别的事件监听也有停止方法，即stopListening方法，其调用格式如下：

>obj1.stopListening(obj2, eventName, function)

``` js
var Person = Backbone.Model.extend({
  defaults : {
    name : "",
    sex : "女",
    age : 32,
    score : 120
  }
});
var man = new Person();
var obj = _.extend({}, Backbone.Events);
obj.listenTo(man, 'change:name', function (model, value) {
  console.log('姓名修改后的值为:' + value);
});
obj.listenTo(man, 'change:age', function (model, value) {
  console.log('年龄修改后的值为:' + value);
});
obj.listenTo(man, 'change:score', function (model, value) {
  console.log('分数修改后的值为:' + value);
});
//停止监听某一个事件
obj.stopListening(man, 'change:name');
man.set('name', '张三');
man.set('age', 35);
man.set('score', 600);
//停止监听两个事件
obj.stopListening(man, 'change:name change:age');
man.set('name', '李四');
man.set('age', 36);
man.set('score', 601);
//停止监听全部事件
obj.stopListening();
man.set('name', '王五');
man.set('age', 37);
man.set('score', 602);
```
以上就是Backbone.Events模块所有API的使用;原文参见：[这里](http://www.cnblogs.com/fengyuqing/p/backbone_events_api_usage.html?utm_source=tuicool)

##**四 理解Backbone中的bind和bindAll**
在Backbone.js的学习过程中，已经有了on方法绑定；后面又新增了ListenTo监听；而又有bind绑定方法。实现同一个操作手段多了着实有些晕。搜索网络资源学习了下，特贴之于下，以作记载。这里包括underscore.js的bind和bindAll，以及JQuery提供的bind方法。
参见文章：[理解 backbone.js 中的 bind 和 bindAll 方法](http://gxxsite.com/content/view/id/132.html)
参见原文：[Understanding bind and bindAll in Backbone.js](http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html)

1, **首先说熟悉的JQuery的bind**，引用api帮助文件的内容即可很清晰地理解其使用意义和方法：
```js
dom.bind(type,[data],function(eventObject));
dom.bind(type,[data],false);
dom.bind(events);

//例子

//当每个段落被点击的时候，弹出其文本：
$("p").bind("click", function(){
  alert( $(this).text() );
});

//同时绑定多个事件类型：
$('#foo').bind('mouseenter mouseleave', function() {
  $(this).toggleClass('entered');
});

//同时绑定多个事件类型/处理程序：
$("button").bind({
  click:function(){$("p").slideToggle();},
  mouseover:function(){$("body").css("background-color","red");},  
  mouseout:function(){$("body").css("background-color","#FFFFFF");}  
});

//你可以在事件处理之前传递一些附加的数据：
function handler(event) {
  alert(event.data.foo);
}
$("p").bind("click", {foo: "bar"}, handler)

//通过返回false来取消默认的行为并阻止事件起泡：
$("form").bind("submit", function() { return false; })

//通过使用 preventDefault() 方法只取消默认的行为：
$("form").bind("submit", function(event){
  event.preventDefault();
});

//通过使用 stopPropagation() 方法只阻止一个事件起泡:
$("form").bind("submit", function(event){
  event.stopPropagation();
});
```

2,**underscore.js的apply方法**apply主要作用是让我们可以控制方法中this指代的值，下面用代码表述：
```js
var func = function beautiful(){
  alert(this + ' is beautiful');
};
func.apply('Internet');
//输出Internet is beautiful
```
以上例子只帮我们理解apply的作用，实际上，apply的意义何在，请看下例：
```js
function Developer(skill) {
  this.skill = skill;
  this.says = function(){
    alert(this.skill + ' rocks!');
  }
}
var john = new Developer('Ruby');
var func = john.says;
func();
//输出undefined rocks!
```
上例可看出，在给调用对象john中的says方法定义一个单独的方法func后，执行func，this将被认为是func所处的对象，而不是john。这时apply可以解决问题，代码如下：
```js
function Developer(skill) {
  this.skill = skill;
  this.says = function(){
    alert(this.skill + ' rocks!');
  }
}
var john = new Developer('Ruby');
var func = john.says;
func.apply(john);
//输出Ruby rocks!
```
这样做太复杂，所以需要用bind和bindAll来简化和规范化，请往下看。

3, **Underscore.js的bind方法**
```js
function Developer(skill) {
  this.skill = skill;
  this.says = function(){
    alert(this.skill + ' rocks!');
  }
}
var john = new Developer('Ruby');
var func = _.bind(john.says, john); //绑定的方法是john对象执行says方法，里面的this指代的是第二个参数john
func();
//输出Ruby rocks!
```

`注意：_.bind()返回的值才是绑定的方法，而不会影响里面绑定的方法本身，看下例：`

```js
window.ProductView = Backbone.View.extrend({
  initialize: function() {
    _.bind(this.render, this);
    this.model.bind('change', this.render);
  }
});
//这样做的结果是change触发的是原this.render，方法中的this依然是不可性预计
 
 
window.ProductView = Backbone.View.extrend({
  initialize: function() {
    var f_render=_.bind(this.render, this);
    this.model.bind('change', f_render);
  }
});
//这是正确做法，或者更直接简单：
 
window.ProductView = Backbone.View.extrend({
  initialize: function() {
    this.model.bind('change', _.bind(this.render, this));
  }
});
 
//最简单当然是用_.bindAll：
window.ProductView = Backbone.View.extrend({
  initialize: function() {
    _.bindAll(this, this.render);
    this.model.bind('change', this.render);
  }
});
```

4, **underscore.js的bindAll方法**
```js
function Developer(skill) {
  this.skill = skill;
  this.says = function(){
    alert(this.skill + ' rocks!');
  }
}
var john = new Developer('Ruby');
_.bindAll(john, 'says'); //绑定的方法是john中的says方法，里面的this指代john
                         //可以一次过指定this到多个方法：_.bindAll(john,'says','work','gohome');
var func = john.says;
func();
//输出Ruby rocks!
```
