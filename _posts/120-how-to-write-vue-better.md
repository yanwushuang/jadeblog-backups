title: 如何写一手漂亮的 Vue
date: 2017-03-11 01:10
categories: Front-End
tags:
- Vue
- JavaScript
description: 如何写出更好的Vue(如何使用 Vue 作前端开发)，以提升开发效率；
keywords: Vue, Webpack, Npm, Yarn, MVVM, ES6, Gulp, SublimeText, Atom
---

前几日听到一句生猛与激励并存，可怕与尴尬同在，最无奈也无解的话：“90后，你的中年危机已经杀到”。这令我很受触动。显然，这有些夸张了，但就目前这日复一日的庸碌下去，眨眼的功夫，那情形就会在这骨感的现实面前，悄然的被显现。所以，越发体验到，当必要有计划的去做，去写，去玩，去嗨，利用好这荷尔蒙分泌还算旺盛的时光，去厚积去博取，去发现去折腾；让自己的生命不在仅是工作与惆怅，还有时间分与“诗和远方”。不用分析，就知道这该如何去做，高效去完成工作，然后去学着优雅地生而活。目前犹身为前端开发者，且在使用 Vue，那么就有了此文；这不仅是纪录或分享，也是在漫漫之路上下求索，更希望能探讨和指点，以资见识，提升其效——在[晚晴幽草轩](http://jeffjade.com)等着你。

<!-- more -->

![题图来自令人欢喜的500px.com;覓图之时，随感觉择取而已](http://images2015.cnblogs.com/blog/558479/201703/558479-20170311153412029-1971807816.jpg)

>**微注：** 早先在写[如何优雅地使用Sublime Text](http://jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/?f=self)时候，前后历经10月，至今虽不断更新犹在，离该话题也是相去甚远。所以，谈及此一个宽广话题的存在，欲一谈也须深入研究，非朝夕可至；所以本篇将采取不定期更新，当然，这么做，也是治疗自身拖延症之一法子；另外也是限制聚合网抓取的一种尝试。Last Modify: 2017-03-11

**随言**: 身在程序的江湖，如你是一位即将出征武士，对决于浩瀚无尽的需求大军；那么你不仅需要一副好的体格，还需要一身技艺：而这`软件工程学`(抑或加算法)就好比内功（查克拉）；而所使用的`各家语言`，则好如武学招式（独孤九剑？）；那加以利用的各种工具，当如随身利器（小李飞刀？）；那属于自己一套极致开发流程，便是轻功（电光神行步？）......如是斯言，那么作为开发者的你，几技傍身耶？

如上随言，此篇准备从以下几个方面来探讨：

## **如何漂亮使用 Vue 之工具篇**

`欲先利其器，必先利其器`，这是此博客一大倡导；关于如何优雅地去写好 Vue，工具自是首当其冲要提及的，毕竟这非常重要；在你选择使用 Vue 来从事前端开发的那一刻，你已经同意的这一论点：毕竟 Vue 也是用原生 Js 写的，Js 则是用 C 语言写，而 C 又是汇编写的..... 这不再是刀耕火种的年代，而你也未用汇编或 C 来解决你的需求，So，你是同意的。既是赞同的，岂有不用好它的道理？那么来一起探讨下：

1. **外设**：除了那些舒适坐骑与书桌外，`双屏显示器`，`Mac` 则是必备外设装备；你知道，一屏编辑器中写着代码的同时，就能在另一屏 Chrome 下看到表现，这很高效便捷，也令人很是舒服。而 Mac 这[设备中堪称优雅情人](http://jeffjade.com/2015/07/24/2015-07-24-why-programmer-love-mac/)的存在，更是居家良品。倘若，所处的工作环境没那么看重效率，或者未表现出该有的慷慨，则一定须善待自己的精力和时间，勇于将自己的开发环境打造精良；倘若你被在使用 Winodws，不妨读下之前总结的 [Windows下效率必备软件](http://jeffjade.com/2015/10/19/2015-10-18-Efficacious-win-software/?f=jeffajde.com)。

2. **软件**：身为开发人员，你电脑以及其中配备的软件，就好如武士手中的利剑，是助你大杀四方的存在；所以无论是用它来玩一玩恶作剧，还是来致敬把Dota，抑或是搞搞需求，皆十分有必要将其锋利化。因此，诸如 Alfred，Brew，Iterm2，Oh-my-zh，Git等必备就不说了；对于前端开发，编辑器与浏览器的配备与运用，尤其重要（对于这一点很多前端开发者，尚未达到及格，一如其水平）；对于浏览器，只推荐 `Chrome`，不只是浏览或者调试，更在于其搜索。而编辑器则推荐 `SublimeText3` 与 `Atom`；业界有人认为 Vscode 也不错，这有待写篇测评；不推荐使用 WebStorm，因为其除了反人类的操作设计外，感受不到其他可记住点。对于 SublimeText 与 Atom，曾经有写过 [如何优雅地使用Sublime Text](http://jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)，[新编码神器Atom使用纪要](http://jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/)，时至如今，也挺有参考价值。

3. **周边**：使用 Vue 开发开发前端，当须保持对周边工具体系，经常保持关注，比如`Node`，`Npm(Yarn)`，`Webpack`，`Gulp`等，以及`Lodash`，`superagent`，`d3`等工具库，再有就是 Vue 系本身具库，譬如 `Vue-cli`, `vue-router`等辅助；再有就是不断衍生出来的 Vue 插件扩展。[Atwood定律](https://www.zhihu.com/question/20796866)中阐述到：**Any application that can be written in JavaScript, will eventually be written in JavaScript.**(翻译过来即是：凡是能用JavaScript写出来的，最终都会用JavaScript写出来)。这个理论同样适用于 Vue，它简易强大的存在，吸引了很多超厉害的开发者或团队，为其贡献了无数好用的组件库。比如: 饿了么出品的[Element-UI](http://element.eleme.io/#/zh-CN)，还有 [vue-echarts](https://github.com/Justineo/vue-echarts)，[vue-multiselect](https://github.com/monterail/vue-multiselect) ...... 具体可以参看[awesome-vue](https://github.com/vuejs/awesome-vue)，略睹其繁华似锦。

![Vue.js 剧照](http://7xoosr.com1.z0.glb.clouddn.com/vuejs.jpg)

## **如何漂亮使用 Vue 之基础篇**
`软件工程学`，作为程序员，本就该是当学好的一门技艺。像[代码大全2](https://book.douban.com/subject/1477390/)以及[程序整洁之道](https://book.douban.com/subject/5442024/)，一定是需要好好读一读的。Web 前端开发，因其入门的容易性(还有需求的旺盛)，造就了这一行涌进了不少急功近利者，也惊现了很多令人“不堪卒读”的代码。而前端发展日新月异，如不能渐而掌握，长期来看，委屈的倒也不全是别人(读你代码者)，更是自己；举个浅显的例子来讲，如不能学会很好的组织代码结构，即便有高手写了架构，一旦项目渐大，不也是照样面临被自己坑苦的凄楚？事实上，不乏很多开发者，未能养成很好的编码素养，基础如变量方法命名，也是能令人心惊肝颤；很显然这是损人不利己的行为，势必当善之。

对于团队来讲，`Eslint` 实在是需要配备的利器；既然难以保证每个人都很有素养，那么必须适当强制；至少避免了丛生些杂乱不堪的代码，以乱军心。当然，使用伊始，总会有些人不太适应，所以玩转编辑器的重要性，就再次体现出其价值了；由此也引出了自动化(半)工作流的话题了，这在之后的内容中会加以探讨。

`前端基础技术`，从事前端开发，长久之计来看，基本功是非常重要的；尤其是 JavaScript；这在写 Vue 时候，也体现的比较明显。其他如 Html，Css，自然不用说；除此之外，Scss 等预处理器，也是当学习并加以运用，以提升开发效率，节省开发成本；毕竟只有节省出充裕的时间来，才会去做更多优化，节约出更多精力与时间，一个优良的循环就此得以形成。

`Vue 基础`，这一点很重要，熟读[Vue.js 官方教程](http://cn.vuejs.org/v2/guide/)，再没有比这更好的教程了；根据之前经验来看，心急是吃不到热豆腐的，欠下的也终究得还；至少起初需通读之，否则遇到问题，无法及时定位出在哪儿查究，这无疑会浪费更多时间。除此之外，Github 上找一份好的微型项目，认真读下，可以发掘出很多值得学习的玩法。

`善用配置`，《代码大全》第 18 章，讲到**表驱动法**（Table-Driven Methods），对于编程从业者，很有必要一读。很多时候，可借助查询表来加以简化逻辑和继承树关系。这在团队协作，分模块开发模式具有更非凡价值；应该善用配置，将各个模块予以抽离，使得相互间不存强依赖，如此开发环节也大大的避免代码冲突。譬如，了解 JavaScript 特性，即可做如下写法：

```
const files = require.context('.', true, /\.svg$/)

const modules = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.svg)/g, '')] = files(key)
})
export default modules
```

这样即可写出便捷的 [Icon Component](https://github.com/nicejade/jade-blog/blob/master/src/components/Icon/Icon.vue)，使用时只需添加新 Svg 入 assets，然后引用 icon 时填写对应 Svg 名字即可，十分方便；推此及它，我们可借助这样配置，去分解、组合各个模块，甚是方便。

---

>Vue有三大特性，十分令人欣喜；一是其数据的双向绑定，即：通过数据绑定链接View和Model，让数据的变化自动映射为视图的更新。另一个是其数据驱动的组件系统，即：用嵌套的组件树来描述用户界面(而一个组件恰恰可以对应MVVM中的ViewModel)，其三是基于构建工具的单文件组件格式，即其所提供了强大的loader API，来定义对不同文件格式的预处理逻辑，从而让我们可以将CSS、模板，甚至是自定义的文件格式等，当做JavaScript模块来使用，极大提升了代码的可复用性；Webpack 基于loader还可以实现大量高级功能，比如自动分块打包并按需加载、对图片资源引用的自动定位、根据图片大小决定是否用base64内联、开发时的模块热替换等等。当然 Vue 还具有其他若干令人击节赞叹的设计，这些我们可以参见 Vue 作者尤雨溪的文章：[Vue.js：轻量高效的前端组件化方案](http://www.csdn.net/article/2015-08-11/2825439-vue)。

鉴于此，如果可以很熟练的掌握其数据的绑定与传输，组件的开发，以及周边 Webpack 等相关配置，则能将运用水平视为进入了一个新的层次。据以往经验来看，这不是一件容易的事儿，毕竟使用这 Vue 也是冲着解决需求去了，而非在搞研究。谁能说开车上路的司机，能了解关乎车的所有？相信，接下来的很长时间里，都须对这几方面加以学习、探索，然后加以利用。

## **如何漂亮使用 Vue 之实战组件篇**
Vue 一大特色是用嵌套的组件树来描述用户界面。所以组件的设计与编写至关重要；至少要保证她是易于修改和维护，可复用性和可读性高，耦合度低，接纳团队合作性开发... ... 诸此等等。项目一旦庞杂，更得事先考虑好整个架构的设计，使其清晰合理；组件缓存的使用、避免过重组件的衍生 ... 。而 Vue 组件系统又是有数据所驱动，更得兼顾数据在各种组件间通信，避免数据被多方操作，Bug 难以定位等问题。

这是一个须长期积淀的技能，非朝夕可至。但，部分内容只需刻意关注，即可见其成效的。比如，简明且见名知义的命名，良好的编码规范，团队统一编码风格，以保证代码的可读性。运用设计模式原则，比如**单一职责原则**，将组件拆分抽离成更细粒度，保证组件功能单一，以提升组件复用行；再如**接口隔离原则**，采用稳定的服务端接口，将变化模块分离，使得组件得以解耦；在复杂的项目中，也是需要用到冗余、继承，这时候也需要关注下**里氏替换原则**、**依赖倒置原则**... 。另外还当学习 Vue 本身所提供的优化，像[路由懒加载](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html), 即：结合 Vue 的 异步组件 和 Webpack 的 code splitting feature, 轻松实现路由组件的懒加载，使得该组件访问时才加载，以提升页面加载效率，还有利用服务端实现首屏渲染，组件缓存等等，尤须注意的是组件间数据通信，这在之后一节中会提及，此处不做赘述。

这里需要学习探究的点很多，非片言可蔽之，看到一份 PPT [Vue.js实践](https://ppt.baomitu.com/d/52096df3#/): 如何使用Vue2.0开发富交互式WEB应用；个种谈到 Vue 许多相关的点，值得一览。另外，如是为团队写公用组件，一定记得附上对应使用文档，这很重要。你看，如上所说，要写好一手漂亮 Vue(代码)，软件设计学问，是少不了的存在，不是么？（Update @17-03-22）


## **如何漂亮使用 Vue 之实战通信篇**
早先有在[Vue 各类数据绑定](http://jeffjade.com/2016/09/16/112-vue-data-binding/)一文中，对 Vue 数据绑定有过些描述(version 1.\*)；虽然如今 Vue 早已升级至 2.\*，不过数据绑定变化虽多，但大局影响不大，譬如：不再允许片段实例；须以v-html取代三 Mustache 语法；变更 v-for 遍历时参数顺序等等，具体可参见[从 Vue 1.x 迁移](http://cn.vuejs.org/v2/guide/migration.html)。此处就数据在 vue 组件间传递做下探讨。

Vue2 移除 $dispatch() 和 $broadcast()之后，主要通过 `prop`(包括 v-model 自定义) 实现父组件向子组件传参，且只能单向传递；**为了防止对父组件产生反向影响，Vue2 已移除了 .once 和 .sync 修饰符，子组件需要显式地传递一个事件而不是依赖于隐式地双向绑定。** 一旦你试图在组件内，直接修改通过props传入的父组件数据，这将被认为是anti-pattern的，报以下错误：

> <span style="color:#f20c00">Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value.</span>

但，如果传递的 prop 本身是引用型传递，像对象或者数组，由于数据类型自身特性，无论是什么绑定方式都会是双向绑定！这些在[Vue文档－单向数据流](https://cn.vuejs.org/v2/guide/components.html#单向数据流)中有作说明；请看这个例子：

<script async src="//jsfiddle.net/qy75hg8m/7/embed/js,html,css,result/dark/"></script>

这里需要留意的是：Vue 要么监听的是基本数据类型的值变化，要么监听的是引用数据类型的**引用变化**；因此，vue对于数组，才自己封装了一套方法（包括 `$set` , `$remove`），如果直接变更引用类型的内容，即便数据已经修改，但 Vue 是感知不到的，所以视图将不会更新（针对性的对属性进行赋值操作，则会调用其属性的 set 方法，因此Vue会得到感知，从而驱动视图更新）。这里需要补充的是：Vue 使用 Object.defineProperty（ES5特性）将数据转为 getter/setter，从而实现对数据的 `watcher`，`setter`被调用时重新绘制关联的 Dom，从而刷新视图。

所以，对父组件传递来引用型数据，如需更改，最好改动做深度拷贝后的数据，而且需要注意得失，`Object.assign`不是深度拷贝，即便采用了 `Object.freeze()` 去冻结。对于子组件向父组件回传参数，可借助 `$emit`，当然也可以使用 callback Functon，可参见[jsfiddle 示例](http://jsfiddle.net/jeffjade/ydnags5y/)。非父子组件间通信，Vue 有提供 `Vuex`，以状态共享方式来实现同信，对于这一点，应该注意考虑平衡，从整体设计角度去考量，确保引入她的必要。当然，Vue 也提供了 `$refs`，可以跨层调用，或者诸如这样 this.$parent.$parent ；提供了不代表推荐；尽量少的去运用，除非逼不得已，或者去恶作剧坑人。当然，也可借助原生Api *sessionStorage*, *localStorage* 等等进行数据存储，以到达通信目的；对于，兼顾得失，争取扁平统一化通信方式就好。鉴于篇幅，就不多赘述。

## **如何漂亮使用 Vue 之Webpack篇**
前文提到，推荐使用`Vue-cli`，它已然帮助我们贴心的配置好了 `Webpack` 相关。在编写 router 配置之时，可以轻松实现路由组件的懒加载，使得项目可以拆分成若干个 js 小包，和一个略大的 vendor，运行时按需去加载。即，我们可以像如下用法，去配备路由组件（当然，我们也可以把组件按组分块）：

```
import Frame from './../views/Frame'
export default {
  path: '/',
  component: Frame,
  children: [{
    path: '/nicelinks',
    meta: {
      title: setTitleLang('晚晴幽草轩', 'Nice Home Blog')
    },
    component: resolve => require(['./../views/Nicelinks'], resolve)
  }]
}
```

### **DllReferencePlugin**

除此之外，在 `webpack` 这块，还是有非常多东西需要去优化，以缩短包构建的时间、改善其体积等等。比如可利用，`DllReferencePlugin` 将常用不怎么变更的文件，抽离出来打入另一统一的文件(vendor.dll.js)， 外链以 script 引入。这个网上教程很多，此不赘述。也可参见这个项目 [jade-blog]( https://github.com/nicejade/jade-blog) 来配置。如此一来，可加速开发构建时间。

### **webpack-bundle-analyzer**

最新 `Vue-cli` 还帮着注入了 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 插件（Webpack插件和CLI实用程序），她可以将内容束展示为方便交互的直观树状图，让你明白你所构建包中真正引入的内容；我们可以借助她，发现它大体有哪些模块组成，找到错误的模块，然后优化它。我们可以在 `package.json` 中注入如下命令去方便运行她(npm run analyz)，默认会打开 `http://127.0.0.1:8888` 作为展示。


>"analyz": "NODE_ENV=production  npm_config_report=true npm run build"


![webpack-bundle-analyzer](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)

在引入了 `DllReferencePlugin` 插件后，想必会在 `webpack.dll.conf.js` 中将 `vue` 加入进去；例如进行了如下配置：

```
entry: {
   vendor: [
     'lodash',
     'superagent',
     'vue',
     'vue-router',
     'vue-i18n'
     'vuex'
   ]
 }
```

当你使用 `webpack-bundle-analyzer` 去分析时，你会发现 Parse Size 为 71 KB 的 `vue.common.js`，会出现在 vendor.xxx.js 中，按预想它不是应该被打入 vendor.dll.js 中的？谈及这里，为了保证文章的完整性，不得不提下，vue2 经过 2.2 版本升级后, 文件变成了 8 个，分别是:

>vue.common.js
vue.esm.js
vue.js
vue.min.js
vue.runtime.common.js
vue.runtime.esm.js
vue.runtime.js
vue.runtime.min.js

这在[Vue2 dist 目录下各个文件的区别](https://www.mmxiaowu.com/article/58482558d4352863efb55475), 可以浏览。另外，vue 文当[独立构建-vs-运行时构建](https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建)，也阐明了两者区别；这 **vue.common.js** 隶属独立构建产物，而默认 NPM 包导出的是 **运行时** 构建，为了使用独立构建（支持 template），在 webpack 配置中添加下面的别名：

```
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}
```

如此一来，在 **webpack.dll.conf.js** 配备中注入 `vue`，导致 vendor.xxx.js 中出现 vue.common.js，就能够得到解释了：dll 中对 vue 打包配置，与 resolve 中引入有出入，前者默认为**运行时**构建。如能保证是一致了，此问题即可解决。这一点，有经过测试，得出数据如下(resolve 配置如上)：

>1. `webpack.dll.conf.js` 中注入 `vue`，build  之后得到 vendor.xx.js 611KB， vendor.dll.js 180 KB；
>2. `webpack.dll.conf.js` 中注入 resolve 同名引入 `vue/dist/vue.common.js`，build  之后得到 vendor.xx.js 540KB vendor.dll.js 207 KB；

两者比较，vendor.xx.js 相差 +71 KB，正是 vue.common.js Parse Size；vendor.dll.js 相差 -27KB，即运行时构建所得大小。打开生成的
vendor-manifest.json，也会发现，前后生成 vue 相关的引用分别是：

> /node_modules/vue/dist/vue.common.js   
> ./node_modules/vue/dist/vue.runtime.common.js    

以上很多经验，多是受教于我司前端大神 @[solodu](https://www.zhihu.com/people/solo.du/answers)，在此深表感谢😄。

## **如何漂亮使用 Vue 之工作流篇**
“轻功不代表武功，但速度决定了你我的距离。”——白凤（秦时明月）。智能化、自动化趋势越发明显，作为程序员如不能尽快适应，其所面临的窘境可想而知。不久的将来，蓝领代码民工，势必会在科技的浪潮中捉襟见肘；所以这更加要求从业者能快准稳的去解决需求，同时保持知识技能的不断更新。而这`快`字，自然是业务技能熟练度多半取决定性作用，但如果有优善的工作流机制，势必锦上添花。而这个话题，所涉及的点线面，非一言可以蔽之；这会在渐进的学习探索中不断去变化更新。但至少一个当前的准则是：**即便不能全自动，至少也须半自动化**。

![轻功不代表武功，但速度决定了你我的距离](http://images2015.cnblogs.com/blog/558479/201703/558479-20170326161708986-635492458.jpg)

很多朋友使用 `hexo` 来构建博客；`hexo` 是基于 **Node.js** 产物，用它发表博文，很是方便；你只需 `hexo clean`, `hexo g`, `hexo d`三个命令即可；文章数据一多，一套打下来，也得 20s+；如果略懂 npm，在 package.js 中加入点命名，例如像这样；

```
"scripts": {
  "start": "sudo hexo clean && sudo hexo g && sudo gulp && sudo hexo d"
}
```

那么 只需运行 `npm start` 就好，可将时间消耗缩短至 2s节省时间虽说不多，却也是数量级的提升，而且代价只是那么小，并一劳永逸。所以有必要对此，以些许微薄经验略作阐述，抛砖以引大玉。

- `Vue-cli` 虽然强大，但毕竟作为基础公用，不宜繁杂。应有自己(团队)的脚手架，当准备开启新的项目时候，只需运行脚手架，以初始化整个项目，而不是一点点拷贝，然后各种重新配置，引入路由，注入 Bootstrap ... 。相同项目中也该有可一键生成的模版库，或者自动化的 Json 解析机制。
- 开始编写代码前，必须同后台er，预定好接口，参数以及返回数据；并令之生成方便检索，可供测试的可视化 API 文档。再没有比这更重要的（如果项目超过一月/人）。像这样开源工具，也多不胜数，比如 [Swagger-Ui](https://github.com/swagger-api/swagger-ui)。
- 在编写代码时候，则该先三思而后写。而写时，当确保编辑工具的犀利化，比如检索语法错误，开合标签完整，自动格式美化代码，使之契合约定的 **Eslint** 要求，也保证代码清晰简洁；想象下如果你的书桌上整天被摆满了虫蝇墨液，你作何想？
- **Vue-cli** 已帮配好了代理，无需担心本地调试跨域问题；但如何能快速提交有效代码，需要自行配备。命令行也好，SourceTree 可视化工具也罢，方便快捷就好。也该借助 `pre-commit` 工具，在 commit 前执行校验，防止出现非法提交，影响队友。
- 从业历程中有经历过手动打各种测试 APK 的凄惨，也经历了手动各种 build 发布的艰难，至今想起，满是心酸。所以，监听仓库代码变化，自动化构建，此乃居家生活必备良品。从业中还经历过各种关闭 Bug 的奇葩方式，坦言做这事儿比解决所谓 Bug 花费的时间还多。而这些，无非是那时候团队见识短浅之诟病耳，如今团队使用 [jenkins](https://jenkins.io/) 和 [GitLab](https://about.gitlab.com/gitlab-com/)，双剑合壁，再无那种痛楚，感动。
- 何谓之写出漂亮 Vue？不仅在于代码之优美，还在于其高效，资源节省。以数据驱动的 Vue 本身很是效率；但使用 C 写出的代码不见得都比 JavaScript 要高效，这变数在于是不同人去写。由此，除了 Code Review 代码外，也须有一套行之有效的全方位分析方法。以保证代码的按需加载，Css 的合理编写 & 引用，凡此等等。
- 何谓之写出漂亮 Vue？还在于其可靠、稳定，而这些最终是要反映在于产品之上；因此，好的产品不仅须配备访问情况，行为分析，事件埋点，也得有错误上报。早先有用 `简书` 这款读写一体的产品，如今上面不仅充斥各种鸡汤与戾气纵横的标题文，还充斥这各种 Bug，尤其是在 Web网页上(Mac mini，Pc)，反馈无门，简直惨不忍睹；何也？断定他们肯定是没有使用 [sentry](https://sentry.io/welcome/) 类似产品工具的。

深圳.南山 @17-03-11. Last Modify 17-03-26

## **猜你喜欢(/对你有用)的文章**

[『引』最全前端资源汇集](http://jeffjade.com/2016/03/30/104-front-end-tutorial/)
[所历前端“姿势”更替记(其一)](http://jeffjade.com/2016/05/14/106-front-end-learning-record/)
[Vue ES6 Jade Scss Webpack Gulp](http://jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/)
[Vue Webpack 组件化开发实践](http://jeffjade.com/2016/07/06/110-vue-webpack-component-develop/)
[Vue 各类数据绑定](http://jeffjade.com/2016/09/16/112-vue-data-binding/)
