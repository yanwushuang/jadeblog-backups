title: CSS实现水平|垂直居中漫谈
date: 2015-11-14 17:30:00
categories: Front-End
tags: CSS
toc: true
iscopy: false
---

利用CSS进行元素的水平居中，比较简单，手到擒来：行级元素设置其父元素的text-align center，块级元素设置其本身的left 和 right margins为auto即可。而撸起垂直居中，相信于大多初撸者来说，与我相似，内心是抗拒的。于此，以我司同事一内部分享为基，加以搜集完善，得8种CSS垂直居中书写之法；个中有示例Demo，以及代码和优劣之评。
<!-- more -->
<ul>
<li><a href="/special/horizontal_center-methods.html" style="font-size:1em;font-weight:blod">CSS实现水平居中(3法)</a>
</li>
<li><a href="/special/vertical_center_methods.html" style="font-size:1em;font-weight:blod">CSS实现垂直居中(8法)</a>
</li>
<li><a href="/special/textVerticalCenter.html" style="font-size:1em;font-weight:blod">CSS文本垂直居中(5法)[Update: 2016-01-06]</a>
</li>
</ul>
PS：窃以为，对于CSS足够熟悉的话，以CSS多种属性组合出的“奇技淫巧”想必是层次不穷的，这里也只是搜集整理了其中为大家常用而又简洁的部分而已。

---

**注解:** 好吧，周末被“加班”了耶，搞搞需求整整Blog还算闲适；在写居中示例时，搜肠刮肚没什么适宜之词，便逼的自己“什兴大发“，特胡驺几句自黑乱言，填充内容，耶聊以慰籍；贴之于下，祈与同道者共嗨 😄。

<pre>
	周末把码黄昏后，有咸香盈袖。
	莫道不消魂，独弄键盘，人比黄花瘦。
	真可谓：天堂有路你不走，学海无涯苦作舟。
	到头来：码山有路勤为径？三十功名尘与土。
	饶上个：一入'哀啼'深似海，从此'逍遥'没长'苏'。
</pre>

--更新于2015-11-25 之后在CodePen有看到一文将__绝对居中__阐述的更为全面，链接如下：
http://codepen.io/shshaw/full/gEiDt