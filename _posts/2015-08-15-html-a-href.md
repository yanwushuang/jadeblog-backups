title: Html<a>标签href的困惑记载
date: 2015-08-15
categories: Front-End
tags: Html
---

近日，在工作中遇到一个小问题(给手游平台做些网页活动，其中牵涉到一个按钮链接，就习以为常的用了`<a>`标签，Click响应之后走一段js代码逻辑－弹出一个分享微信弹框。Chrome和Android平台都没问题，测试阶段发现Ios平台出现了点问题～弹框闪现一下之后，页面被重新渲染了，自然弹框又被消隐掉了。)，经历一番查证，个中缘由原来如此。

<!-- more -->

出现问题后，立马走了段代码逻辑，发现并没任何逻辑问题。并且Chrome和Android平台又都OK的，只是Ios平台有此问题。经验不够丰富情形之下，只能在Ios手机上先Alert下,看下代码走的路线了。代码采用Backbone框架而成，经alert出来的提示，发现Click之后，页面view竟被重新执行了一次。额...逻辑没问题，而类似活动无数，没出现类似问题啊，不明就里～［好桑心，无能为力又无从下手的感觉,好难受］。

之后，请出同事中的前辈帮着Codereview下，终定为出了问题。原是误用这`<a>`惹出来的。这边见大家都用`<a href="javascript:;"></a>`。当然之前偶然看了<font class="pruple">张鑫旭</font>一篇[《疑问：为什么要使用href=”javascript:void(0);”？》](http://www.zhangxinxu.com/wordpress/2013/01/why-use-href-javascript-void0/)，从中窥测之前多用的是`<a href="javascript:void(0);"></a>`。但为什么要用这个，他本人也没弄明白，然后读完，我也没明白。而此处，嫌用`<a href="javascript:;"></a>`这么长麻烦，就用`<a href="#"></a>`这个试了下，唉～可以啊，Android也可以唉，那就用下了（噢，问题就因此埋下了，额额额～v～）。

**A Problem Is A Chance For You To Do Your Best！**我坚信这一点。惹出些问题并不见得都是坏事。每每因为自己的造成的这些个问题，反倒收获不少，😄。

之后就去查证了下关于这Html`<a>`标签的Href属性。超链接的 URL。可能的值：
>* 绝对 URL - 指向另一个站点（比如 href="http://www.jeffjade.com"）
* 相对 URL - 指向站点内的某个文件（href="index.htm"）
* 锚 URL - 指向页面中的锚（href="#top"）

根据网搜得到的答案如下，亲测也的确如此：
​`<a href="javascript:void(0)">点击</a>`: 点击链接后不会回到网页顶部
`<a href="#">点击</a>`: 点击后会回到网面顶部;
这里的href="javascript:;"，其中javascript:是伪协议，它可以让我们通过一个链接来调用javascript函数.而采用这个方式 javascript:;可以实现A标签的点击事件运行时，如果页面内容很多，有滚动条时，页面不会乱跳，用户体验更好。点击链接后也不会回到网页顶部。

而对于Href第三点～指向页面中的锚，如下用法：
1. 需要转到地方添加，`<a href="#命名">文字</a>`，注意href值是#开头+英文字母命名
2. 需要在被转到位置添加，`<span id="命名" name="命名"></span>`，注意id和name值相同并且与a命名相同(**亲测，id必须跟a命名相同，而span的name则不用！**并且当 href="#" 之时也会回到页面顶部.)


即可得出当使用（href="#"）之时即有可能会回到页面顶部。但问题是，活动一屏幕足以显示完，无需滑动，Ios手机也是如此。那么使用（href="#"）在这里是不会影响页面刷新的。得到ios客户端开发的说法是：这样写［使用（href="#"）］会触发到客户端的监控，从而引发异常。(～这一段，很多疑惑，只是猜测，有待继续学习检验)。

---
此段15-08-19更新：
对于这一段的不理解，后来在ios客户端童鞋的帮助下消解了。对于Ios跟js的交互是略有点不同的：[ ios中objective-c与js的交互](http://blog.csdn.net/mkhgg/article/details/7109097)这篇文章会有讲到。js调用objective-c的方法, 代码应该这么做：
```javascript
function testFunc(cmd,parameter1)   
{   
    document.write(Date());   
    document.location="objc://"+cmd+":/"+parameter1;  //cmd代表objective-   
c中的的方法名，parameter1自然就是参数了  （这里的objc://可以随意的去改）
}   
```

在Ios里面有一个监听  http 跳转的方法；一旦有类似`http://` or `objc://`他们都可以监听到(像这种 http:// 并不是他们要的 ，而要的是这种 objc:// 这种,所以在跟ios通信时候，都必须这种规则 objc://...。而**href="#"代表的是本地页面**[页面跳转到页面本身]。如此就能解释了之前出现问题了：ios可以监听到`<a href="#">点击</a>`这种链接，从而使得页面被刷新。

---
那么很疑惑，为何Android平台没有该问题？最后，也更进一步的疑问：JavaScript中语句最后的分号是可以缺省的，那为何要使用javascript:;而不是javascript:呢？是习惯还是规范，我也很疑惑！我也很疑惑！我也很疑惑！（重要的事情说三遍）

>具有代码洁癖的coder们，没事多写一个分号，圣洁的精神世界杯玷污了，怎么能忍受的了呢？这又不是多多语句，不写分号可能会出现意想不到的情况！（很认同，原话出自：[张鑫旭](http://www.zhangxinxu.com/wordpress/2013/01/why-use-href-javascript-void0/)）

---
此段15-08-19 20:06更新：
今日在博客园～神人唯吾的[<a>标签的href和onclick属性](http://www.cnblogs.com/happykakeru/archive/2011/10/24/2222702.html)这篇文章中看到了一个说法：
>尽量不要用`javascript:`协议做为A的href属性，这样不仅会导致不必要的触发window.onbeforeunload事件，在IE里面更会使gif动画图片停止播放。

这也许是大家默认使用'javascript:;'的一个原因，个中原委，有待于进一步的去摸索。

**总结：**`#`包含了一个位置信息默认的锚是#top 也就是网页的上端;
而`javascript:void(0)`仅仅表示一个死链接，没有任何信息。作用类同～javascript:;
而`javascript:`会导致不必要的触发window.onbeforeunload事件等。
故此：此处当不依靠href属性做页面跳转时候，最好还是用`javascript:;`更优一点。

---

Gui求指点，欢求吐槽！

