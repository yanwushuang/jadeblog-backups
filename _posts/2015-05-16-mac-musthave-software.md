title: Mac必备软件集之Brew
date: 2015-05-16 14:20
categories: Toss
tags:
- Toss
- Share
- Mac
description:
---

`Brew～安装开发工具链的神器`：brew 又叫Homebrew，是Mac OSX上的软件包管理工具，能在Mac中方便的 安装/查询/卸载 软件， 只需要一个命令， 非常方便！brew类似 Debian 下的 apt，不得不装的神器。

<!-- more -->
## 安装Homebrew
brew 的官方网站： http://brew.sh/ 在官方网站对brew的用法进行了详细的描述;
安装方法：  在Mac中打开Termal:  输入命令：
``` ruby
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
```

或者按照官网 http://brew.sh/ 所写：Paste that at a Terminal prompt.
``` ruby
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

额，这个在国内经常会被屏蔽。果敢翻过这墙，遇见那美好。

## 使用brew安装软件
一个命令就搞定了! 比如安装git:
>brew install git

比如安装wget:
>brew install wget

比如安装luarocks:
>brew install luarocks -v

## 使用brew卸载软件
卸载更方便了,一个命令搞定。比如卸载wget
>brew uninstall wget

## 使用brew查询软件
有时候，你不知道你安装的软件的名字， 那么你需要先搜索下, 查到包的名字。
比如我要安装
>brew search /sublime/

>brew search /wget/

/wget/是个正则表达式， 需要包含在/中

## 其他brew命令
| 命令名称        | 命令释义       |
|:-------------:|:-------------:|
|brew list      |列出已安装的软件  |
|brew update    |更新brew        |
|brew home      |用浏览器打开brew的官方网站|
|brew info      |显示软件信息     |
|brew deps      |显示包依赖       |


## **您可能感兴趣(/有用)的文章：**
* [那些所倚靠的利器记载](http://www.jeffjade.com/2016/03/17/2016-03-17-jade-tools/)
* [Awesome Chrome 插件集锦](http://www.jeffjade.com/2017/01/23/118-chrome_awesome_plug-in/?me)
* [Win下最爱效率神器:AutoHotKey](http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/#)
* [Win下必备神器之Cmder](http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/)
* [新编码神器Atom使用纪要](http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/)
* [sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [SublimeText下写作利器之MarkdownEditing](http://www.jeffjade.com/2015/08/28/2015-08-28-Write-Morkdown/)
* [Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)
* [Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)
