title: Win下最爱效率神器:AutoHotKey
date: 2016-03-11 18:00
categories: Toss
tags:
- Toss
- Efficiency
- Share
- Tools
- AutoHotKey
description: AutoHotkey教程：是一个windows下的开源、免费、自动化软件工具，它可以简化你的重复性工作，一键自动化启动或运行程序等等。
---

**[AutoHotkey](https://autohotkey.com/)**是一个windows下的开源、免费、自动化软件工具。它由最初旨在提供键盘快捷键的脚本语言驱动(称为：**热键**)，随着时间的推移演变成一个完整的脚本语言。但你不需要把它想得太深，你只需要知道它可以简化你的重复性工作，一键自动化启动或运行程序等等；以此提高我们的**工作效率**，改善**生活品质**；通过按键映射，鼠标模拟，定义宏等。

<!-- more -->

![图片来自：zoommyapp.com](http://7xoosr.com1.z0.glb.clouddn.com/AutoHotKeyBg.jpg)

如要问__AutoHotKey__是什么？这是一个仁者见仁，智者见智的问题。你可以将其看作是一个热键增添器，也可以当成改键器/屏幕录制器，或者是游戏热键外挂等等。你可以在[AutoHotkey 擅长什么？](https://autohotkey.com/boards/viewtopic.php?f=29&t=4199)得到一个方向；笔者这里只是介绍一些粗浅却很实用的用法，与诸君分享。

## __下载安装AutoHotkey__
在浏览器中输入网址 http://www.autohotkey.com/ 进入AutoHotkey的官网，点击“download”下载即可将AutoHotkey保存到本地磁盘。接着双击点击安装就可以了。

## __建立AutoHotkey脚本__

安装完成后默认会在系统盘的“本地文档”下创建一个"AutoHotkey.ahk"脚本，双击以后我们会看到任务栏右下角有个图标，就表示它在运行了[如下图标注处所示]。我们在里面写入相应的映射代码然后右击选择"**reload this script**"执行它就可以开始使用AutoHotkey里面设置好的功能了。
![AutoHotKey](http://7xoosr.com1.z0.glb.clouddn.com/autohotkey.jpg)

如果我们想在其他地方放置脚本怎么办呢？很简单，只要新建一个文本文档，将其后缀名改为.ahk然后执行它就行了。所以，在同一台电脑中，你甚至可以存放多个脚本。当用不到该脚本了只需要，鼠标移到该图标处，右键选择**exit**即可，很是方便。

为了方便修改该脚本，你可以将其放置于你觉得方便的位置，丝毫不影响，双击可运行之。我们还可以为该脚本设置开机自启动，只需要将该脚本生成一个“快捷方式”，然后将此快捷方式放置到程序自启动文件夹之下即可,一般都在这儿：

>C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp

如此一开机，就可以使用脚本中所配置的功能，大为便捷。

## __简单实用的实例__
这里简单说明下脚本中常用符号代表的含义：
>**\#** 号代表 ***Win*** 键；
**!** 号代表 ***Alt*** 键；
**^** 号代表 ***Ctrl*** 键；
**+** 号代表 ***shift*** 键；
**::** 号(两个英文冒号)起分隔作用；
**run**，非常常用 的 AHK 命令之一;
**;** 号代表 注释后面一行内容；

**run**它的后面是要运行的程序完整路径（比如我的**Sublime**的完整路径是：D:\Program Files (x86)\Sublime Text 3\sublime_text.exe）或网址。为什么第一行代码只是写着“notepad”，没有写上完整路径？因为“notepad”是“运行”对话框中的命令之一。

如果你想按下“Ctrl + Alt + Shift + Win + Q”（这个快捷键真拉风啊。(￣▽￣)）来启动 QQ 的话，可以这样写：
>^!+#q::run  QQ所在完整路径地址。

**AutoHotKey**的强大，有类似Mac下的**Alfred2**之风，可以自我定制(当然啦，后者还是强大太多)。所以可以说，她强大与否，在于使用者的你爱或者不爱`折腾`。学以致用，如果简单的折腾下，可以使得我们工作效率大幅提升，何乐不为？况且，在见识的增长中，这可以给我们思维带来极大的营养。以下是笔者常用功能的脚本配置：

### __极速打开网页__

```
;Notes: #==win !==Alt 2015-05-20  ^==Ctr  +==shift

;=========================================================================
#j::Run www.jeffjade.com
#b::Run https://www.baidu.com/
#c::Run https://www.google.com/
#y::Run http://www.cnblogs.com/jadeboy/
#0::Run https://tinypng.com/
#v::Run https://www.v2ex.com/
;-------------------------------------------------------------------------
```
这是特常用的功能；如上脚本，**Win+J**即可打开自己个人博客，**Win+0**则打开熊猫网址去压缩图片... ...。不管pc焦点何在，使用自己配置的快捷键，即可达到所想，方便而快捷，大慰我心。网上冲浪，自然选取了Chrome，配之以**Vimium**插件[Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)，分分钟甩掉鼠标；生命聊聊不过百年，如此短暂，在鼠标经常性滑过去来做一些可以更高便捷的事儿，所不必要消耗的一秒半秒，我没那么慷慨(即使我会花费更多时间去发发呆)。 

>__温馨提示__： 以下几个系统默认的 Win 快捷键：
Win + E：打开资源管理器； 
Win + D：显示桌面； 
Win + F：打开查找对话框； 
Win + R：打开运行对话框； 
Win + L：锁定电脑； 
Win + PauseBreak：打开系统属性对话框;
Win + Q: 本地文件/网页等搜索;
Win + U: 打开控制面板－轻松使用设置中心;

### __便捷呼出程序__

```
!n::run notepad
!c::run, D:\SoftwareKit\_jade_new_soft\cmd_markdown_win64\Cmd Markdown.exe
!r:: run, D:\SoftwareKit\_jade_new_soft\cmder_mini\Cmder.exe
!q::run, D:\Program Files (x86)\Tencent\QQIntl\QQUninst.exe
!space::run, D:\Program Files (x86)\Sublime Text 3\sublime_text.exe
;==========================================================================
```
以上为**Alt**外加一些键来打开本地应用程序。即便完全可以自己配置**热键**，但是一旦多了，不常用的话记起来也略显麻烦。所以选择**Alt**键组合来打开本地应用程序。**Win**键来呼出网页。在有了**Launchy**这类软件之后，也就不怎么过为本地程序配置快捷键了。

之前一段时间认为，珍爱生命，就当远离Windows。在给其配了SSD硬盘，在不断折腾应用一些软件，在不断了解&熟悉Windows之后，这一想法倒也缓和了不少。Windows下的**AutoHotKey** + **Listary** + **Launchy** 组合，倒也有了点Mac下 `Alfred2`免费功能部分。这一点在[Windows下效率必备软件](http://www.jeffjade.com/2015/10/19/2015-10-18-Efficacious-win-software/)中有过记载。

### __一键拷贝文件路径__

```
^+c::
; null= 
send ^c
sleep,200
clipboard=%clipboard% ;%null%
tooltip,%clipboard%
sleep,500
tooltip,
return
```
只需要**Ctrl+shift+c**即可拷贝文件路径；方便快捷，爽！。

### __改掉大写键为Enter__

```
;replace CapsLock to LeftEnter; CapsLock = Alt CapsLock
$CapsLock::Enter

LAlt & Capslock::SetCapsLockState, % GetKeyState("CapsLock", "T") ? "Off" : "On"

!u::Send ^c !{tab} ^v
```
看网上朋友说**CapsLock**(大写切换按键)没怎么大用处；想来也是，个人每次需要输入大写字符，也是配合Shift来实现。那么此按键意义何在？那就改成**Enter**键好了。有时候右手需要操纵鼠标时候，左手小拇指按此键来实现换行，蛮好；既然大写切换不怎么常用，那么用**Alt+CapsLock**来组合实现也无不妥；以上脚本即为此意。

### __缩写快速打出常用语__

```
::/mail::gmail@gmail.com
::/jeff::http://www.jeffjade.com/
::/con::console.log();
::/js::javascript:;
::/fk::轩先生这会子肯定在忙，请骚后。thx。祝君：天天开心，日日欣悦。
```
**AutoHotKey**一个很强大之处，在任何能正常显示 **unicode**字符的程序中（比如浏览器的地址栏、MS Word Rtx）；如以上代码，键入`/jeff` 后，再加**空格**、或 **tab**、或**回车**，就可以触发缩写；根据输入不同方式（空格，tab，回车）输出的内容后也相应附加了[空格/tab/回车，用起来很是舒爽]; 当然了这里`/jeff`也可以配置其他如`:jeff`，按照个人喜好了。

### __颜色神偷__

```
^#c::
MouseGetPos, mouseX, mouseY
; 获得鼠标所在坐标，把鼠标的 X 坐标赋值给变量 mouseX ，同理 mouseY
PixelGetColor, color, %mouseX%, %mouseY%, RGB
; 调用 PixelGetColor 函数，获得鼠标所在坐标的 RGB 值，并赋值给 color
StringRight color,color,6
; 截取 color（第二个 color）右边的6个字符，因为获得的值是这样的：#RRGGBB，一般我们只需要 RRGGBB 部分。把截取到的值再赋给 color（第一个 color）。
clipboard = %color%
; 把 color 的值发送到剪贴板
return
```

这个功能，搞Web前端还是可以备着的。很好用，按下配置好快捷键，即可取得鼠标所在光标处颜色色值到剪切版中－爽啊。(个人用`Win+C`呼出了 __Chrome__，`Alt+C`调出作业部落客户端__Cmd Markdown__,所以这里就用了`Ctrl+Win+c`来取色，也还算方便)

### __神速激活/打开/隐藏程序__
```
#c::
IfWinNotExist ahk_class Chrome_WidgetWin_1
{
    Run "C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe"
    WinActivate
}
Else IfWinNotActive ahk_class Chrome_WidgetWin_1
{
    WinActivate
}
Else
{
    WinMinimize
}
Return
```
以上这段脚本可以做到，使得Chrome的各种状态灵活切换：**Win+C**,Chrome没打开状态时候 --> 打开；打开没激活状态时候 --> 激活；打开处在激活状态时候 ---> 隐藏。恩，反正个人用着挺爽的，你也试试？

## __折腾AutoHotKey总结__

**折腾**是奔着实用才去做的，所以笔者也只是看下可以常用功能而已。其实**AutoHotKey**远不止如此；[AutoHotkey 学习指南](https://autohotkey.com/boards/viewtopic.php?t=1099)这里可见一斑。网络上也可以搜出**AutoHotKey 懒人包**，里面有二十余脚本，如：*“计时器”*，*“禁止Win键”*，*“秒杀窗口，左键加右键”*云云；需要的话下载即可使用；知乎有一专栏[AutoHotkey 之美](http://zhuanlan.zhihu.com/autohotkey)，粗略扫了下，算是一可以扩充见识之门；[AutoHotKey实用脚本分享](http://nicejade.github.io/2016/03/12/share-autohotkey-script.html)一文介绍了一些常用脚本实例，有兴趣更多了解**AutoHotKey**的朋友们，可参看下。

**AutoHotKey**定有很多好用的功能，此文仅作简单介绍，抛砖以引美玉。希望知道更多有用玩法的朋友可以慷慨分享，让我等Coder效率可以提一提，节省那么些时间：去学习，去把妹(/泡哥)，去享受生活。如果可以，也殷切希望，以此篇介绍给不怎么爱折腾的朋友带来一点参考。王小波在《思维的乐趣》中引用罗素一言：**「须知参差多态，乃是幸福的本源」**；如果您不喜欢折腾，这里并无勉强之意；生活之事，快乐就好。

最后自荐简书一专题[《折腾之美》](http://www.jianshu.com/collection/2f6a49e22121)：工欲善其事，必先利其器。大道至简：**因为折腾，所以简洁**；为爱折腾的你而生，欢请你的入盟(专题起源可参见[折腾之美-序](http://www.jeffjade.com/2016/02/22/2016-02-22-beautiful-of-toss/#more))。

-----2016-03-11晚---于深圳------

>文章来源：http://www.jeffjade.com
原文链接：http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/#

#### **您可能感兴趣(/有用)的文章：**
* [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)
* [新编码神器Atom使用纪要](http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/)
* [sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [SublimeText下写作利器之MarkdownEditing](http://www.jeffjade.com/2015/08/28/2015-08-28-Write-Morkdown/)
* [Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)
* [Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)


