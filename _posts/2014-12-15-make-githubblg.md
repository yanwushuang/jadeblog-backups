title: 基于GitHub Pages搭建的Blog
date: 2014-12-15
categories: Toss
tags:
- Toss
- Hexo
description: 基于GitHub Pages搭建的Blog
---

### The Article Come From [StrayBirds](http://minixalpha.github.io/StrayBirds/);

这篇文章原来出自[minixalpha](http://minixalpha.github.io)；遥想当年也是参考这篇动态图文使用`Hexo`折腾自己新的Blog的。一路走过来，不断的折腾，后来有转投于`Hexo`;也简忆搭建过程：留有[使用Hexo搭建专属Blog](http://www.jeffjade.com/2015/03/14/2015-03-14-hexo-blog/)拙文，希望爱好此道的人也能受益。今看到之前的这篇文章，特此作以说明。更新于@2015-11-10暮于深圳。

基于 GitHub Pages 搭建的极简博客，所有操作都可以直接通过浏览器完成。

<!--more-->

## 示例

可以通过访问 [StrayBirds](http://minixalpha.github.io/StrayBirds/) 看到最终
的效果，下面是截图:

![基于GitHub Pages搭建的Blog](http://images2015.cnblogs.com/blog/558479/201703/558479-20170307214155719-1670256277.png)

## 教程

### 使用方法

1. 注册 GitHub，得到用户名，例如 minixbeta
2. 到 [StrayBirds](https://github.com/minixalpha/StrayBirds) 页面，单击右上角的 Fork
3. 到你 Fork 后的项目中，将 `_config.yml` 中的 username 修改为你的用户名 minixbeta
4. 访问你的博客 http://minixbeta.github.io/StrayBirds/

![基于GitHub Pages搭建的Blog](http://images2015.cnblogs.com/blog/558479/201703/558479-20170307212953375-446043943.gif)

如果你想修改项目的名字，例如将 StrayBirds 修改为 blog，那么你需要做的是

1. 在项目的 Setting 中将 Repository name 从 StrayBirds 修改为 blog
2. 将 `_config.yml` 中的 baseurl 修改为 /blog
3. 通过 http://minixbeta.github.io/blog/ 来访问你的新博客

![基于GitHub Pages搭建的Blog](http://images2015.cnblogs.com/blog/558479/201703/558479-20170307214056875-1539824021.gif)

### 添加文章

在 `_post` 目录下添加形如 `2014-10-26-title.md` 的文章，用 markdown 格式
撰写博客。

![基于GitHub Pages搭建的Blog](http://images2015.cnblogs.com/blog/558479/201703/558479-20170307213853219-328060003.gif)

## 感谢

博客主题来自 [modernist](https://github.com/orderedlist/modernist),
开源协议为 [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/)
