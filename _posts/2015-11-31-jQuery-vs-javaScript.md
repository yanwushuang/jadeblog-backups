title: jQuery VS JavaScript原生API
date: 2015-11-25
categories: Front-End
tags:
- JavaScript
- jQuery
---

如今技术日新月异，各类框架库也是层次不穷。即便当年**漫山红遍**的JQuery（让开发者`write less, do more`，So Perfect!!）如今也有`被替代`的大势。但JS原生API写法依旧；并且有时候只不过小写一个Demo，或者产品中只有少量的前端效果或DOM操作，就去花时间&空间引入jQuery，或者React？不免有取宰牛之刀以杀鸡之嫌。

<!-- more -->

在jQuery的温柔乡里，是否还能记得原生她javascript原生？如果仅为使用个选择器($)或者类似的东西，是否真的有必要加载jQuery？故此了解下JS常用原生写法还是蛮有必要的。

[update-2015-12-07]有看到[抛弃jQuery，拥抱原生JavaScript](https://github.com/camsong/blog/issues/4)一文中提到，jQuery 代表着传统的以 DOM 为中心的开发模式，但现在复杂页面开发流行的是以 React 为代表的以数据/状态为中心的开发模式； React、Angular、Vue 等框架的流行，直接操作 DOM 不再是好的模式，jQuery 使用场景大大减少。

**[Talk is cheap. Show me the code](https://lkml.org/lkml/2000/8/25/132)**.直接看代码；以下是jQuery和JavaScript实现相同操作的等价代码：
### **选择元素**
```js
// jQuery  
var els = $('.el');  

//==========================================================//
// 原生方法  
var els = document.querySelectorAll('.el');  

// 函数法  
var $ = function (el) {  
  return document.querySelectorAll(el);  
}  
var els = $('.el');  
```

### **创建元素**
```js
// jQuery  
var newEl = $('<div/>');  

//==========================================================//
// 原生方法  
var newEl = document.createElement('div');  
```

### **添加/移除/切换类**
```js
// jQuery  
$('.el').addClass('class');  
$('.el').removeClass('class');  
$('.el').toggleClass('class');  

//==========================================================//
// 原生方法  
document.querySelector('.el').classList.add('class');  
document.querySelector('.el').classList.remove('class');
document.querySelector('.el').classList.toggle('class');
```

### **判断是否包含类**
```js
// jQuery
$('.el').hasClass('className');
$('.el').has('.className'); //也可以用来 判断是否包含某个元素

//==========================================================//
// 原生方法(1)
_hasClass(document.querySelector('.el'), className);
function _hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );
};

// 原生方法(2)
if(el.classList.contains("someClass")){}
```

### **添加事件监听器**
```js
// jQuery  
$('.el').on('event', function() {
});  

//==========================================================//  
// 原生方法  
[].forEach.call(document.querySelectorAll('.el'), function (el) {  
  el.addEventListener('event', function() {
  }, false);
});  
```

**原生－DOM绑定事件－优化1[参考HERE](http://www.cnblogs.com/coffeedeveloper/p/4811850.html)**
```js
//DOM绑定事件-之自执行
var BindEvent = (function () {
  if ('addEventListener' in document) {
    return function (dom, event, handle, ex) {
      dom.addEventListener(event, handle, ex || false);
    }
  } else if ('attachEvent' in document) {
    return function (dom, event, handle) {
      dom.attachEvent('on' + event, handle);
    }
  } else {
    return function (dom, event, handle) {
      dom['on' + event] = handle;
    }
  }
})();
```

**原生－DOM绑定事件－优化2**
```js
//DOM绑定事件-之惰性加载(调用方去触发BindEvent之时才去做初始化)//
var BindEvent = function (dom, event, handle, ex) {
  if ('addEventListener' in document) {
    BindEvent = function (dom, event, handle, ex) {
      dom.addEventListener(event, handle, ex || false);
    }
  } else if ('attachEvent' in document) {
	BindEvent = function (dom, event, handle) {
      dom.attachEvent('on' + event, handle);
    }
  } else {
    BindEvent = function (dom, event, handle) {
      dom['on' + event] = handle;
    }
  }
  BindEvent(dom, event, handle, ex);
};
```

### **设置/获取属性**
```js
// jQuery  
$('.el').filter(':first').attr('key', 'value');  
$('.el').filter(':first').attr('key');  

//==========================================================//
// 原生方法  
document.querySelector('.el').setAttribute('key', 'value');  
document.querySelector('.el').getAttribute('key');  
```

### **附加内容（Append）**
```js
// jQuery  
$('.el').append($('<div/>'));  

//==========================================================//
// 原生方法  
document.querySelector('.el').appendChild(document.createElement('div'));
```

### **克隆元素**
```js
// jQuery  
var clonedEl = $('.el').clone();  

//==========================================================//
// 原生方法  
var clonedEl = document.querySelector('.el').cloneNode(true);  
```

### **移除元素**
```js
// jQuery  
$('.el').remove();  

//==========================================================//
// 原生方法  
remove('.el');  
function remove(el) {  
  var toRemove = document.querySelector(el);  
  toRemove.parentNode.removeChild(toRemove);  
}  
```

### **获取父元素**
```js
// jQuery  
$('.el').parent();  

//==========================================================//
// 原生方法  
document.querySelector('.el').parentNode;  
```

### **上一个/下一个元素**
```js
// jQuery  
$('.el').prev();  
$('.el').next();  

//==========================================================//
// 原生方法  
document.querySelector('.el').previousElementSibling;  
document.querySelector('.el').nextElementSibling;  
```

### **修改CSS属性**
总是通过Javascript修改和检索CSS属性，这样会比使用jQuery CSS函数更加简单快速，并且没有任何不必要的代码。
```js
 //----设置CSS属性----

/* jQuery */
  $(el).css({
    background: "#FF0000",
"box-shadow": "1px 1px 5px 5px red",
    width: "100px",
    height: "100px",
    display: "block"
  });

//==========================================================//
/* 原生 */
var el = document.querySelector(".main-content");
el.style.background = "#FF0000";
el.style.width = "100px";
el.style.height = "100px";
el.style.display = "block";
el.style.boxShadow = "1px 1px 5px 5px red";
```

### **XHR或AJAX**
```js
// jQuery  
$.get('url', function (data) {  

});  
$.post('url', {data: data}, function (data) {  

});  

//==========================================================//
// 原生方法  
// get  
var xhr = new XMLHttpRequest();  

xhr.open('GET', url);  
xhr.onreadystatechange = function (data) {  
}  
xhr.send();  

// post  
var xhr = new XMLHttpRequest()  

xhr.open('POST', url);  
xhr.onreadystatechange = function (data) {  

}  
xhr.send({data: data});
```

参考文章：http://www.iteye.com/news/28503
英文原文：http://blog.romanliutikov.com/post/63383858003/how-to-forget-about-jquery-and-start-using-native
