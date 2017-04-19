title: Vue 各类数据绑定
date: 2016-09-16 18:30
categories: Front-End
tags:
- Vue
- JavaScript
description: Demonstrate Using Data Binding Syntax；演示运用Vue数据绑定语法。
iscopy: false
---

『天下武功，唯快不破』√，这一直是对武学造诣方面的追捧，虽然对于这个丝毫不会；更是对待现实工作不懈渴求，乃至苛求。因为这已不是遁隐修行，而是职场卖命，唯有先快速解决需求，方能攫取更为充盈的时间去深究技术机理，以使臻于更强，更强而优于快，如此优良循环得以形成。言归正传，作为前端ER，一度觉得，这 `Vue` 的诞生，好比一柄倚天利器，其易上手，写以及运行也都很高效，十分让人爱不释手；但这易上手，倒不等于容易精通，蛮多东西都需悉心学习、练习、理解，才能运用自如。

<!-- more -->

![Vue.js剧照](http://7xoosr.com1.z0.glb.clouddn.com/vuejs.jpg)

在使用`Vue`开发过程中，那基于`Dom`实现的模版，总是无可避免的要遇到，也是一个令人欣喜的存在。Vue.js 模板不仅都是可解析的有效的 HTML，且通过一些特殊的特性做了增强，这使得很多先行，需要借助`jQuery`等类库在逻辑中操纵的部分，已然可以在模版中进行，不得不说这使得一定程度上，Dom结构变的更加清晰明了。因此，这部分如果用运得当，对于 Vue 组件化编写大有裨益；虽然说 Vue官方已经有很完善的文档～[数据绑定语法](https://vuejs.org.cn/guide/syntax.html#)，但依然还是可以对这块儿再进行探讨，毕竟Vue数据绑定，其实际功能比目测的文档中描述更为强大。

>**微注：** 本博客也基于 *Hexo* 驱动，其目测不支持多个大括号渲染，所以这里只好暂时先用`\`做下转义了。另外，为了方便电脑端阅读，自此有对网页加入 `Enter` 键监听，用以切换 show / hide 侧边栏。

在文档中，我们可以轻易的知道，Vue 为数据，Class, Style，表单控件的绑定；属性的计算，条件、列表渲染；方法、事件处理等等等提供了诸多便捷的方法；所以我们可以很简洁的写出模版，例如这样的；

```
<span>Bindind Message Using Mustache（双大括号）: {{ msg }}</span>
<span>This will never change(mustache with *): {\{* msg }\}</span>
<div>Bing htmlText using three Mustache label Like This : {\{\{ htmlText }\}\}</div>
<div id="item-{\{ id }\}">Html Attributes Using Mustache</div>
<div>{\{ message.split('').reverse().join('') }\}</div>
<div class="{\{ className }\}">Binding class using Mustache Label</div>
```

谈及这数据的绑定就涉及到好几种符号®，比如：Mustache 语法标签的`{\{ }\}`,三Mustache标签，引号(单双)，括号`()`，对象`{}`，甚至数组`[]`；初始用起来，挺容易使人迷惑的，如果没认真读文档的话；用了蛮久之后，回过头再读文档，有以下感悟，如有不准确处，请慷慨予以指正：

>1. 三Mustache标签，是用来将传来数据解析成HTML的，用以更新元素的 innerHTML，这个很清晰明了；也很常用；在内部，它会被编译为锚节点上的一个 v-html 指令。
2. Mustache之`{\{}\}`,是要将数据解析为纯文本，用以更新元素的 textContent，这个用的最多且广；在内部，它被编译为 textNode 的一个 v-text 指令。
3. `引号`(包括单双)，这是 Vue 可来承载字符串，用来映射对应实例中定义的各类对象(
Number，布尔值，字符串，数据，对象等等)和方法；也用来解析特定语法：譬如: v-for="item in items"；还能支持部分简单的表达式：v-if="Math.random() > 0.5"; 当涉及有多层引号之时，就得不同引号相互套用，一般采用双引号套单引号；比如 ：`<div :style="{ fontSize: fontSize + 'px' }"></div>`；
4. 括号`()`，这个用到的地方，比如`v-for="(index, item) in items"`，再比如： `<a href="#" @click="onXXClick(param)"></a>` 之类的；
5. 当涉及到解析`class`,`style`时候，本来这类属性是html自带本来就需具有引号，所以要用 Mustache 来绑定的话，就是这样：`class="xx-{\{ className }\}`；
6. 对于上一条，Vue 温馨的考量到字符串拼接麻烦又易错，所以对于`class` 和 `style`的绑定，除了支持字符串外，还额外增强使其能支持对象或数组，所以就可以有以下用法：

```
<div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
<div v-bind:class="[classA, classB]">
```

以上这写几点，有使用 **jsfiddle** 做一小 Demo 予以说明，这也是对部分特殊写法的一个小记录；其中有提到这样的写法：
```
<div :style="{'width': `${100 / this.count}%`}">Text Desc</div>
```

这样的动态写法虽然看起来不是很优雅，用起来也不是很方便，但不失为一种用法，这其中也运用了 Es6 语法；然而这种写法使用用起来，还是挺使得人很是沮丧的，即便用了 babel 转化，某些时候却不能得到正确的解析，Vue 给出了如下警告：

>Invalid expression. Generated function body:  {'width':`scope.${100/this.count}%`}

如此写时OKay时挂掉，这部分至今还是没能搞明白，列于此处，也是提醒自己要多多深入探究下vue；另外，Vue 在解析表达式方面，也有很需要注意的地方(不支持正则)，作者予以提供了 computed property；所以也是建议，涉及 Style 的动态部分，还是用函数解决，写在 templete 中，即便可以，却也导致其样式结构看起来错综复杂。

<script async src="//jsfiddle.net/jeffjade/Lve74763/50/embed/js,html,css,result/dark/"></script>


当然，大多情形之下，并不是很肯定将各种 class, style 的操纵，放置于**Template**中，即便使用`jade`等一些模版语言辅助，也会使得整个 Dom 结构看起来，没那么清晰明朗，能方便切类予以实现的，最好用这种方式，毕竟简洁才美。但，总有些略为复杂的需求，相比于在逻辑中去循环遍历，以操弄 Dom 来动态改变，那么在模版中去操纵 style 反而显得会更优雅；我们已经知道，Mustache语法，可以解析表达式；表达式中可以以 String 来映射对象，数组，想必也可以对应调用其实例中的方法，试一试？

<script async src="//jsfiddle.net/ozbg045w/50/embed/js,html,css,result/dark/"></script>

如上例所示，果然，Vue 真是贴心；记得上次做某个看似颇有些复杂的需求，试用此法，将判断逻辑固定 `methods`中，免去了再次遍历的无奈，很是优雅的解决问题。这岂能不令人欢喜？更何况，Vue 还提供了其它若干十分人性化的处理方案，譬如：
```
<a href="javascript:;" @click="onXxxClick(param)"></a>
<!-- 阻止单击事件冒泡 -->
<a @click.stop="doThisFunc"></a>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat">

<div slider(@mouseover="pause && pausePlay()", @mouseout="pause && goPlay()"></div>)
<input v-on:keyup.13="submitFuncName">
<input v-on:keyup.enter="submitFuncName"> //为最常用的按键提供别名

<!-- 用 v-model 指令在表单控件元素上创建双向数据绑定 -->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{\{ checked }\}</label>

<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model="msg" lazy>
```

关于 Vue，文档写的再清楚没有了，所以也没有额外啰嗦的必要。但，使用之时毕竟还牵扯到很多插件、库、组件等，涉及诸多不同的机制，对于不是很熟悉的部分，偶尔会陷入一些麻烦；为此也会偶尔将遇到的这些问题，做下整理记录在 [Vue 常见问题解决方案记录](http://nicejade.github.io/2016/09/14/solve-vue-common-problems.html)。

很久很久以前，荀子《劝学》中有言道：**君子生非异也 善假于物也**，纵隔千年万载，大有其理。在前端行走的这大半年，十二分感谢有 `Vue` 这般的器具存在，使得总产生一种感觉，有这利器存在，任何需求插来都不虚。据**学以致用******的道理，那么就先言及于此，其余的比如源码什么的，需要时候再学再纪录。谈到这**善假于物也**，在使用`Vue`伊始，基本都是自己个儿亲手搭建`vue`项目，编写常用组件，以及做`Webpack`、`Gulp`等配置；近期琐事儿繁忙，也就多去假于物了；这其中用了不少组件或者库，用来甚是趁手，安利如下：
>1. [vue-cli](https://github.com/vuejs/vue-cli): A simple CLI for scaffolding Vue.js projects. Webpack, Eslint 等都配置完善，大感贴心(不熟悉 Eslint的话初始使用起来还是颇为麻烦，长远来看，必备管家)。
>2. [vue-router](https://github.com/vuejs/vue-router):  is the official router for Vue.js，强大易用，项目必备。
>3. [vue-resource](https://github.com/vuejs/vue-resource): 使用 XMLHttpRequest or JSONP 处理web请求及响应；在最新项目中已用它来取代原先使用的 Jquery-Ajax, 颇为好用，用起来却也得仔细；
>4. [vuex](https://github.com/vuejs/vuex): Centralized State Management for Vue.js.
>5. [vue-tables](https://github.com/matfish2/vue-tables): 十分强大简洁的 vue 表格组件(兼容Client Or 在线数据)，配备 Bootstrap UI样式，支持自定义多种功能，用来趁手，喜之不尽；
>6. [vue-slider](https://github.com/qusiba/vue-slider): Vue 的图片轮播组件 (a vue slider component)，可以直接使用，支持配置；虽不完善，却也蛮受用。
>7. [vue-syntax-highlight](https://github.com/vuejs/vue-syntax-highlight): Sublime Text syntax highlighting for single-file Vue components.

Last Modify ： 2016-09

### **猜你喜欢(/对你有用)的文章**

[如何写一手漂亮的 Vue](http://jeffjade.com/2017/03/11/120-how-to-write-vue-better/)
[所历前端“姿势”更替记(其一)](http://jeffjade.com/2016/05/14/106-front-end-learning-record/)
[Vue ES6 Jade Scss Webpack Gulp](http://jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/)
[Vue Webpack 组件化开发实践](http://jeffjade.com/2016/07/06/110-vue-webpack-component-develop/)
