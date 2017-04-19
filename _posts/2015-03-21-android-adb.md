title: MAC使用adb工具
date: 2015－03-21 01:30
categories: Android
tags: Adb
description: 
toc: true
---

前阵子入手了一本MacPro后，终将阵地也转移到了这里。但是Mac默认不能使用Adb这个就需要自己解决下；搜索了下，和Linux下面的使用方法差不多；需要用到Android SDK的adb工具包（幸好前几天折腾Android Studio安装了SDK）

如果你不想安装庞大的android SDK (地址:http://developer.android.com/sdk/index.html)的话, 在这里下载adb工具包 : http://dl.dbank.com/c001bzfxoe

<!--more-->

然后解压到任意位置.

接下来在当前用户根目录下新建 .profile 文件

可以在终端中敲入以下命令

	cd ~

	touch .profile

新建文件，然后编辑该文件

	vim .profile

粘贴如下：

	PATH=${PATH}:<font color="red">/Users/yunjeff/Documents/platform-tools</font>


其中红色部分就是刚才解压后的adb工具路径，替换成你的，保存之后，重启终端

如果在终端中敲入 adb 回车 之后就可以检测adb是否安装成功了。mac就是这么优雅。

-----

当然也可以命令行输入 `open -e .bash_profile` 
此命令行输入完毕后，会自动弹出 .bash_profile 文件的编辑窗口进行编辑。

