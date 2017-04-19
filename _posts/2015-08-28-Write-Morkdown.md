title: SublimeText下写作利器之MarkdownEditing
date: 2015-08-28 21:00
categories: Toss
tags:
- Toss
- SublimeText
- Markdown
- Efficiency
---

之前有陆续学习和整理关于[追寻高效工作的一路折腾](http://www.jeffjade.com/2015/05/26/2015-05-26-high-efficiency-tools-collecting/)；毕竟技无止境，需要不断的学习总结和对比。而其中诸多内容也是需要分支出来一一细谈(其实就是更为详尽搜集些资料，然后加以整理)；此文就是为了更详尽说明～关于如何更高效的利用SublimeText来写作。

<!-- more -->

对程序员来讲，写作其实是一件非常有益的事情。这一点不少业界大牛对此已有很深刻的阐述和倡导，比如这里~[吐血推荐文章集锦](http://www.jeffjade.com/2015/02/01/2015-02-01-recommended-article/#程序员)收录了那些精辟论述;而SublimeText和Markdown结合无疑是一个魔幻的组合。虽然，Markdown在MAC或Win下都有非常多的IDE，比如个人用过的`MarkdownPad` `作业部落` `简书`等，还有Chrome 插件`马克飞象`  MAC下的`Ulysses ` `Mou `云云。月光博客的[好用的Markdown编辑器一览](http://www.williamlong.info/archives/4319.html)对这些有过更详细的总结。但是，对于程序员来讲，SublimeText下蛮多插件支持Markdown写作无疑很棒，如此编码写作，就不用在各个IDE间切换，且享受SublimeText精巧性感如斯，岂是不美？

## __MarkdownEditing：Sublime Text的Markdown利器__

Github项目地址：[SublimeText-Markdown/MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)

### __关于安装：__
如果Sublime安装了Package Control,直接Command+Shift+P(Mac下)输入MarkdownEditing，搜索到点击即可自行安装，重启便可使用用。

### __关于特性：__
MarkdownEditing 从视觉和便捷性上针对 Markdown 文档的编辑进行了一系列的优化。具体如下(Mac下)：
* 安装后针对 md\mdown\mmd\txt 格式文件启用插件。颜色方案仿 Byword及iA writer。
* 自动匹配星号（*）、下划线（_）及反引号（`），选中文本按下以上符号能自动在所选文本前后添加配对的符号，方便粗体、斜体和代码框的输入。
* 直接输入配对的符号后按下退格键（backspace），则两个符号都会被删除；直接输入配对的符号后按下空格键，则会自动删除后一个。
* 对“选中文字后输入左括号”这一动作进行了调整，以便插入markdown链接。
* 拷贝一个链接，选中文本后按下 __⌘⌥V__ 会自动插入内联链接。
* 拷贝一个链接，选中文本后按下 __⌘⌥R__ 会自动插入引用链接。
* __⌘⌥K__ 插入链接；__⌘⇧K__ 插入图片。
* __⌘⇧B__ 和 __⌘⇧I__ 分别用于加粗体和斜体。
* __⌘^1..6__ 对于选中的内容前加对应个数\#,即对选中内容字体大小设置为h1~h6;
* __⌘⇧6__插入文档脚注并且跳转到它的定义；具体可参见:[Footnotes][];
* 选中文本后按下 \# 会自动在文本前后进行配对，可重复按下来定义标题级别。


### __关于快捷键：__
无快捷键的编写，即便是Markdown也略显蛋疼。特性中已经对快捷编写有了说明；下面是MarkdownEditing官方给出的三大平台默认Key Bindings说明与对比：

| OS X | Windows/Linux | Description |
|------|:---------------:|-------------|
| <kbd>⌘</kbd><kbd>⌥</kbd><kbd>V</kbd> | <kbd>Ctrl</kbd><kbd>Win</kbd><kbd>V</kbd> | Pastes the contents of the clipboard as an inline link on selected text.
| <kbd>⌘</kbd><kbd>⌥</kbd><kbd>R</kbd> | <kbd>Ctrl</kbd><kbd>Win</kbd><kbd>R</kbd> | Pastes the contents of the clipboard as a reference link.
| <kbd>⌘</kbd><kbd>⌥</kbd><kbd>K</kbd> | <kbd>Ctrl</kbd><kbd>Win</kbd><kbd>K</kbd> | Inserts a standard inline link.
| <kbd>⌘</kbd><kbd>⇧</kbd><kbd>K</kbd> | <kbd>Shift</kbd><kbd>Win</kbd><kbd>K</kbd> | Inserts an inline image.
| <kbd>⌘</kbd><kbd>⌥</kbd><kbd>B</kbd> <kbd>⌘</kbd><kbd>⌥</kbd><kbd>I</kbd> | <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>B</kbd> <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>I</kbd> | These are bound to bold and italic. They work both with and without selections. If there is no selection, they will just transform the word under the cursor. These keybindings will unbold/unitalicize selection if it is already bold/italic.
| <kbd>⌘</kbd><kbd>^</kbd><kbd>1...6</kbd> | <kbd>Ctrl</kbd><kbd>1...6</kbd> | These will add the corresponding number of hashmarks for headlines. Works on blank lines and selected text in tandem with the above headline tools. If you select an entire existing headline, the current hashmarks will be removed and replaced with the header level you requested. This command respects the `mde.match_header_hashes` preference setting.
| <kbd>⌘</kbd><kbd>⇧</kbd><kbd>6</kbd> | <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>6</kbd> | Inserts a footnote and jump to its definition. If your cursor is in a definition, it will jump back to the marker.
| <kbd>⌥</kbd><kbd>⇧</kbd><kbd>F</kbd> | <kbd>Alt</kbd><kbd>Shift</kbd><kbd>F</kbd> | Locates footnote markers without definitions and inserts their markers for the definition.
| <kbd>⌥</kbd><kbd>⇧</kbd><kbd>G</kbd> | <kbd>Alt</kbd><kbd>Shift</kbd><kbd>G</kbd> | Locates link references without definitions and inserts their labels at the bottom for the definition.

### __关于配置__:
有些快捷键可能与系统的一些发生冲突，可以编辑 ~/Library/Application Support/Sublime Text/Packages/MarkdownEditing/Default (OSX).sublime-keymap 改掉。

另外还有一些设置可以在 ~/Library/Application Support/Sublime Text 2/Packages/MarkdownEditing/Markdown.sublime-settings 中进行修改。

比如除了默认的颜色主题外，MarkdownEditing 还提供了一个高亮显示编辑行 MarkdownEditor-Focus，就可以在 Markdown.sublime-settings 这个文件中找到并去掉注释保存生效。

### __小小总结：__
如何对SublimeText本身能够有一个良好的运用，外加上些许插件的组合，无疑可以让SublimeText下编码和下作变得专注且舒适。之前有总结一篇[如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/04/17/2015-04-17-toss-sublime-text/),对自己效率和强迫症改善颇多；毕竟东西不少，还有待持续学习和更新。

当然SublimeText下面，关于Markdown的插件不止这一款；最初在Win下，就用过`markdown preview`;也是很棒，具体可以参见之前的一篇文章～[Sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html);而更多如_MarkdownTOC_ , _Monokai Extended & Markdown Extended_等等@太极儒[在 Sublime 中配置 Markdown 环境](http://frank19900731.github.io/blog/2015/04/13/zai-sublime-zhong-pei-zhi-markdown-huan-jing/)一文中都有叙述，当然也提到了`Pandoc`(这个略屌，可将Markdown文章一命令转换成多种格式如Txt,Doc,PDF)这个神器。MacPlay则在[近乎完美的 Markdown 写作体验 - Sublime Text 3 + OmniMarkupPreviewer](http://macplay.leanote.com/post/%E8%BF%91%E4%B9%8E%E5%AE%8C%E7%BE%8E%E7%9A%84-Markdown-%E5%86%99%E4%BD%9C%E4%BD%93%E9%AA%8C-Sublime-Text-3-OmniMarkupPreviewer)一文中详细的阐述了<font color="purple">OmniMarkupPreviewer</font>的各种美好。生活，行简单以过；折腾，为简单而生！喜欢折腾的朋友肯定能体会到个中益理！

_**更多Markdown编辑器文章：**_
[每周一软之 Markdown 笔记软件 Ulysses II](http://frank19900731.github.io/blog/2014/12/21/mei-zhou-ruan-zhi-markdown-bi-ji-ruan-jian-ulysses-iii/)
[More Elegant Use Markdown](http://www.jeffjade.com/2015/05/26/2015-05-26-high-efficiency-tools-collecting/#More%20Elegant%20Use%20Markdown)

_参考的那些链接：_
* [SublimeText-Markdown/MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)
* [Sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [MarkdownEditing：SublimeText的Markdown 利器](http://lucifr.com/2012/07/12/markdownediting-for-sublime-text-2/)

 [Footnotes]:https://pythonhosted.org/Markdown/extensions/footnotes.html "footnotes"
