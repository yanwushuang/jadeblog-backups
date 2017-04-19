title: Win下必备神器之Cmder
date: 2016-01-13 21:11
categories: Toss
tags:
- Toss
- Share
- Tools
- Efficiency
description: Windows下效率必备软件:Cmder介绍;
---

诚言，对于开发码字者，Mac和Linux果断要比Windows更贴心;但只要折腾下，Windows下也是有不少利器的。之前就有在[Windows下效率必备软件](http://www.jeffjade.com/2015/10/19/2015-10-18-Efficacious-win-software/)一文中对此做了下记载；其虽没`oh-my-zsh`那么逆天的存在，却也甚是好用，至少要比Windows原生Cmd好出了天际。因为**好用**，所以**“必备”**。

<!-- more -->

![Cmder](http://7xoosr.com1.z0.glb.clouddn.com/cmder.jpg)

## **安裝 cmder**
[Cmder官网](http://cmder.net/)`http://cmder.net/`（她把conemu，msysgit和clink打包在一起，让你无需配置就能使用一个真正干净的Linux终端！她甚至还附带了漂亮的monokai配色主题。）;作为一个压缩档的存在, 可即压即用。你甚至可以放到USB就可以虽时带着走，连调整过的设定都会放在这个目录下，不会用到系统机码(Registry)，所以也很适合放在Dropbox / Google Drive / OneDrive共享于多台电脑。

下载的时候，有两个版本，分别是mini与full版；唯一的差别在于有没有内建msysgit工具，这是Git for Windows的标准配备；全安装版 cmder 自带了 msysgit, 压缩包 23M, 除了 git 本身这个命令之外, 里面可以使用大量的 linux 命令；比如 grep, curl(没有 wget)； 像vim, grep, tar, unzip, ssh, ls, bash, perl 对于爱折腾的Coder更是痛点需求。

![cmder强大自带命令](http://7xoosr.com1.z0.glb.clouddn.com/msysgit-bin.png)

## **配置 Cmder**
### **启动Cmder**
因为她是即压即用的存在，所以点击`Cmder.exe`即可运行。很显然这般打开她，不怎么快捷，即便用`Listary`高效搜索到她，然后点击;我们可以这样做:

1. 把 **cmder** 加到环境变量
可以把`Cmder.exe`存放的目录添加到系统环境变量；加完之后,`Win+r`一下输入`cmder`,即可。

2. **添加 cmder 到右键菜单**
在某个文件夹中打开终端, 这个是一个(超级)痛点需求, 实际上上一步的把 **cmder** 加到环境变量就是为此服务的, 在管理员权限的终端输入以下语句即可:
```
Cmder.exe /REGISTER ALL
```
**打开一个管理员权限终端:**
输入 Ctrl + t, 或者点击下面控制条的绿色加号, 勾选 Run as administrator
![Run as administrator](http://7xoosr.com1.z0.glb.clouddn.com/cmderRunAdmin.jpg)
这就打开了一个管理员权限的终端, 在里面输入上述语句，就可在每个文件夹右键菜单中点击 `Cmder here`唤起Cmder，方便快捷。

不用打开文件夹就能打Cmder,并进入该目录;爽。

3. 借用Win下逆天神器：`AutoHotKey`（这个下篇要好好记载下）为Cmder配置自己喜欢的快捷键(个人用`Alt+r`)：
```
!r:: run, D:\**\cmder_mini\Cmder.exe
```
个人比较推崇使用`AutoHotKey`；高效简洁，才是王道。

### **默认开启设置**
作为强大的存在，必然支持私人定制。输入`win + alt + p `或者 在底部右击点击 settings, 进入设置页面；可以根据自己的所需进行各种配置(字体，皮肤等等等等)。

目前游走在前端，`Gulp`已离不开，`Cmder+PowerShell`这个组合无疑是运行gulp的利器。如下图所示，可以设置`PowerShell`作为默认开启的选项；也可以更改默认开启是所在目录。
![Cmder-Seting](http://7xoosr.com1.z0.glb.clouddn.com/CmderSeting.jpg)

### **解决文字重叠问题**
Win + ALT + P 唤出设置界面 > mian > font > monospce,去掉那勾勾即可。

### **修改命令提示符号·λ·**
![Cmder修改命令提示符号](http://7xoosr.com1.z0.glb.clouddn.com/CmderChange.jpg)
Cmder预设的命列列提示符号是**λ**;如果用着不习惯，可以将这个字元改成Mac / Linux环境下常见的**$**符号，具体操作如下：
编辑Cmder安装目录下的vendor\init.bat批处理文件(min版本15行)，把：
```
@prompt $E[1;32;40m$P$S{git}{hg}$S$_$E[1;30;40m {lamb} $S$E[0m
```
修改成以下即可：
```
@prompt $E[1;32;40m$P$S{git}{hg}$S$_$E[1;30;40m $$ $S$E[0m
```
这个亲测在`cmder.exe`可以，但在`PowerShell.exe`需要另行设置:
打开文件config/cmder.lua（prompt.lua也有版本是这个），将第二行中的**λ**修改为Linux下常用的**$**即可；亲测可行(2016-01-13)。

## **常用功能介绍**
cmder 功能极为强大，功能也非常多，但从视窗画面上看不太出其强大实力，这里就先说下其「看的见」的功能：
![Cmder强大功能图示](http://7xoosr.com1.z0.glb.clouddn.com/CmderFunction.png)
如上图示编号的部分说明如下：
1, Cmder常用快捷键
跟一般浏览器页签操作习惯一致:
>可以利用`Tab`，自动路径补全(爽,赞！)；
可以利用**Ctrl+T**建立新页签；
利用**Ctrl+W**关闭页签;
还可以透过**Ctrl+Tab**切换页签;
**Alt+F4**：关闭所有页签
**Alt+Shift+1**：开启cmd.exe
**Alt+Shift+2**：开启powershell.exe
**Alt+Shift+3**：开启powershell.exe (系统管理员权限)
**Ctrl+1**：快速切换到第1个页签
**Ctrl+n**：快速切换到第n个页签( n值无上限)
**Alt + enter**： 切换到全屏状态；
**Ctr+r** 历史命令搜索;
**End, Home, Ctrl** : Traversing text with as usual on Windows

2, 可在视窗内搜寻画面上出现过的任意关键字。
3, 新增页签按钮，可透过滑鼠新增页签。
4, 切换页签按钮，可透过滑鼠切换页签。
5, 锁定视窗，让视窗无法再输入。
6, 切换视窗是否提供卷轴功能，启动时可查询之前显示过的内容。
7, 按下滑鼠左键可开启系统选单，滑鼠右键可开启工具选项视窗。 Win+Alt+P  ：开启工具选项视窗

## **cmder元件组成**
cmder其实结合了多套软体，其中包括[msysgit](https://github.com/msysgit/msysgit)与最重要的[ConEmu](http://conemu.github.io/)与[Clink](http://mridgers.github.io/clink/)软体，而ConEmu与Clink这两套软体就是cmder真正的核心元件。

* **msysgit**除了提供Git for Windows 相关工具外，其实还提供了多套Unix/Linux 环境下常用的指令列工具，例如less, ls, tar, unzip, md5sum, grep, sed, … 等多套工具。
光是一个grep 就不知道比Windows 内建的findstr 强几百倍了！
* **ConEmu**也可以是单独一款软件存在，曾经一度迷恋于它，然而其体验并不如**cmder**，便放弃它了。
* **Clink** 将GNU Readline 函式库整合进原生的Windows 命令提示字元视窗，提供命令列模式下强大的编辑与输入能力，这也是用了cmder 之后会这么像在Linux 环境下使用的感觉。

上述功能,目前没怎么用，根据**学以致用**原理，也就还没去了解去折腾。

### __[Chocolatey](https://chocolatey.org)软件包管理系统__
在 Linux 下，大家喜欢用 apt-get(mac下用brew) 来安装应用程序，如今在 windows 下，大家可以使用 Chocolatey 来快速下载搭建一个开发环境。`Chocolatey`的哲学就是完全用命令行来安装应用程序， 它更像一个包管理工具（背后使用 Nuget ）

另外需要说明的是， Chocolatey 只是把官方下载路径封装到了 Chocolatey 中，所以下载源都是其官方路径，所以下载的一定是合法的，但是如果原软件是需要 Licence 注册的话，那么 Chocolatey 下载安装好的软件还是需要你去购买注册。不过 Chocolatey 一般还是会选用免费 Licence 可用的软件。

安装chocolatey , 运行如下命令即可：
```shell
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

安装软件命令 `choco install softwareName`, 短写是 `cinst softwareName`
可安装的应用程序，可以参见其 [Package列表](https://chocolatey.org/packages)
以下是window下开发常用的开发环境应用:
```shell
choco install autohotkey.portable    #安装 AutoHotkey (Portable)
choco install nodejs.install  #安装 node
choco install git.install     #安装 git
choco install ruby            #安装 ruby
choco install python          #安装 python
choco install jdk8            #安装 JDK8
choco install googlechrome    #安装 Chrome
choco install google-chrome-x64 #Google Chrome (64-bit only)
choco install firefox         #安装 firefox
choco install notepadplusplus.install #安装 notepad++
choco install Atom                    #安装 Atom
choco install SublimeText3            #安装 SublimeText3
```

## **其他功能**
* Cmder还增加了**alias**功能;他让你用短短的指令执行一些常见但指令超长又难以记忆的语法;比如 `ls` `cls`等等；在其控制台输入`alias`可以查看。

* 主控台文字自动放大缩小功能，你只要按**下Ctrl+滑鼠滚轮**就可以办到;果你用支援两点触控的笔电，也可以在触控板上用两指放大的手势调整文字大小。还有：**up**，向上翻历史命令;

* **Cmder**有极为简单的**复制粘贴**操作。**Ctr+V**直接粘贴;用鼠标选中你想拷贝的内容，自动就复制到剪切板；天神，这悉数的美感;点赞!

* **自定义aliases**:打开Cmder目录下的config文件夹，里面的aliases文件就是我们可以配置的别名文件，只需将里面ls命令的别名按下列方式修改就可以在ls命令下显示中文。
```
ls=ls --show-control-chars --color=auto $*
```
当然，别名文件还可以有许多其他配置，如：
```
e.=explorer .
gcc=cd D:\Document\gcc\
gw=cd D:\Document\GitHub\work
gl=git log --oneline --all --graph --decorate  $*
ls=ls --show-control-chars --color=auto $*
pwd=cd
clear=cls
```
这个在公司电脑上总不成功；问题`无效的宏定义。`;在写到这里时候，还未查明缘由【待探究，待更新】。

---2016-01-14 20:05更新:
感谢@V友(zongwan)可以修改Cmder目录下`vendor\profile.ps1`文件，Like This：
```
Set-Alias st "C:\Program Files\Sublime Text 3\sublime_text.exe"

function Git-Status { git status }
Set-Alias gs Git-Status

function go-Work {cd E:\work\web\cdn\}
Set-Alias gw go-Work
```
`st xxx`就用实现以sublimeText打开xxx文件；`gw`下就能进入所设置的目录;`gs`相当于在使用git文件目录下用`git status`;凡此种种,为常用命令设置下简短别名,真心不错。


Windows的cmd就是一个奇葩的存在…如果你愿意花时间去找，你能找到很多的可以替代它的软件，譬如：`Babun`, `Gow` ,`Conemu` , `clink`等等，任何一款都比原生Cmd来得快意。环境虽如是，体验却在你。

大概就这样，折腾让生活更美好，不止于编程码字。还是那句话，与君共勉：
“**过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾……但是，人生最后悔的事情就是：我本可以。**”——陈素封。

参考文章：
[Cmder官网](http://cmder.net/)
[利用 Chocolatey 快速在 Windows 下搭建一个开发环境](https://phphub.org/topics/67)
[介绍好用工具：Cmder ( 具有Linux 温度的Windows 命令提示字元工具 )](http://blog.miniasp.com/post/2015/09/27/Useful-tool-Cmder.aspx)

---

对您可能有用(/感兴趣)的文章：
* [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)
* [sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)
* [Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)
* [SublimeText下写作利器之MarkdownEditing](http://www.jeffjade.com/2015/08/28/2015-08-28-Write-Morkdown/)
