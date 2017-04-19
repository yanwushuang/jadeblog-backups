title: Android项目中文字乱码问题
date: 2015-04-22 02:50
categories: Android
tags: Android
description:
---

Eclipse之所以会出现乱码问题是因为eclipse编辑器选择的编码规则是可变的。一般默认都是UTF-8或者GBK(对于字符编码可参见[字符编码的故事](http://www.cnblogs.com/jadeboy/p/4119512.html))，当从外部导入的一个工程时，如果该工程的编码方式与eclipse中设置的编码方式不同，就会产生中文的乱码问题，这其中还有其他几种情况。

<!-- more -->

如果导入的整个工程的编码方式与eclipse的编码方式有冲突，那么这个工程里所有涉及到的的中文都是乱码;如果所有工程的编码方式与eclipse工作空间的编码方式有冲突，那么所有的工程里的中文都有可能是乱码。对于eclipse工作空间 ，Eclipse会把你改的设置保存在工作空间的设置文件中，<font color="red"> 对于单个工程的编码方式进行修改，那么Eclipse会把编码方式保存在该工程目录下的.setting文件包内</font>（如是拷贝的已存在的Android项目，请记得也将`.setting文件包`一并给Copy过来）。所以，要避免中文乱码问题就有以下两个原则：

>* 避免频繁更换工作空间，最好项目从一开始就在一个工作空间中进行，并且最好设置工作空间的编码方式为你平时最经常使用的或者是公司规定的项目编码方式，这样工程就会使用工作空间的编码方式，避免出现编码不一致的情形；
* 相同类型的文件尽量使用相同的编码方式，可以保证相同类型的文件都能使用一致的编码设置；

**解决中文乱码问题可以有以下设置方案：**
（1）修改工作空间的编码方式：
Window->Preferences->General->Workspace->Text file Encoding
在Others里选择需要的编码方式(如没有则直接输入)，然后保存。

（2）修改单个工程的编码方式：
右击工程，在弹出的菜单中选择最后一项“Properties”，在打开的新窗口左边的菜单树中选择Info（即第一个），然后在右面找到 Text file encoding ，选择 “other”，在下拉框中选择需要的编码方式(如没有则直接输入)。

（3）修改一类文件的编码方式：
假设要将js文件编码方式设为UTF-8，则应该Window->General->Content Types在Content Types中选择JavaScript Source File，在File associations栏中选中*.js,然后在Default Encoding栏中输入UTF-8，单击Update，保存即可。

（4）修改单个文件的编码方式：
右击要修改的文件，在弹出的菜单中选择最后一项 “Properties”，在打开的新窗口左边的菜单树中选择 Info（即第一个），然后在右面找到 Text file encoding ，选择 “other”，在下拉框中选择需要的编码方式(如没有则直接输入)。与修改工程编码方式的方法类似。

PS：在项目过程中遇到的另外一个乱码问题是因为操作系统的字体文件问题，在某些情况下，eclipse所使用的系统中文字体如果被破坏的话，也会导致中文无法显示的问题。所以，如果在上述设置都无法解决问题的时候，应该要考虑一下系统字体文件的问题。

[参考文章A](http://blog.csdn.net/yangdeli888/article/details/7313215)
[参考文章B](http://www.cnblogs.com/jadeboy/p/4119512.html)