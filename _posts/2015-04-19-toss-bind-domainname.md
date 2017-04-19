title: Gitcafe绑定自定义域名
date: 2015-04-19 02:50
categories: Toss
tags: Hexo
description:
---

之前将自己练习写作工具替换为Markdown，部署工具改为Hexo，并且将托管地搬家到GitCafe之后，便是被各种的舒爽所围绕。她们的组合方便快捷，让人仅仅只专注于写，对于布局和上传都有这些工具帮助完成，且做的很好。但访问的域名是`name.gitcafe.io` 到底是长了些；可喜的是Gitcafe提供了很是简易的方法可以绑定自定义域名。

<!-- more -->

### **购买属于自己的域名**
购买域名的地方那是一堆一堆的，国外的服务目测不错，价格也还好十多刀的样子；只是稍稍有些担心怕被墙神马的。笔者是在万网购买的,域名`jeffjade.com`价格39 RMB／年。注册也是蛮快，没怎么卡壳，只是在国内买域名需实名认证，心里总有些怪怪的Fell。

### **GitCafe新增自定义域名**
打开已经注册且添加的项目，点开`项目设置`栏的Pages服务选项，将申请的域名新增下即可。如下图所示：
![Gitcafe绑定域名](http://www.jeffjade.com/img/toss/bind-domainname1.png)

再看右边的提示将二选其一操作下就完成了；Hexo时支持添加CNAME记录的，笔者这里直接在购买的域名管理界面添加一个A记录，将它指向GitCafe服务器的IP如下图所示：
![Gitcafe绑定域名](http://www.jeffjade.com/img/toss/bind-domainname2.png)

如此大功告成，使用`http://jeffjade.com` or `jeffjade.com`即可访问自己Blog，这感觉有点更爽了。
