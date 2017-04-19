title: 新编码神器Atom使用纪要
date: 2016-03-03 18:00
categories: Toss
tags:
- Toss
- Share
- Tools
- Atom
description: 纪录如何使用Atom：Atom快捷键；Atom常见问题；Atom推荐插件。
---

**[Atom](https://atom.io/)** 是 `Github` 专门为程序员推出的一个跨平台文本编辑器。她很大程度上继承了SublimeText的美，而又不仅如此。有费了蛮大力气总结了一篇关于SublimeText文章: [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)，这其中可以感受个人对于Sublime的钟爱。而如今试用了 `Atom` 一个多月以来，我被迫见异思迁了，幸好我不是一个喜新厌旧的男人～在编码砌字时，很多时候一款编辑器的标签不够用的，所以现在两款兼而用之。

<!-- more -->

# Atom与SublimeText3对比
- Atom1.0之后，有比Sublime更美的UI，不输Sublime的插件包，比Sublime更加舒适的细节，比如：Atom下 `cmd-\` 显示或隐藏目录树；（Sublime默认是 `Ctrl＋K+B` ）。
- 更为简洁人性化的设置/插件安装等（当然SublimeText也不太复杂）。
- Atom算是一款web app，源码都是 CoffeeScript 写的，连界面都可以用 CSS 来自定义，扩展可以用JS开发，完全可以深度定制打造自己的IDE。Sublime基于Python，两者扩展性都非常强。
- **Atom** 暂时还是免费的。而SublimeText，额，一直会弹那个框(使用网上注册码？)。
- 对 `Markdown`的支持更加完美(见下文)；这一点真心是赞的不要不要的。
- 类Web App嘛，对各平台的支持更为有好；比如：在mac下打开xxx文件/文件夹，Atom：terminal下直接 **atom xxx** 即可。而SublimeText会相对繁琐很多，比如为其添加系统别名，可参见[Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)。windows下，安装了 **Atom**，就已经在鼠标右键列表了。
- `Atom`,类Web的年轻一代编辑神器，在打开软件速度上稍逊SublimeText3。相比之下，对大文件响应处理上相比之下，还需很大提升。不过潜力还是挺足的。
- **Atom** 有友好的中文社区[Atom China](https://atom-china.org/)。

关于如何初步使用Atom，可以参见 [官方手册：Atom 基础使用](https://atom-china.org/t/guan-fang-shou-ce-atom-ji-chu-shi-yong/62)。

![Atom is a text editor that's modern, approachable, yet hackable to the core—a tool you can customize to do anything but also use productively without ever touching a config file.](http://7xoosr.com1.z0.glb.clouddn.com/atom.png)

# Atom安装篇

## Atom软件本身安装
1. 可以去Atom官网下载安装包，跟普通安装一致。
2. 可以在终端terminal中安装：
  - Mac OS
    >~ brew install Caskroom/cask/atom

  - Window OS
  > 可以用管理员身份打开Powershell，然后用 choco install 去安装 Atom.
  >
  ```
  choco install atom
  ```
      这一点具体可以参见文章： [Win下必备神器之Cmder](http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/)

## Atom的插件安装
1. `Command+Shift+P`呼出设置界面，点击 **Install** ，在调出的页面输入框中输入你想安装的插件名，搜索这个插件，然后再出现的插件选项中点击下载。
2. Atom编辑器还自带了一个叫做`apm`(Atom Package Manager)的包管理工具，用过npm的同学应该对包管理工具不会陌生，我们可以通过apm查找Atom插件，安装和删除插件等操作。比如对emmet插件的操作。

  >//查找  
  ~ apm search emmet  
  //安装
  ~ apm install emmet  
  //删除  
  ~ apm remove emmet  

# Atom快捷键篇

## 文件切换
`ctrl-shift-s`  保存所有打开的文件  
`cmd-shift-o`  打开目录  
`cmd-\`   显示或隐藏目录树  
`ctrl-0`   焦点移到目录树  
目录树下，使用a，m，delete来增加，修改和删除  
`cmd-t`或`cmd-p` 查找文件  
`cmd-b` 在打开的文件之间切换  
`cmd-shift-b` 只搜索从上次git commit后修改或者新增的文件  

## 导航  
（等价于上下左右）  
`ctrl-p` 前一行  
`ctrl-n` 后一行  
`ctrl-f` 前一个字符  
`ctrl-b` 后一个字符  

`alt-B`, `alt-left` 移动到单词开始  
`alt-F`, `alt-right` 移动到单词末尾  

`cmd-right`, `ctrl-E` 移动到一行结束  
`cmd-left`, `ctrl-A`  移动到一行开始  

`cmd-up` 移动到文件开始  
`cmd-down` 移动到文件结束  

`ctrl-g` 移动到指定行 row:column 处

`cmd-r` 在方法之间跳转

## 目录树操作  
`cmd-\` 或者 `cmd-k cmd-b` 显示(隐藏)目录树  
`ctrl-0` 焦点切换到目录树(再按一次或者`Esc`退出目录树)  
`a` 添加文件  
`d` 将当前文件另存为(duplicate)  
`i` 显示(隐藏)版本控制忽略的文件  
`alt-right` 和 `alt-left` 展开(隐藏)所有目录  
`ctrl-al-]` 和 `ctrl-al-[` 同上  
`ctrl-[` 和 `ctrl-]` 展开(隐藏)当前目录  
`ctrl-f` 和 `ctrl-b` 同上  
`cmd-k h` 或者 `cmd-k left` 在左半视图中打开文件  
`cmd-k j` 或者 `cmd-k down` 在下半视图中打开文件  
`cmd-k k` 或者 `cmd-k up` 在上半视图中打开文件  
`cmd-k l` 或者 `cmd-k right` 在右半视图中打开文件  
`ctrl-shift-C` 复制当前文件绝对路径


## 书签
`cmd-F2` 在本行增加书签  
`F2` 跳到当前文件的下一条书签  
`shift-F2` 跳到当前文件的上一条书签  
`ctrl-F2` 列出当前工程所有书签  

## 选取
> 大部分和导航一致，只不过加上shift  

`ctrl-shift-P`  选取至上一行  
`ctrl-shift-N`  选取至下一样  
`ctrl-shift-B`  选取至前一个字符  
`ctrl-shift-F`  选取至后一个字符  
`alt-shift-B`, `alt-shift-left`  选取至字符开始  
`alt-shift-F`, `alt-shift-right`  选取至字符结束  
`ctrl-shift-E`, `cmd-shift-right`  选取至本行结束  
`ctrl-shift-A`, `cmd-shift-left`  选取至本行开始  
`cmd-shift-up`  选取至文件开始  
`cmd-shift-down`  选取至文件结尾  
`cmd-A`  全选  
`cmd-L`  选取一行，继续按回选取下一行  
`ctrl-shift-W`  选取当前单词  

## 编辑和删除文本
### 基本操作
`ctrl-T` 使光标前后字符交换  
`cmd-J` 将下一行与当前行合并  
`ctrl-cmd-up`, `ctrl-cmd-down` 使当前行向上或者向下移动  
`cmd-shift-D` 复制当前行到下一行  
`cmd-K`, `cmd-U` 使当前字符大写  
`cmd-K`, `cmd-L` 使当前字符小写  

### 删除和剪切
`ctrl-shift-K` 删除当前行  
`cmd-backspace` 删除到当前行开始  
`cmd-fn-backspace` 删除到当前行结束  
`ctrl-K` 剪切到当前行结束  
`alt-backspace` 或 `alt-H` 删除到当前单词开始  
`alt-delete` 或 `alt-D` 删除到当前单词结束  

### 多光标和多处选取  
`cmd-click` 增加新光标  
`cmd-shift-L` 将多行选取改为多行光标  
`ctrl-shift-up`, `ctrl-shift-down` 增加上（下）一行光标  
`cmd-D` 选取文档中和当前单词相同的下一处  
`ctrl-cmd-G` 选取文档中所有和当前光标单词相同的位置  

### 括号跳转  
`ctrl-m` 相应括号之间，html tag之间等跳转  
`ctrl-cmd-m` 括号(tag)之间文本选取  
`alt-cmd-.` 关闭当前XML/HTML tag  

### 编码方式  
`ctrl-shift-U` 调出切换编码选项  

### 查找和替换  
`cmd-F` 在buffer中查找  
`cmd-shift-f` 在整个工程中查找  

### 代码片段  
`alt-shift-S` 查看当前可用代码片段  
> 在`~/.atom`目录下`snippets.cson`文件中存放了你定制的snippets  

[定制说明](https://atom.io/docs/v1.0.0/using-atom-snippets)  

### 自动补全  
`ctrl-space` 提示补全信息  

### 折叠  
`alt-cmd-[` 折叠  
`alt-cmd-]` 展开  
`alt-cmd-shift-{` 折叠全部  
`alt-cmd-shift-}` 展开全部  
`cmd-k cmd-N` 指定折叠层级 N为层级数  

### 文件语法高亮  
`ctrl-shift-L` 选择文本类型  

### 使用Atom进行写作  
`ctrl-shift-M` Markdown预览  
可用代码片段
> b, legal, img, l, i, code, t, table

### git操作
`cmd-alt-Z` checkout HEAD 版本  
`cmd-shift-B` 弹出untracked 和 modified文件列表  
`alt-g down` `alt-g up` 在修改处跳转  
`alt-G D` 弹出diff列表  
`alt-G O` 在github上打开文件  
`alt-G G` 在github上打开项目地址  
`alt-G B` 在github上打开文件blame  
`alt-G H` 在github上打开文件history  
`alt-G I` 在github上打开issues  
`alt-G R` 在github打开分支比较  
`alt-G C` 拷贝当前文件在gihub上的网址  


# 推荐一些好用的插件
- 主题  
[seti-ui](https://atom.io/themes/seti-ui)A dark colored UI theme for Atom with custom file icons. (+Seti Syntax)
[atom-material-ui](https://atom.io/themes/atom-material-ui) 好看到爆  
[atom-material-syntax](https://atom.io/themes/atom-material-syntax)
- 美化  
[atom-beautify](https://atom.io/packages/atom-beautify) 一键代码美化  
[file-icons](https://atom.io/packages/file-icons) 给文件加上好看的图标  
[atom-minimap](https://atom.io/users/atom-minimap) 方便美观的缩略滚动图
- git  
[atomatigit](https://atom.io/packages/atomatigit) 可视化git操作  
- 代码提示  
[emmet](https://atom.io/packages/emmet) 这个不用介绍了吧，前端开发必备，谁用谁知道；  
[atom-ternjs](https://atom.io/packages/atom-ternjs) js代码提示很强大，高度定制化  
[docblockr](https://atom.io/packages/docblockr) jsdoc 给js添加注释  
[color-picker](https://atom.io/packages/color-picker) 取色器 必备插件  
[pigments](https://atom.io/packages/pigments) 颜色显示插件 必装  
[terminal-panel](https://atom.io/packages/terminal-panel) 直接在atom里面写命令了  
[svg-preview](https://atom.io/packages/svg-preview) svg预览
- 便捷操作  
[advanced-open-file](https://atom.io/packages/advanced-open-file) 快速打开、切换文件
- 代码校验  
[linter](https://atom.io/packages/linter)代码校验工具;A Base Linter with Cow Powers  
- Web前端  
[autoclose-html](https://atom.io/packages/autoclose-html) 闭合html标签  
[language-vue-component](https://atom.io/packages/language-vue-component)  Atom编写Vue高亮  
[vue-autocompile](https://atom.io/packages/vue-autocompile) Auto compiles vue in atom  
[language-vue](https://atom.io/packages/language-vue) Syntax highlighting for vue component files

其插件已相当丰满，可以在[这里](https://atom.io/packages)搜索查找。Packages make Atom do amazing things.

## **舒爽书写作(Markdown)**
Atom有自带MarkdownPreview,支持`Ctrl＋Shift＋M`实时预览。装上[markdown-writer](https://atom.io/packages/markdown-writer)插件，根据其默认配置:[Settings for Keymaps](https://github.com/zhuochun/md-writer/wiki/Settings-for-Keymaps)，完美；相必之下比 `SublimeText` 下的书写爽很多；也比`简书`，`作业部落`要更为强大。 比如对已经写下的文字**加粗**，选中 `Command＋B`即可；如果文字还没写，空格下 **Command＋B** 就会生成 `**｜**`，光标在第二个`*`之后，很是方便。 当然这快捷是可以更改的， `cmd + shift + p`输入setting呼出设置界面自行更改。 `markdown-writer`书写 **Markdown** 默认快捷键如下：

| 快捷键操作 | 作用效果 |
|:------------:|:-----------:|
|"shift-cmd-K": | "markdown-writer : ** insert-link"** |
|"shift-cmd-I": | "markdown-writer : ** insert-image"** |
|"cmd-i":       | "markdown-writer : ** toggle-italic-text"** |
|"cmd-b":       | "markdown-writer : ** toggle-bold-text"** |
|"cmd-'":       | "markdown-writer : ** toggle-code-text"** |
|"cmd-k":       | "markdown-writer : ** toggle-keystroke-text"** |
|"cmd-h":       | "markdown-writer : ** toggle-strikethrough-text"** |
|"ctrl-alt-1":  | "markdown-writer : ** toggle-h1"** |
|"ctrl-alt-2":  | "markdown-writer : ** toggle-h2"** |
|"ctrl-alt-3":  | "markdown-writer : ** toggle-h3"** |
|"ctrl-alt-4":  | "markdown-writer : ** toggle-h4"** |
|"ctrl-alt-5":  | "markdown-writer : ** toggle-h5"** |
|"shift-cmd-O": | "markdown-writer : ** toggle-ol"** |
|"shift-cmd-U": | "markdown-writer : ** toggle-ul"** |
|"shift-cmd->": | "markdown-writer : ** toggle-blockquote"** |
|'shift-cmd-"': | "markdown-writer : ** toggle-codeblock-text"** |
|"cmd-j cmd-p": | "markdown-writer : ** jump-to-previous-heading"** |
|"cmd-j cmd-n": | "markdown-writer : ** jump-to-next-heading"** |
|"cmd-j cmd-d": | "markdown-writer : ** jump-between-reference-definition"** |
|"cmd-j cmd-t": | "markdown-writer : ** jump-to-next-table-cell"** |

---

如果您觉得本文的内容，对您有所帮助，您可以**微信**(左)/**支付宝**(右)，1元支持一下 凸^-^凸。
<div style="width: 80%;margin: -2% auto;">
<div style="width: 34%;margin: auto 6.6%;display: inline-block;"><a href="http://7xoosr.com1.z0.glb.clouddn.com/wechatReward.png" title="微信小额打赏" class="fancybox" rel="article0"><img src="http://7xoosr.com1.z0.glb.clouddn.com/wechatReward.png" alt="微信小额打赏"></a><span class="caption">微信小额打赏</span></div><div style="width: 32.1%;margin: auto 6.6%;display: inline-block;"><a href="http://7xoosr.com1.z0.glb.clouddn.com/aliReward.png" title="支付宝小额支持" class="fancybox" rel="article0"><img src="http://7xoosr.com1.z0.glb.clouddn.com/aliReward.png" alt="支付宝小额支持"></a><span class="caption">支付宝小额支持</span></div>
</div>

---

>原文出处: (晚晴幽草轩)http://jeffjade.com
>原文链接: http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/

**您可能感兴趣(/有用)的文章：**
* [Win下最爱效率神器:AutoHotKey](http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/#)
* [如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/)
* [sublime text 下的Markdown写作](http://www.cnblogs.com/jadeboy/p/4165449.html)
* [SublimeText下写作利器之MarkdownEditing](http://www.jeffjade.com/2015/08/28/2015-08-28-Write-Morkdown/)
* [Mac必备软件渐集之ZSH－终极Shell](http://www.jeffjade.com/2015/07/29/2015-07-29-mac-musthave-software/)
