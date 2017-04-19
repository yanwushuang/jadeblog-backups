title: 博客引入漂亮字体二三事
date: 2015-10-28 21:00
categories: Front-End
tags:
- Toss
- CSS
---

最近兴致上来，就想更换了那Blog标题字体(汉字的)；网上搜索了一番，发现`蘇新詩柳繁體`这款甚合我心；然后就着手搞将了起来，分分钟也算是替换了；但，这仅仅是此次折腾的开始；这就细细道来作为学习笔记记载。

![](http://www.jeffjade.com/img/toss/blogTitleStyle.png)

<!-- more -->

## **CSS3 @font-face**
当然要使用自定义字体，就得借助下@font-face：CSS3中的一个模块，他主要是把自己定义的Web字体嵌入到你的网页中；@font-face的语法规则如下：
```css
 @font-face {
      font-family: <YourWebFontName>;
      src: <source> [<format>][,<source> [<format>]]*;
      [font-weight: <weight>];
      [font-style: <style>];
    }
```
**其取值说明：**
1. YourWebFontName:此值指的就是你自定义的字体名称，最好是使用你下载的默认字体，他将被引用到你的Web元素中的font-family。如“font-family:"YourWebFontName";”

2. source:此值指的是你自定义的字体的存放路径，可以是相对路径也可以是绝路径；

3. format：此值指的是你自定义的字体的格式，主要用来帮助浏览器识别，其值主要有以下几种类型：truetype,opentype,truetype-aat,embedded-opentype,avg等；

4. weight和style:这两个值大家一定很熟悉，weight定义字体是否为粗体，style主要定义字体样式，如斜体。

在@font-face网络字体技术之前，浏览器显示网页上文字使用的字体只能限制在电脑里已经安装的几款字体里。而且每个人的电脑里安装的字体是因人而异的。@font-face的作用是从网上下载并使用自定义字体，使页面显示字体不依赖用户的操作系统字体环境。

好吧，这里涉及到一个字体format的问题，因为不同的浏览器对字体格式支持是不一致的。使用CSS3自定义字体的时候，为了兼容所有浏览器，服务器需要输出4种格式的字体，分别是eot、svg、ttf和woff。所以，若要尽量更全的支持不同浏览器，那么这里就得这样搞了：
```css
@font-face {
    font-family: ‘MyFontFamily’;
    src: url(‘myfont-webfont.eot?#iefix’) format(‘embedded-opentype’),
         url(‘myfont-webfont.woff’) format(‘woff’),
         url(‘myfont-webfont.ttf’)  format(‘truetype’),
         url(‘myfont-webfont.svg#svgFontName’) format(‘svg’);
}
```
使用@font-face只是申明&定义了一种字体；使用时还是得根据*font-family*特性加入些默认字体以留后路。即便如此，之后也会有些问题。W3C中描述如下：
>**font-family**： **规定元素的字体系列**。可以把多个字体名称作为一个“回退”系统来保存。如果浏览器不支持第一个字体，则会尝试下一个。也就是说，font-family 属性的值是用于某个元素的字体族名称或/及类族名称的一个优先表。浏览器会使用它可识别的第一个值。
**注意**：使用某种特定的字体系列（Geneva）完全取决于用户机器上该字体系列是否可用；这个属性没有指示任何字体下载。因此，强烈推荐使用一个通用字体系列名作为后路。

## **网络字体(Web font)文件格式**
**WOFF**：Web Open Font Format
这种字体格式专门用于网上，由Mozilla联合其它几大组织共同开发。WOFF字体通常比其它字体加载的要快些，因为使用了OpenType (OTF)和TrueType (TTF)字体里的存储结构和压缩算法。这种字体格式还可以加入元信息和授权信息。这种字体格式有君临天下的趋势，因为所有的现代浏览器都开始支持这种字体格式。

支持这种字体的浏览器有【IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】；

**SVG / SVGZ**：Scalable Vector Graphics (Font).
SVG是一种用矢量图格式改进的字体格式，体积上比矢量图更小，适合在手机设备上使用。只有iPhone上的Safari(4.1)之前的版本支持它。目前火狐、IE都不支持SVG字体格式。火狐推迟对SVG字体的支持，重点放在WOFF格式上。SVGZ是压缩版的SVG。

支持这种字体的浏览器有【Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】。

**OTF / TTF**：OpenType Font 和 TrueTypeFont。
.ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，因此他不为网站优化。部分的因为这种格式容易被复制(非法的)，这才催生了WOFF字体格式。然而，OpenType有很多独特的地方，受到很多设计者的喜爱。

【IE9+,Firefox3.5+,Chrome4+,Safari3+,Opera10+,iOS Mobile Safari4.2+】；

**EOT**：Embedded Open Type。
这是微软创造的字体格式(是微软在15年前发明了网络字体@font-face)。这种格式只在IE6/IE8里使用。

.woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本。即：最起码要支持下这种格式吧。而网上下载的只有.ttf;所以就开始了字体格式转换。

## **获取@font-face所需字体格式**
这个阶段折腾的老久了。毕竟是汉字的，网络上搜索的一些在线工具尝试了不少，很好工作的却也不多。
最后在这个网站<https://onlinefontconverter.com/>,得到了.woff 和 .svg格式的转换。[Here](http://www.jucelin.cn/archiver/view.asp?id=153)有介绍。

这里插说一段，在即将放弃的时候，发现了这个网站<http://www.fontsquirrel.com/tools/webfont-generator>;国外的人士，做事就是认真，一键上传我的.tff格式的字体，它就可以帮助生成对应的4种格式外加.woff2;并且给出CSS以及对应的Demo实例(使用的是 **OPTIMAL**模式)。而且文件还相当的小（5种格式字体加起来就有不到150KB）。惊喜之余，不太相信，一经测试，果然，将汉字给过滤掉了。使**用BASIC模式**确实可以不破坏内容的生成各种格式字体，但难免的，也很大(.woff格式3528KB)。不过，对于英文的转换，还是相当可取的。如何使用?可[ClickHere](http://www.w3cplus.com/content/css3-font-face)查看。

搞到此处，于大部分浏览器，渲染出`蘇新詩柳繁體`的标题，是没问题了。即便在Chrome浏览器上一开始是字体未显示，到被默认字体替代了，加载完毕后才重新以`蘇新詩柳繁體`渲染出来；而Safari则是，从不显示直到加载完毕才渲染出来。手机上能够渲染出来需要的时间就更长了(Android由空白到请求完成后渲染)。(*@ο@*) 哇～，如此体验着实好*啊。
导致这种现象，必然是各大浏览器渲染时存在的差异所致；@w3ctech[在响应式网站中，提升加载webfonts的性能](http://www.w3ctech.com/topic/693)一文中有过详尽的叙述：
>A. 如果请求字体还不可用，IE 会立即使用后备字体呈现，并在字体下载完成之后马上重新呈现；
B. Firefox 和 Chrome 35+ 会首先下载3秒钟的字体，如果超过3秒钟后，会使用后备字体渲染网页，等到指定字体下载完成后再重新渲染网页；
C. Safari 和 Chrome 35之前的版本，会等到指定字体下载完成后再渲染网页（PS：就是不会使用后备字体）。
>>**注：**以上说明中没有表示IE的版本以及Safari的版本号，所以需要自己测试才能算正确。
因此，如果网络连接缓慢，在大多数浏览器中将延迟超过3秒的文本渲染。在最坏的情况下，如果你的字体加载带有时间限制（由于一些连接很慢的移动设备），Safari 用户将不会再展示文本，剩下一个空白网页。如果网页请求超时，最终将只会呈现一个空白网页。

毕竟用的是较全汉字繁体： .ttf格式5735KB;.woff格式3534KB,.svg格式竟然11622KB,有点醉了，555。根据@张鑫旭这篇[fontforge制作自定义字体及在手机上应用举例][zxx]文中提到的，可以采取软件(Eg:fontforge)提取出自己想要的部分,从而减小字体文件的大小，来增强体验；但是我这边是汉字，折腾起来不容易啊，555。如此，就牵扯到了：网络字体(Web font)的效率问题了。

## **网络字体(Web font)的效率**
字体文件的体积可能非常的大(尤其是对于汉字)，而且需要额外的HTTP连接，这些都会降低网站页面的加载速度。所以，在使用网络字体@font-face前，根据网络上的说法：需要清楚它的利与弊，判断网络字体是否真的有必要用在你的网站页面上。

>如果你决定使用个性化自定义字体，可以采用一个非常灵活的方法，就是只加载尽量少的字体字符数和尽量少的字体风格(粗体/斜体)。例如，如果你使用谷歌字体，你可以只加载指定的字体风格组合：
```css
@import url(http://fonts.googleapis.com/css?family=Averia+Sans+Libre:400,300italic,700);
```

以下是@[Airen的博客][Airen]对于使用@font-face的写于提醒：
>1. 如果你的项目中是英文网站，而且项目中的Logo，Tags等应用到较多的这种特殊字体效果，我建议你不要使用图片效果，而使用@font-face，但是你是中文网站，我觉得还是使用图片比较合适，因为加载英文字体和图片没有多大区别，但是你加载中文字体，那就不一样了，因为中文字体太大了，这样会影响到项目的某些性能的优化；
2. 致命的错误，你在@font-face中定义时，文件路径没有载对；
3. 你只定义了@font-face，但并没有应用到你的项目中的DOM元素上；

就目前我的需求而言，Blog用到这字体，仅是在于标题那5个汉字而已。如不能优化至流畅之境，倒不如采用加载经过Ps处理的图片呢;毕竟之于体验和炫酷间抉择，还是前者更为重要些。然，还是得为此探究一番，万一已经好的解决办法了呢？一查，果真有!喜不自胜。

## **base64编码字体，自定义你的网站字体！**
CSS3给我们带来了@font-face,网页中可以展现的字体就不局限于电脑中已安装的几款字体。@font-face的作用是从网上下载并使用自定义字体，使页面显示字体不依赖用户的操作系统字体环境。

然而：字体文件的体积一般都比较大，而且需要额外的http请求连接，而且需要兼容多种浏览器的话，往往需要三四个或者更多格式的字体文件。尤其是汉字字体文件；于是乎就有了，WebFont (Web Open Font Format)这个技术，极大滴有针对性的压缩了字体文件的体积，压缩了体积就解决了个大问题，很实用。WebFont的字体转换成base64编码，直接放在样式表里面，哇哦，完美。要实现这个，首先我们得**生成下载需要的字体**;毕竟，整个汉字库辣(那)么大，即便生成base64，其体积也不小哇。

### **生成下载需要的字体**
先设置我们要使用的文字，使用WebFont，推荐阿里妈妈WebFont平台<http://www.iconfont.cn/webfont/#!/webfont/index>和有字库<http://www.youziku.com/>，使用简单粗暴，输入你要的文字，下载就完了，代码都给你生成好了。
```css
@font-face {font-family: 'webfont';
  src: url('//at.alicdn.com/t/glgkzeyrgbonu3di.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/glgkzeyrgbonu3di.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/glgkzeyrgbonu3di.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/glgkzeyrgbonu3di.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/glgkzeyrgbonu3di.svg#NotoSansHans-Black') format('svg'); /* iOS 4.1- */
}
```
ctrl+c ctrl+v 就解决了需求，在需要的地方使用即可（这里可以直接使用它给你生成的在线字体woff格式等文件【只有你输入的那些汉字喔】），兼容至BT的IE6，简直碉堡。但，好吧，世间没有那么完美的事儿喔。`阿里妈妈webfont`平台只有思源系的5种不同字体而已，哭晕，没有我倾爱的`蘇新詩柳`啊。

### **base64编码字体**
经过譬如上面操作，得到字体文件之后，即可运用一些软件（譬如<http://www.giftofspeed.com/base64-encoder/>编码之，使之生成base64编码string。**使用：**把处理好了的base64编码放在下面代码中(直接替代xxxxx即可)，然后调用`webfont-base`这个定义好的字体，大功告成！

```CSS
@font-face {
    font-family: 'webfont-base';
    src: url(data:font/truetype;charset=utf-8;base64,XXXXXXXXXXXXXXXXX) format('truetype');
    font-weight: normal;
    font-style: normal
}
```

额，好吧，使用这个网站生成的base64也是奇葩的－－有很多空格换行，base64文件蛮大的话，就需要想点办法予以处理下才好。

<p data-height="268" data-theme-id="20035" data-slug-hash="MaQOOM" data-default-tab="result" data-user="jeffjade" class='codepen'>See the Pen <a href='http://codepen.io/jeffjade/pen/MaQOOM/'>MaQOOM</a> by jeffjade (<a href='http://codepen.io/jeffjade'>@jeffjade</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### **字体文件加载优化**
之前已经探明，可以使用字体base64编码信息的CSS字体文件，来替代请求woff格式字体下载；但该CSS文件的大小取决于你选择的字符集合以及相关方面，也许该文件相当的大（最高可达100~300KB）。因此，使用gzip压缩以及设置强缓存的方式对于用户来说是很重要的。

不过幸运的是只有当你网页的浏览者第一次访问该CSS文件的时候会发出请求。由于在第一次的时候，用户本地没有该字体文件，所以浏览器就会去异步加载他们，并且存储在localStorage中。当用户的网络环境较慢的情况下，能够看到后备字体以及webfonts渲染过程，不过这些只会发生在用户第一次访问你网页的时候。大多数用户不会太在意这一细节。

当用户第二次网页页面的时候，浏览器将从localStorage中加载CSS文件内容，这种方式相当的快速（5~50ms）。在这种情况下用户看不到任何的闪烁，因为所有的操作将是同步进行的，这仅仅只需要几毫秒的时间。具体可参见@[在响应式网站中，提升加载webfonts的性能](http://www.w3ctech.com/topic/693)一文所书。

__体验至上，优化不止，且学且究，渐探渐优。__

---

写在最后，纵使有阿里妈妈这样的平台，但其所针对的汉字字体也太有限。最后还是以图片形式呈现出`蘇新詩柳`字体的标题(这里采用艺术字体在线转换[Qt86](http://www.qt86.com/)生成，可惜这个生成的仅是图片，若能成就base64编码，就太棒了。不过它所提供的字体三百余种，可谓丰富)；此处待之后有合适的法子，再继续折腾(Update: 15-11-16)。


---
参考文章链接：
[@font-face的用法](http://www.webhek.com/font-face)
[Font-face 字体文件格式](http://guoshuang.com/css/font-face-type/)
[CSS3 @font-face](http://www.w3cplus.com/content/css3-font-face)
[base64编码字体，自定义你的网站字体！](http://www.lccky.com/166.html)
[在响应式网站中，提升加载webfonts的性能](http://www.w3ctech.com/topic/693)


[Airen]: http://www.w3cplus.com/content/css3-font-face
[zxx]: http://www.zhangxinxu.com/wordpress/2011/11/fontforge%e8%87%aa%e5%ae%9a%e4%b9%89%e6%89%8b%e6%9c%ba%e5%ad%97%e4%bd%93/
