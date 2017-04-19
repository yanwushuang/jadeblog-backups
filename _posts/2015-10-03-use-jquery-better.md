title: 〔转〕jQuery编程的最佳实践
date: 2015-10-04 12:00:00 #文章生成时间
categories: Front-End
tags: jQuery
description: #你对本页的描述 可以省略
toc: true
iscopy: true
---

前几日看到这篇关于jQuery的文章，至少如今还觉得很好，就忍将不住的转了来；以备之后深加探究。此文出自“刘哇勇的部落格”[jQuery编程的最佳实践](http://www.cnblogs.com/Wayou/p/jquery_best_practise.html)；原文出自[Coding Standards & Best Practices](http://lab.abhinayrathore.com/jquery-standards/)。另有一篇关于jQuery的不错文章[14 Helpful jQuery Tricks, Notes, and Best Practices](http://code.tutsplus.com/tutorials/14-helpful-jquery-tricks-notes-and-best-practices--net-14405)，值得一览，译文在此[14条关于jQuery的知识](http://www.iinterest.net/2010/09/27/%E8%BD%AC14%E6%9D%A1%E5%85%B3%E4%BA%8Ejquery%E7%9A%84%E7%9F%A5%E8%AF%86/)。

<!-- more -->

>**微注：** 转引此文时候，是在 15 年十月份，转眼一年有余；而大约在 16 年十月份时候，已经很少用 JQuery 了(个别小需求除外)，而采用 MVVM 框架外加原生，去解决各种需求。虽说 JQuery 固然强大，但它的使命已经完结；当今时代，跟着时代的步伐，方是我等 programmer 更为科学的打开方式，不是么？所以说，当你看到此文的时候，不妨考量下是否必要去使用它；如若需要，推荐看下此网站 [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com/?from=jeffjade.com) [Update@17.02.05]。


好像是feedly订阅里看到的文章，读完后觉得非常不错，译之备用，多看受益。

## __加载jQuery__
1. 坚持使用CDN来加载jQuery，这种别人服务器免费帮你托管文件的便宜干嘛不占呢。[点击查看](http://www.sitepoint.com/7-reasons-to-use-a-cdn/)使用CDN的好处，[点此](http://lab.abhinayrathore.com/jquery-standards/#jQueryCND)查看一些主流的jQuery CDN地址。
```js
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<script>window.jQuery || document.write('<script src="js/jquery-1.11.0.min.js" type="text/javascript"><\/script>')</script>
```

2. 安全起见，最好还是提供一个本地备份以便在无法从远程CDN服务器获取jQuery时网站也能工作，如上面代码所示。[详情见此](https://css-tricks.com/snippets/jquery/fallback-for-cdn-hosted-jquery/)。

3. 使用[裸协议](http://www.paulirish.com/2010/the-protocol-relative-url/)的URL（也就是说去掉http:或者https:），如上面代码展示的那样。

4. 如果可能，尽量将你的JavaScript和jQuery代码放到页面底部。详情移步[这里](https://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html)，或者查看一个[HTML5页面标准模板](https://github.com/h5bp/html5-boilerplate/blob/master/src/index.html)。

5. 该使用哪个版本？
* 如果你想兼容IE678请表用2.x的版本
* 针对极少数不用考虑兼容性的幸运儿，极力推荐使用最新版本的jQuery
* 当从CDN服务器加载jQuery时，最好把版本写全（比如1.11.0而不是1.11或者直接写个1）
* 千万莫重复加载.

6. 如果你同时还使用了其他JS框架诸如Prototype, MooTools, Zepto云云，因为他们也使用了$符号，所以你就表再用美刀符号来进行jQuery 编码了，而请用`jQuery`代替。并且调用`$.noConflict()`保证不会有冲突出现。

7. 要检测浏览器对一些新特性是否支持，请用[Modernizr](https://modernizr.com)。插播广告：[论为毛不检测浏览器](http://www.cnblogs.com/Wayou/p/why_jquery_obselete_brower_detecting.html)。

## __关于变量__
1. jQuery类型的变量最好加个$前缀。

2. 时常将jQuery选择器返回的内容存进变量以便重用
```js
var $products = $("div.products"); // 慢
var $products = $(".products"); // 快
```
3. 使用驼峰命名.

## __关于选择器__
1. 尽量ID选择器。其背后机理其实是调用原生的`document.getElementById()`，所以速度较其他选择器快。

2. 使用类选择器时表指定元素的类型。不信你看这个[性能比较](http://jsperf.com/jqeury-selector-test)
```js
var $products = $("div.products"); // 慢
var $products = $(".products"); // 快
```

3. ID父亲容器下面再查找子元素请用.find()方法。这样做快的原因是通过id选择元素不会使用Sizzle引擎。详情看这里

4. 多级查找中，右边尽量指定得详细点而左边则尽量简单点。了解更多
```js
// 丑陋
$("div.data .gonzalez");
// 优化后
$(".data td.gonzalez");
```

5. 避免冗余。[详情](http://learn.jquery.com/performance/optimize-selectors/)或者查看[性能比较](http://jsperf.com/avoid-excessive-specificity)
```js
$(".data table.attendees td.gonzalez");
// 好的方式：去掉了中间的冗余
$(".data td.gonzalez");
```

6. 指定选择的上下文。
```js
// 劣质的代码：因为需要遍历整个DOM来找到.class
$('.class');
// 高品代码：因为只需在指定容器范围内进行查找
$('.class', '#class-container');
```

7. 表使用万能选择器。查看[具体阐释](http://learn.jquery.com/performance/optimize-selectors/)
```js
$('div.container > *'); // 差
$('div.container').children(); // 棒
```

8. 警惕隐式的万能选择器。省略的情况下其实使用的就是*号通配符。更多信息
```js
$('div.someclass :radio'); // 差
$('div.someclass input:radio'); // 棒
```

9. ID已经表示唯一了，背后使用的是document.getElementById()，所以表跟其他选择器混搭了。
```js
$('#outer #inner'); // 脏
$('div#inner'); // 乱
$('.outer-container #inner'); // 差
$('#inner'); // 干净利落，后台只需调用document.getElementById()
```

## __DOM操作相关__
1. 操作任何元素前先将其从文档卸载，完了再贴回去。[这事儿还能说细点](http://learn.jquery.com/performance/detach-elements-before-work-with-them/)
```js
var $myList = $("#list-container > ul").detach();
//...一大堆对$myList的处理
$myList.appendTo("#list-container");
```

2.代码里将HTML组织好后再一次性贴到DOM中去。[具体来说](http://learn.jquery.com/performance/append-outside-loop/)，[性能比较](http://jsperf.com/jquery-append-vs-string-concat)
```js
// 这样不好
var $myList = $("#list");
for(var i = 0; i < 10000; i++){
    $myList.append("<li>"+i+"</li>");
}

// 这样好
var $myList = $("#list");
var list = "";
for(var i = 0; i < 10000; i++){
    list += "<li>"+i+"</li>";
}
$myList.html(list);

// 但这样更好
var array = [];
for(var i = 0; i < 10000; i++){
    array[i] = "<li>"+i+"</li>";
}
$myList.html(array.join(''));
```

3.不要处理不存在的元素。[详情](http://learn.jquery.com/performance/dont-act-on-absent-elements/)
```js
// 无良的做法：jQuery后台要跑完三个函数后才会知道这个元素其实根本不存在
$("#nosuchthing").slideUp();
// 应该这样
var $mySelection = $("#nosuchthing");
if ($mySelection.length) {
    $mySelection.slideUp();
}
```

## __事件相关__
1. 一个页面只写一个文档ready事件的处理程序。这样代码既清晰好调试，又容易跟踪代码的进程。

2. 表用匿名函数来做事件的回调。匿名函数不易调试维护测试和复用。或许你想较真，看看[这里](http://learn.jquery.com/code-organization/beware-anonymous-functions/)吧
```js
$("#myLink").on("click", function(){...}); // 表这样

// 这样
function myLinkClickHandler(){...}
$("#myLink").on("click", myLinkClickHandler);
```

3. 处理文档ready事件的回调也表用匿名函数，匿名函数不易调试维护测试和复用:(
```js
$(function(){ ... }); // 糟糕的做法：无法利用此函数也无法为其写测试用例

// 好的做法
$(initPage); // 抑或 $(document).ready(initPage);
function initPage(){
    // 这里你可以进行程序的初始化了
}
```

4. 进一步，最好也将ready事件的处理程序放到外部文件中引入到页面，而页面中内嵌的代码只需调用即可。
```js
<script src="my-document-ready.js"></script>
<script>
    // 初始化一些必要的全局变量
    $(document).ready(initPage); // 抑或 $(initPage);
</script>
```

5. 千万表写内联到HTML的JS代码，这是调试的梦魇！应该总是用jQuery来绑定事件自带程序，这样也方便随时动态地取消绑定。
```js
<a id="myLink" href="#" onclick="myEventHandler();">my link</a> <!--不好 -->
$("#myLink").on("click", myEventHandler); // GOOD
```

6. 如果可能尽量在绑定事件处理程序时使用一个命名空间，这样可以方便地取消绑定而不会影响其他绑定。
```js
$("#myLink").on("click.mySpecialClick", myEventHandler); // 不错
// 之后，让我们优雅地解除绑定
$("#myLink").unbind("click.mySpecialClick");
```

## __异步操作__
1. 直接用$.ajax()而表去用.getJson() 或 .get(),因为jQuery内部还是将其转为前者

2. 表对HTTPS站点使用HTTP去发起请求，最好干脆就表指定（将HTTP或者HTTPS从你的URL中移除）

3. 表在链接里面嵌参数，请使用专门的参数设置来传递
```js
// 不易阅读的代码...
$.ajax({
    url: "something.php?param1=test1&param2=test2",
    ....
});

// 更易阅读...
$.ajax({
    url: "something.php",
    data: { param1: test1, param2: test2 }
});
```

4. 尽量指明数据类型以便你自己清楚要处理什么样的数据（见下方会提到的Ajax模板）

5. 对于异步动态加载的内容，最好使用代理来绑定事件处理程序。这样的好处是对于之后动态加载的元素事件同样有效。你或许想[了解更多](http://api.jquery.com/on/)
```js
$("#parent-container").on("click", "a", delegatedClickHandlerForAjax);
```

6.使用Promise模式。[更多例子](http://www.htmlgoodies.com/beyond/javascript/making-promises-with-jquery-deferred.html)
```
$.ajax({ ... }).then(successHandler, failureHandler);

// 抑或
var jqxhr = $.ajax({ ... });
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);
```

7. 标准的Ajax模板一分。[追寻根源](https://api.jquery.com/jQuery.ajax/)
```js
var jqxhr = $.ajax({
    url: url,
    type: "GET", // 默认为GET,你可以根据需要更改
    cache: true, // 默认为true,但对于script,jsonp类型为false,可以自行设置
    data: {}, // 将请求参数放这里.
    dataType: "json", // 指定想要的数据类型
    jsonp: "callback", // 指定回调处理JSONP类型的请求
    statusCode: { // 如果你想处理各状态的错误的话
        404: handler404,
        500: handler500
    }
});
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);
```

## __动画与特效__
1. 保持一个始终如一风格统一的动画实现
2. 紧遵用户体验，表滥用动画特效

使用简洁的显示隐藏，状态切换，滑入滑出等效果来展示元素
使用预设值来设置动画的速度'fast'，'slow'，或者400（中等速度）

## __插件相关__
1. 始终选择一个有良好支持，完善文档，全面测试过并且社区活跃的插件
2. 注意所用插件与当前使用的jQuery版本是否兼容
3. 一些常用功能应该写成jQuery插件。[一分jQuery插件的编写模板](http://lab.abhinayrathore.com/jquery-standards/)

## __链式句法__
1. 除了用变量将jQuery选择器返回的结果保存，还可以利用好链式调用。
```js
$("#myDiv").addClass("error").show();
```

2. 当链式调用多达3次以上或代码因绑定回调略显复杂时，使用换行和适当的缩进来提高代码的可读性。
```js
$("#myLink")
    .addClass("bold")
    .on("click", myClickHandler)
    .on("mouseover", myMouseOverHandler)
    .show();
```

3. 对于特别长的调用最好还是用变量保存下中间结果来简化代码。

## __其他__

1. 使用对象字面量来传递参数
```js
$myLink.attr("href", "#").attr("title", "my link").attr("rel", "external"); // 糟糕：调用了三次attr
// 不错，只调用了一次attr
$myLink.attr({
    href: "#",
    title: "my link",
    rel: "external"
});
```

2. 表将CSS与jQuery杂揉
```js
$("#mydiv").css({'color':red, 'font-weight':'bold'}); // 不好

.error {/* 不错 */
    color: red;
    font-weight: bold;
}

$("#mydiv").addClass("error");
```

3. 时刻关注官方Changelog，表使用摒弃了的方法。[点此](http://api.jquery.com/category/deprecated/)查看所有废弃的方法.

4. 适时地使用原生JavaScript。[一些与此有关的性能比较](http://jsperf.com/document-getelementbyid-vs-jquery/3)
```js
$("#myId"); // 多少还是会逊色于...
document.getElementById("myId");
```

## __REFERENCE__
原文：Coding Standards & Best Practices http://lab.abhinayrathore.com/jquery-standards/

原文的reference
jQuery Performance: http://learn.jquery.com/performance/
jQuery Learn: http://learn.jquery.com
jQuery API Docs: http://api.jquery.com/
jQuery Coding Standards and Best Practice: http://www.jameswiseman.com/blog/2010/04/20/jquery-standards-and-best-practice/
jQuery Plugin Boilerplate: http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
