title: CSS征途之Background点滴
date: 2015-06-29 15:15:15
categories: Front-End
tags: CSS
---
CSS虽算不上编程语言，确是能够真正做到网页表现与内容分离的一种样式设计语言。相对于传统HTML的表现而言，CSS能够对网页中的对象的位置排版进行像素级的精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力，并能够进行初步交互设计，且能够根据不同使用者的理解能力，简化或者优化写法，针对各类人群，有较强的易读性。如此强大，怎能不去学习一下？而这里就记录下CSS学习使用关于Background的点滴，毕竟好记性不如烂笔头。

<!-- more -->
## **Background基础知识**
**Background语法**
>background: background-color || background-image || background-repeat || background-attachment || background-position

**Background属性**
background-color 设置颜色作为对象背景颜色 eg:#fe0
background-image 设置图片作为背景图片 eg:url(图片地址)
background-repeat 设置背景平铺重复方向 eg: no-repeat
background-attachment 设置或检索背景图像是随对象内容滚动还是固定的。eg: fixed/scroll
background-position 设置或检索对象的背景图像位置。eg 10px 10px / left top

Background背景样式的值是复合属性值组合，也就是背景单词的值可以跟多个属性值，值与值之间使用一个空格间隔链接上即可。如：
```CSS
background: #000 url(图片地址) no-repeat left top fixed
```
## **Background的非一般用法**
(1) **仿栏(伪造栏布局)**

当使用 css 的 float 属性来定位布局元素时，要确保两栏或多栏有相同的长度是比较困难的。如果长度不同，其中一栏的背景会比另外的短，这会破坏整个设计。
仿栏是个非常简单的背景技巧，这个技巧最早发表在[A List Apart](http://alistapart.com/article/fauxcolumns) 。思路很简单：不再给每列单独设置背景，而是给各列的父元素设置一个背景图。所有栏的设计都包含在这张图片之中。

(2) **文本替换**
在网页上，对于字体的选择是相当有限的。可以使用 sIFR 之类的工具来定制字体，但是这需要用户启用 JavaScript 。一个适用于任意浏览器的简单方法是，用想用的字体来做一张文本图片，并用这张图片作为背景。这样，文本依然出现在文档标记中以供搜索引擎检索和屏幕浏览器识别，但是在浏览器中就会显示首选的字体。
例如，HTML 标记可能是这样的：
```html
<h3>Blogroll</h3>
```
假如有一个 200 乘 75 的图片，上面有更好看的字体，就可以用如下方式来替换文本：
```css
h3.blogroll {
width: 200px;
height: 75px; /* So that the element will show the whole image. */
background:url(blogroll-text.jpg) 0 0 no-repeat; /* Sets the background image */
text-indent: -9999px; /* Hides the regular text by moving it 9999 pixels to the left */
}
```

(3) **简单的圆点**
无需列表中的圆点看起来很难看。不用再处理所有不同的 list-style 属性，只需要简单地把他们隐藏并用背景图代替就可以了。因为图片可以随意选择，这些圆点就可以看起来更漂亮。

下面，我们把一个无需列表改造成有圆滑圆点的：
```css
ul {
list-style: none; /* Removes default bullets. */
}

ul li {
padding-left: 40px; /* Indents list items, leaving room for background image on the left. */
background: url(bulletpoint.jpg) 0 0 no-repeat;
}
```


## **CSS3之于Background得些许修改**
CSS3对于background做了一些修改，最明显的一个就是采用设置多背景，不但添加了4个新属性，并且还对目前的属性进行了调整增强。

**1、多个背景图片**

在css3里面，你可以再一个标签元素里应用多个背景图片。代码类似与css2.0版本的写法，但引用图片之间需用“，”逗号隔开。第一个图片是定位在元素最上面的背景，后面的背景图片依次在它下面显示，如下：
```CSS
background-image: url(top-image.jpg), url(middle-image.jpg), url(bottom-image.jpg);
```

**2、新属性：Background Clip**
此讨论让我们回到文章开始提到的关于背景被border边框遮挡的问题。background-clip的添加让我们完全能够控制背景显示的位置。属性值如下：
>(1)background-clip: border;背景在border边框下开始显示
(2)background-clip: padding;背景在padding下开始显示，而不是border边框下开始
(3)background-clip: content;背景在内容区域下开始显示，而不是border边框下开始或padding下开始。
(4)background-clip: no-clip;默认属性值，类似与background-clip: border;

**3、新属性: Background Origin**
此属性需要与background-position配合使用。你可以用background-position计算定位是从border，padding或content boxes内容区域算起。（类似background-clip）
>(1)background-origin：border;
从border边框位置算起
(2)background-origin：padding;
从padding位置算起
(3)background-origin：content;
从content-box内容区域位置算起；

background-clip和background-origin的不同之处www.CSS3.info网站给做了很好的分析讲解。

**4、新属性：Background  Size**
Background Size属性用来重设你的背景图片。有几个属性值：
>(1)background-size: contain;
缩小背景图片使其适应标签元素（主要是像素方面的比率）
(2)background-size: cover;
让背景图片放大延伸到整个标签元素大小（主要是像素方面的比率）
(3)background-size: 100px 100px;
标明背景图片缩放的尺寸大小
(4)background-size: 50% 100%;
百分比是根据内容标签元素大小，来缩放图片的尺寸大小

你可以去CSS 3 specifications站点看一下简单的案例说明。

**5、新属性：Background Break**
css3里标签元素能被分在不同区域（如：让内联元素span跨多行），background-break属性能够控制背景在不同区域显示。属性值：
>(1)Background-break: continuous;
此属性是默认值，忽视区域之间的间隔空隙（给它们应用图片就好像把它们看成一个区域一样）
(2)Background-break: bounding-box;
重新考虑区域之间的间隔
(3)Background-break: each-box;
对每一个独立的标签区域进行背景的重新划分。

**6、背景颜色的调整**
background-color属性在css3版本里面稍微做了增强，除了指定background color背景颜色之外，还可以对不使用的标签元素背景图片进行去色处理。

background-color: green / blue;此例子里，这背景颜色可能是绿色，然而，如果底部背景图片无效的话，蓝色将代替绿色来显示。如果你没有指定某个颜色的话，它将其视为透明。

**7、背景重复的调整**
css2里当设置背景的时候，它经常被标签元素截取而显示不全，css3介绍了2个新属性来修复此问题。
space：图片以相同的间距平铺且填充整个标签元素
round：图片自动缩放直到适应且填充整个标签元素
CSS 3 specifications网站对background-repeat: space的使用就是一个现成的例子。

**8、Background Attachment 的调整**
Background Attachment有了一个新属性值:local,当标签元素滚动时它才有效(如设置overflow:scroll;)，当background-attachment设置为scroll时，背景图片是不随内容滚条滚动的。现在，有了background-attachment:local，就可以做到让背景随元素内容滚动而滚动了。

## **Background之让背景图片拉伸填充避免重复显示**
如何让背景图片拉伸填充，这个问题听起来似乎很简单。但是很遗憾的告诉大家。不是我们想的那么简单。
比如一个容器（body,div,span）中设定一个背景。这个背景的长宽值在css2.1之前是不能被修改的。
所以实际的结果是只能重复显示，所以出现了repeat,repeat-x,repeat-y,no-repeat这些属性。就是用来控制背景图片的显示的。所以一般用作背景图片的有2类：
1. 是一整张大图，尺寸和区域大小刚好吻合
2. 一个很小的条状图，通过repeat后，形成一个很规则的大图背景。

但是css3出现以后，这个情况被改善了。background-size 属性可以让我们之前的希望成真。
而且这个属性在firefox，chrome，以及ie9上都可以使用。

具体使用方法如下：背景图尺寸（***数值表示方式***）：
```css
#background-size{
    background-size:200px 100px;
}
```
　　
背景图尺寸（***百分比表示方式***）：
```css
#background-size2{
    background-size:30% 60%;
}
```
可以利用这个属性来获取一张图片的部分区域；比如下面这张图片：
![](http://www.jeffjade.com/img/other/player.png)
可以利用其background-size属性，加上background-position（是用于定位图片作为背景时，显示在对象位置，其值有2个，两个值分别代表意义不同，前者值是水平方向定位，后者值是垂直竖向定位。其两者都可以为正，可以为负，也可以使用固定几个英文单词（left、right、center、top、bottom）进行定位背景图片。）属性，设置合适的值就能“获取”对应的区域。
``` css
.example{
    width: 90%;
    height: 46%;
}
.example>li>div {
    width: 26%;
    background: url(player.png) no-repeat 0 0;
    background-size: 300% 100%;
    position: absolute;
}
.example>li:nth-child(2)>div {
    background-position: 50% 0; /*得到中间部分*/
}

.example>li:nth-child(3)>div {
    background-position: 100% 0;/*得到最后部分*/
}
```

背景图尺寸（***等比扩展图片来填满元素，即cover值***）：
```css
#background-size3{
    background-size:cover;
}
```
　　
背景图尺寸（***等比缩小图片来适应元素的尺寸，即contain值***）：
这个属性在遇到使用非矩形image(非透明部分不规则)填充元素时候很有用。
```
#background-size4{
    background-size:contain;
}
```

背景图尺寸（***以图片自身大小来填充元素，即auto值***）：
```css
#background-size5{
    background-size:auto;
}
```

参考文章：http://paranimage.com/css-background-attribute/
参考原文：http://www.smashingmagazine.com/2009/09/02/backgrounds-in-css-everything-you-need-to-know/
参考文章：http://www.daqianduan.com/3302.html
