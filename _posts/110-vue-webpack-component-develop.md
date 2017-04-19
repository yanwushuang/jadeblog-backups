title: Vue Webpack 组件化开发实践 
date: 2016-07-06 15:30
categories: Front-End
tags: 
- Vue
- Webpack
description: 分享 Vue Webpack 组件化开发实践
keywords: Vue Webpack Gulp Jade Sass Github 效率 
---

两千年余前，子贡问为仁，子曰：“**工欲善其事，必先利其器**。居是邦也。事其大夫之贤者，友其士之仁者”——语出《论语·卫灵公》。时隔这许久，欲问从业者，何以堪高效之为事，有时以把妹（/泡哥）？也无非这十字而已，倘若体会得真切，U Get It。人们总是低估工具对自己心智模式的影响，请记住，**好工具是好思想的容器；好工具也会蕴含好知识**；对于从业纷繁杂乱前端的我等而言，这一点尤显重要；而 **Vue**、**Webpack** 在如今这时节，它所能带给你的，超乎你的想象。

<!-- more -->

![vue-common-components](http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg)

聊及这 vue, gulp, webpack，网络上已是充盈着对她们的溢美之词；笔者很是钟爱这`vue`，除过她简单易学，文档完善，对`Angular` `React`取长去短等等之外；更在于她双向数据绑定，数据驱动视图，如此沉重`jQuery`在不那么复杂的 SPA 中完全可以予以摒除；最兴奋的是户界面完全可以用嵌套的组件树来描述，再也不用写重复代码or拷贝(如果撸好组件封装)，生活原来可以如此美好，这是我不得不欢喜非常。而且，她渲染极快；实现了<span style='color:purple'>scoped</span>，防止组件样式污染；error/warn信息完善，易于调试；轮子丰富（vue-router、vue-loader...）功能强悍，基于依赖收集的观测机制，高效精准...... 在不就之后就要发布的 **[vue2.0](https://github.com/vuejs/vue/wiki/2.0-features)**，将更轻，更快! Virtual-DOM？Templates, JSX, or Hyperscript? 组件缓存？.....擦，好多东西需要学习！哇，好多好东西可以运用！痛并幸福着，生活就是这样。


先前在 [Vue ES6 Jade Scss Webpack Gulp](http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/#) 和 [所历前端“姿势”更替记(其一)](http://www.jeffjade.com/2016/05/14/106-front-end-learning-record/) 两篇杂言中，分别叙述了如今撸起 SPA 的姿势即：**Vue**、**ES6** 、**Jade** 、**Scss**、**Webpack**等一套组合，以及所经历的姿势变换历程；这 **Vue** 的使用确立了前端之路新的里程碑；而 `Gulp`，`Webpack` 的学习更使得对**工具**有了新的认识——只有你想不到，没有做不到。此一篇絮叨，是对过去 **Vue** + **Webpack** 组件化开发实践的一些总结和分享。

谈及分享这个，倒是很倾向信奉`Linus Torvalds`那句名言：**Talk is cheap show me the code**；所以有将所写的常用组件，有忝享于 Github，地址如是： [https://github.com/nicejade/vue-common-components](https://github.com/nicejade/vue-common-components)。伊始有用 `gitbook` 对如何使用这组件以作说明；后来鉴于仅仅说明不够明晰周到，干脆用 Vue 来实现一 SPA 专门承载组件 demo 以及 description，这能直观的了解组件用途以及表现，所以就有了 [Vue Component Desc And Demo](http://nicejade.github.io/jade/vue-jade-components-demo.html#/)，其模样大致如下图：

![vue-common-components-demo](http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components-demo.jpg)

对于组件的封装，因项目需求的差异，而各不相同；因此，这份尚在路上的组件库，并不是界定在工作生产环境予以作用，这也非分享的初衷（当然，如果需要这其中部分组件，直接拿来用未尝不可）。首先，可以用它作为 `vue` `webpack` `es6` `sass` `jade`等入坑参考，借机体验这些联合来塑造出的`组件化`开发，或多或少会有所获。其次，也可以基于此对 `vue` 开发前端项目，做更为深入细节探讨；譬如组件设计，热加载，路由以及 vue2.0 那别致的 Virtual-DOM 等等。其更重要的在于，分享一种思维，为前端者，应该更多(\*N)去学习去折腾，打造一套适宜的完善机制，优化开发工作流，提升开发速度；要知道只有在完成需求的基础前提下，才有时间去优化体验and学习更多；**天下武功，唯快不破**，这话不假！

上述言论，还有些补充；对于 `vue` 入门，这是一件非常容易的事儿；但到现实协作中开发，诸多东西都是挺需要探讨一番的；譬如使用 `vue-resource` 来替代 `JQuery-Ajax`；再比如 `vue` 虽然为组件style实现了<span style='color:purple'>scoped</span>，但这也存在局限(Eg: 如果 A 组件包含了 B 组件，A 的 scoped css 就不应该试图定义 B 组件内部的元素样式，这不能很好的工作)；如此，解决 css 命名污染，`CSS Modules`(可参见[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)） 看起来是一个挺不错的解决办法，这就使得可以继续实践探讨的方向和必要。其次要谈及的是对工作流的设计，懒为要决，善用具器；这在[vue-common-components](https://github.com/nicejade/vue-common-components)，有些许推荐，也在持续探讨学习之中。

学习“知识”与“工具”，都理应重视，可须有重前忽后的道理？话说，计算机(抑或说知识)本身，即为工具。而这计算机所能认知的也就0和1(谁让流行起来的是双级管嘞)，其上所衍生出的打孔，汇编，C，Java，Javascript 也都是计算机语言(不也是工具？)；而前端所当需的JavaScript, Html5, Css 也好，流行的框架 `React` `Vue` 也罢，还是协助高效工作的工具诸如 `Gulp` `Webpack` `Sublime Text` `Atom`，理当学习，用之以精；争得时间，方有更多实践；何谓**技术**？不就是驾驭各种工具来解决实际问题的能力么？

加班学习&折腾，让明天更加高效；还是加班搞需求，让明天后天继续加班到更晚？如何抉择，这无关乎谁对谁错，`这只是你的选择`；请记住，**好工具是好思想的容器；好工具也会蕴含好知识**。

Last Modify: @2016-07-06

>原文出处: [http://www.jeffjade.com](http://www.jeffjade.com)
>原文链接: [http://www.jeffjade.com/2016/07/06/110-vue-webpack-component-develop/#](http://www.jeffjade.com/2016/07/06/110-vue-webpack-component-develop/#)

---

**猜你喜欢（/有用）**

对您可能有用(/感兴趣)的文章：
* [那些所倚靠的利器记载](http://www.jeffjade.com/2016/03/17/2016-03-17-jade-tools/)
* [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)
* [sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [新编码神器Atom使用纪要](http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/)
* [Win下最爱效率神器:AutoHotKey](http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/)
* [Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)
* [Win下必备神器之Cmder](http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/)
* [Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)
