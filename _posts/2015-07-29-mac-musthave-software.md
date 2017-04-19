title: Mac必备软件渐集之ZSH－终极Shell
date: 2015-07-29 19:56
categories: Toss
tags:
- Toss
- Share
- Mac
- Efficiency
description:
---

　　写在码字之前：“过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾……但是，人生最后悔的事情就是：我本可以。”——陈素封。很多事情只有真正的去折腾后，才发现她的美丽与魅力。Mac是如此，而这ZSH－Unix传承下来系统的终极Shell亦是如此。

<!-- more -->

![Mac必备软件渐集之ZSH－终极Shell](http://7xoosr.com1.z0.glb.clouddn.com/mac.jpg)

　　很早就在各种博文中看过ZSH的大名鼎鼎。因Mac下自带的Bash觉得还行就没怎么理会。但开始折腾她，源于`池建强`先生的[终极 Shell——ZSH](http://zhuanlan.zhihu.com/mactalk/19556676)，绝对的一种相见恨晚。喜欢在玩儿命令行且没有配置ZSH的盆友们，赶紧刷下这篇文章吧。保证物有所值！其好处就不在多加赘述了。

### **安装ZSH**
　　目前常用的 Linux 系统和 OS X 系统的默认 Shell 都是 bash，但是真正强大的 Shell 是深藏不露的 zsh， 这货绝对是马车中的跑车，跑车中的飞行车，史称『终极 Shell』，但是由于配置过于复杂，所以初期无人问津，很多人跑过来看看 zsh 的配置指南，什么都不说转身就走了。直到有一天，国外有个穷极无聊的程序员开发出了一个能够让你快速上手的zsh项目，叫做「oh my zsh」，Github 网址是：https://github.com/robbyrussell/oh-my-zsh。这玩意就像「X天叫你学会 C++」系列，可以让你神功速成，而且是真的。

>如果你用 Mac，恭喜你！输入`cat /etc/shells`可以看到Mac系统自带这ZSH。
如果你用 Redhat Linux，执行：sudo yum install zsh
如果你用 Ubuntu Linux，执行：sudo apt-get install zsh
如果你用 Windows……去洗洗睡吧。

　　安装完成后设置当前用户使用 zsh：chsh -s /bin/zsh，根据提示输入当前用户的密码就可以了。

### **安装oh my zsh**
安装「oh my zsh」可以自动安装也可以手动安装。
自动安装：
```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

手动安装：
```
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

都不复杂，安装完成之后退出当前会话重新打开一个终端窗口，你就可以见到这个彩色的提示了：
![ZSH](http://7xoosr.com1.z0.glb.clouddn.com/mac-zsh.png)

### **ZSH 的配置**
　　zsh 的配置主要集中在用户当前目录的.zshrc里(在mac的用户目录下`ls -a`命令就可以看到)，用 vim 或你喜欢的其他编辑器打开.zshrc，在最下面会发现这么一行字：

\# Customize to your needs…

可以在此处定义自己的环境变量和别名，当然，oh my zsh；在安装时已经自动读取当前的环境变量并进行了设置，你可以继续追加其他环境变量。接下来进行别名的设置，请看下池建强先生的部分配置如下：
```
alias cls='clear'
alias ll='ls -l'
alias la='ls -a'
alias vi='vim'
alias javac="javac -J-Dfile.encoding=utf8"
alias grep="grep --color=auto"
alias -s html=mate   # 在命令行直接输入后缀为 html 的文件名，会在 TextMate 中打开
alias -s rb=mate     # 在命令行直接输入 ruby 文件，会在 TextMate 中打开
alias -s py=vi       # 在命令行直接输入 python 文件，会用 vim 中打开，以下类似
alias -s js=vi
alias -s c=vi
alias -s java=vi
alias -s txt=vi
alias -s gz='tar -xzvf'
alias -s tgz='tar -xzvf'
alias -s zip='unzip'
alias -s bz2='tar -xjvf'
```
zsh 的霸气之处在于不仅可以设置通用别名，还能针对文件类型设置对应的打开程序，比如：`alias -s html=mate`，意思就是你在命令行输入 hello.html，zsh会为你自动打开 TextMat 并读取 hello.html； alias -s gz='tar -xzvf'，表示自动解压后缀为 gz 的压缩包。

总之，**只有想不到，木有做不到**。

### **折腾ZSH的初衷**
　　开始折腾不仅是因为读了池建强先生的那篇博文；近来也是折腾Web前端，每次建立个html页面，因Mac下目测不能直接建立一个文件，只好在Terminal 那里`touch`一个。可是习惯玩儿Sublime Text的自己，不怎么折腾Vim，那打开该html可酒繁琐咯。总不能每次都拖进去或者使用open吧。而ZSH就可以利用其强大的配置，能针对文件类型设置对应的打开程序，哇哦，完美有木有？

　　那配置ZSH时候遇到点问题还是要记录下的。`alias -s html=sublime`，很明显这一句无法得到执行（没有配置sublime环境变量）。而参考网络上各种博文比如[MAC 设置环境变量path的几种方法](http://www.flakor.cn/2014-09-14-714.html),颇为麻烦且目测并不能很好的工作；几番搜索，几番实践，发现“linux/mac下的自定义命令alias，并保存别名使其永久生效（重启不会失效）”这个方法不错，参见[Here](http://blog.unieagle.net/2012/05/21/linux下的自定义命令alias，并保存别名使其永久生效（重/)。利用 alias aCommandAlias='aCommand 一堆参数什么的'比如：
>alias gpush='git push origin HEAD:refs/for/master'

　　这样在终端中，只需要输入gpush就ok了。但是只是这样的话，会在重启之后失效，解决办法是编辑~/.bashrc文件(没有的创建一个就好)，每行加入一个alias命令。比如：
```shell
alias cdhome='cd ~'
alias cdroot='cd /'
alias gpull='git pull'
alias gci='git commit -a'
alias gpush='git push origin HEAD:refs/for/master'
alias gst='git status'
alias sublime='open -a "Sublime Text"' //加入Sublime Text
```
保存文件后，运行:`source ~/.bashrc(不然不生效）`就可以了。如果还不行的话，说明没有~/.bash_profile文件，或者文件中没有执行.bashrc文件。(.bash_profile文件是用户登陆终端的时候会自动执行的文件，一般此文件中会调用.bashrc)如果是这样，需要打开（如果没有的话先创建）文件：`~/.bash_profile`在里面加入一行：`source ~/.bashrc`即可！

　　昨晚在Mac下测试一番可以。加上ZSH的配置，只要输入xxx.html,就可以打开该文件，挺爽！

　　所以说：“过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾……但是，人生最后悔的事情就是：我本可以。——陈素封”,这一句讲的很好。很好美好就需要从折腾开始。因可能有一点繁琐的折腾，让更多的事儿变得更加简洁。

后记：关于更多ZSH信息请参见[终极 Shell——ZSH](http://zhuanlan.zhihu.com/mactalk/19556676)

－2015-07-29于深圳南山－
