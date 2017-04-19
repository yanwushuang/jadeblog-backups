title: 所历前端“姿势”更替记(其一)
date: 2016-05-14 22:30
categories: Front-End
tags:
- Vue
- Gulp
- JavaScript
- Webpack
---

**写作是为了光阴使我心安**。在上一篇 [Vue ES6 Jade Scss Webpack Gulp](http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/#)中，阐述了现如今从事前端工作的“打开方式”；然而，虽到目前为止，在前端行走时间也短，经验尚浅；而这一路的姿势变迁倒值得一述之，一来载下这段过往，待得来年追忆，也可按文索骥，记起这段职业岁月青葱；二来，尘封过去，继往而开来。

<!-- more -->

![www.jeffjade.com|16-03-12-清晨-深圳](http://7xoosr.com1.z0.glb.clouddn.com/loveFlower.jpg)

在[Vue ES6 Jade Scss Webpack Gulp](http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/#)此文中，也叙述这一段的工作内容，多涉及移动端SPA页面开发。在加入团队时，个人前端实为负基础(只在大学时代，以txt写过Html页面，css几未涉及)；团队那时虽也有一年多发展，却因各种缘由(譬如事多人少)，鲜有发展。相比下，这近来的一年发展虽也迟缓，却大有进步。这段过往就从以下几个阶段，以作陈述记载。

### **阶段一：jQuery+自定义**

以下是初入团队，写页面布局所采取的“姿势”。当然，这近一年来，从布局，样式，逻辑等都是手写，据悉移动端并能像pc端，以 Dreamweaver 这样的编辑器**拖拽**实现之。手写布局页面，Chrome上调试样式，这样经历到目前为止，颇是为之耿耿于怀啊。

```html
<div class="content">
    <section>
        <p data-source="string" data-name="conf.titleText"></p>
        <a href="javascript:;" class="call-toast" data-source="string" data-name="conf.conf.callToastText"></a>
    </section>
    <section style="display:none">
		<ol class="act-rule" data-source="list" data-name="conf.actRule"></ol>
	</section>
</div>
```

也是在学习了下这套机制后，方晓得这是团队那时自定义的一套，方式大抵如下：
```js
var system = {
	addData : function(setting){
		$("[data-name]").html("");

		$("[data-source='string']").each(function(){
			var key = $(this).data("name");
			var type = $(this).data("source");
			$(this).html(eval("setting."+key));
		});

		$("[data-source='img']").each(function(){
			var key = $(this).data("name");
			var type = $(this).data("source");
			$(this).attr("src",vars.cdn+eval("setting."+key));
		});
	}
}
```
在页面请求得数据后，调用自定义方法像这样：system.addData(data); 在涉及到时间响应时候，现在看来，那时采取的办法也挺原始了：

```
$('.call-toast').click(function(){
  // do call toast }
)
```

话说这 **jQuery** 的运用，确实在那时给带来N多好处；同时，也引来了不少问题：在不怎么熟悉它的情况就能用它，却因此也很容易造成问题；依稀记得那时被这样的写法折腾挺惨；为此有熟悉下 **jQuery**， 同时也留下一篇学习笔记：[JavaScript 之 this 详解](http://www.jeffjade.com/2015/08/03/2015-08-03-javascript-this/)。后来也才学会需当这样去运用：

```
$('.call-toast').on('click',function(){ // do call toast })
```

在这个阶段中，前后端虽然分离，却未彻底；前端页面布局和逻辑还是写在`php`文件中，只样式和资源拿取出来，部署于cdn。还有一事记忆犹新的是：工作机制里，做好需求后要先行在内网测试，okay后提交svn，再之后发布线上，如此一直延续至今。这事儿吧，一经谈起给人感觉像是在吐槽or抱怨，其实不然，只是不怎么情愿浪费这些许不必要时间而已。就拿这本地文件同步 ftp 来说吧，当时被教化的是借助 **Xftp 4**。哈哈，每做改动，就手动同步 ftp，我可做不来：手会被点的痛不说，时间会被浪费的；故此，都是用**Xftp 4**打开线上文件写，要发布时才同步到本地。

### **阶段二：jQuery+Backbone+Underscore**
大概在一两个月后，各平台才陆续迁移至新的机制： jQuery+Backbone+Underscore；现在看来，**选择真是很重要**；那时如何没有采用**Angular**  **React** 已不得而知（**Vue** 想必那时还没今天这么火,可参见[JavaScript Frameworks: The Best 10 for Modern Web Apps](http://noeticforce.com/best-Javascript-frameworks-for-single-page-modern-web-applications))； 这一用就用到了如今；事情做起来让人觉得容易了，往往导致这项事物难以进步；现在看来**Backbone**的使用，即是如此；以**Backbone** **Underscore** 来实现工作所需，其模式如下：

```html
<div class="content">
    <section>
        <p><%= conf.titleText %></p>
        <a href="javascript:;" class="call-toast"><%= conf.callToastText %></a>
    </section>
    <section style="display:none">
        <table class="act-rule">
            <%_.each(conf.actRule , function(ruleDesc ,index){%>
                <tr>
                    <td><%= ruleDesc %></td>
                </tr>
            <% }) %>
        </table>
	</section>
</div>
```

即便在这个阶段，布局文件和逻辑代码也是没有分开的；统一写于 **php** 文件之内；

```js
var mainView = Backbone.View.extend({
	, initialize: function(options){
		// this.listenTo(this.model,"change",this.render);
		this.render();
	}		
	, render: function(){
		App.V.prototype.render.apply(this);
		return this;
	}
	, events:   {
	    'click  .call-toast':'onCallToast',
	}
	, onCallToast : function(e){
		// do call toast
	}
});
```
在这个阶段，比于先前，从开发效率角度来看，并未有多少提高；不过，工具上摒弃了 **Xftp 4**,**WinScp**等，采用`Sublime`的**sftp** 插件，虽然这插件老弹框，却也好用蛮多，有兴高采烈地将其记载于 [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)；人谁想折腾呢？都是对现况不舒服而做的反抗啊。

### **阶段三：jQuery+Backbone+Underscore+RequireJs**
在这个阶段有引入RequireJs，也是经历近两个多月才陆续迁移的；本身这倒可不列为一阶段，不过前端项目开发结构大改：前端后完全分离；布局，逻辑，样式首次完全独立。其模式比于上一个阶段，主要变化如下：

```
define('text!xyz/default.tpl',[],function () { return 'Html template String';});
define('xyz/main',["tool","app", "text!xyz/default.tpl"],function(Tool, App, tpl){
    var mainView = App.V.extend({
    	, initialize: function(options){
    		// this.listenTo(this.model,"change",this.render);
    		this.render();
    	}, render: function(){
    		App.V.prototype.render.apply(this);
    		return this;
    	}, events:   {
    	    'click  .call-toast':'onCallToast',
    	}, onCallToast : function(e){
        }
    });
}
```

可喜的是，项目终于开启了**模块化**的进程；可悲的是，即便如此然并卵；坦率来讲，这个阶段，并为此感到兴奋；因为模块化的引进，并未给开发效率带来任何提升；反而下降不少：一是，前后端完全分离，前端js，样式，资源全部署cdn，然而并未有很好cdn缓存清理机制，导致发布后有问题，难以快速有效更新(蛮久之后才出一折衷方案)。二，布局写成模板(default.tpl)，没当要发布，因线上存在的跨域问题，需当模板文件压缩成string，以如下模式注入mian.js:

```js
define('text!xyz/default.tpl',[],function () { return 'html template content string';});
```
也是后来很久才知道，require.js提供了对应的打包方式；可是那时并不知道，在几次发布十分忘记合并（合并也不容易），造成十二分不爽后，才去研究下了，此时得知**Gulp**；为此学会gulp之后，有改善了整个流程：以`gulp-tlp2mod`来将tpl转化为js并借助`gulp-concat`进行合并打包；如此Sublime的sftp插件就显得不能很好作用，因此也找到`gulp-sftp`予以替代；其他如代码检测，压缩；图片一键压缩等也是在这时期优化的。

**A Problem Is A Chance For You To Do Your Best**：当发现一事物不怎么合理时，也是自我成长的机会；也在这阶段留下了两篇关于gulp的学习笔记：[Gulp探究折腾之路(I)](http://www.jeffjade.com/2015/11/25/2015-11-25-toss-gulp/)，[Gulp折腾之路(II)](http://www.jeffjade.com/2016/01/19/2016-01-19-toss-gulp/)；同时也去了解了下Win下跑起命令行的具体，随后用了近5小时写下了[Win下必备神器之Cmder](http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/#)。现在回顾，这都是十二分值得的，这为之后项目转战至`Vue Es6 Webpack`先行打下了一个良好的基础。

### **阶段四：jQuery+[Vue ES6 Jade Scss Webpack Gulp](http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/#)**

前端如今发现可谓纷繁杂乱而欣欣向荣；如今这阶段，组件化开发已是大势所趋；具体已在[Vue ES6 Jade Scss Webpack Gulp](http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/#)有过叙述，按下不提；以下便是采用 **Vue** 来搞事儿的“姿势”：

```jade
<template>
    <div class="content">
        <section>
            <p>{{ conf.titleText }}</p>
            <a href="javascript:;" class="call-toast" @click="onCallToast">{{ conf.callToastText }}</a>
        </section>
        <section style="display:none">
            <table class="act-rule" v-for='ruleDesc in conf.actRule'>
                <tr>
                    <td>{{ ruleDesc }}</td>
                </tr>
            </table>
    	</section>
    </div>
</template>

<script type="text/javascript">
import ActTools from  "ActTools";

export default {
    data () {
        return{
            conf: {},
        }
    },
    compiled(){
    },
    methods: {
        callToast: function(){
            // do call toast
        },

        /*-----------------Callback Function--------------------Private Func*/
        onCallToast: function(){
            this.callToast();
        }
    },
    events: {
        'call-toast': function () {
            this.callToast(dlgMsgObj)
        }
    }
}
</script>

<style>
 /*comp style*/
.call-toast{
    color: #fe0;
}
</style>
```

如若采用 `jade` 像写 `python` 一般写html模板，可有感觉一股简洁美铺面开来？示例如下：

```html
<template lang="jade">
    div.content
        section
            p {{ conf.titleText }}
            a(href="javascript:;" class="call-toast" @click="onCallToast") {{ conf.callToastText }}
        section(style="display:none")
            table(class="act-rule" v-for='ruleDesc in conf.actRule')
                tr  
                    td {{ ruleDesc }}

<template>  
```

虽然 布局，逻辑，样式又回归至原始阶段，然而却是全新的概念，这般描述网上充盈，就不多赘述；因为组件化的引入，上述示例即可改造成如下模样：

```
<template lang="jade">
    div.content
        section
            p {{ conf.titleText }}
            a(href="#" class="call-toast" @click="onCallToast") {{ conf.callToastText }}
            act-rule-copm

<template>

<script>
import ActTools from  "ActTools";
import ActRuleComp from "ActRuleComp";//这里路径是利用webpack做了别名控制的；

export default {
    data () {
        return{
            conf: {},
        }
    },
    methods: {
        callToast: function(){
            // do call toast
        },

        /*-----------------Callback Function--------------------Private Func*/
        onCallToast: function(){
            this.callToast();
        }
    }，
    components: {
        ActRuleComp,
    },
}
</script>
```

一经这般，公用代码得以提取为组件，在各大纷繁的应用中得以轻易复用；这样虽然对于大型Web应用开发，虽然裨益不太大，但对于千百相类似SPA页面的缔造，意义重大。再者：借助 **jade** 模板可以清晰而简洁；借助 **ec6**，更方便书写js，借助 **webpack+gulp**，U Can Do what  U Want To Do；如此一来，运行效率，产品体验，开发效率各大方面均有大幅度提升，其所怀悦，幸甚至哉。

前端框架更迭如此迅速，即便当然模式已然觉得挺okay，也不当停滞不前；想来日后撸起前端来，将更为便捷；即便就目前状态而言，很多已经存在妙处，还当去学习&使用：譬如jQuery的替代；虚拟Dom的使用(前不久发布的Vue2.0已添此法)等等；故而先行在文章命名后有加`（其一）`，至于`（其二）`想必不就得将来即会将其唠叨来，Fighting。

以上，于深圳.南山 16-05-14 晴

### **猜你喜欢(/对你有用)的文章**

[如何写一手漂亮的 Vue](http://jeffjade.com/2017/03/11/120-how-to-write-vue-better/)
[Vue 各类数据绑定](http://jeffjade.com/2016/09/16/112-vue-data-binding/)
[Vue ES6 Jade Scss Webpack Gulp](http://jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/)
[Vue Webpack 组件化开发实践](http://jeffjade.com/2016/07/06/110-vue-webpack-component-develop/)
