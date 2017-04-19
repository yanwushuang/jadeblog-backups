title: Rake让Jekyll写博更优雅
date: 2016-03-26 16:30
categories: Toss
tags: 
- Rake
- Tools
- Jekyll
description: 编写Rakefile让Jekyll写博更便捷，一键生成/预览/发布...
---

于想拥有个人站点品牌的人来讲，现如今是一个很好的时期。至少 __Hexo__、__Jekyll__、__Leanote__、`WordPress` 、`FarBox`  Octopress、ghost、marboo、Medium、Logdown、prose.io 等诸多层出不穷的好工具，让建站写文已经变得异常简洁方便。分分钟可搭建起美观大方的个人博客，这样的教程已经充盈网络，在此不提。这里要谈及的是，以**Rake**一键生成**Jekyll**文章模版，一键预览效果，一键发布等等；Rake让Jekyll写博更优雅。

<!-- more -->

![Rake让Jekyll写博更优雅](http://7xoosr.com1.z0.glb.clouddn.com/niceStar.jpg)

个人博客，目前主用这**Hexo**和**[jekyll](http://jekyllrb.com/)**，两者都很是轻量便捷。**Hexo**是一个开源的静态博客生成器,由一位台湾大学生用node.js开发而成，[晚晴幽草轩](http://www.jeffjade.com)就是用**Hexo**搭建而成。**jekyll**是Ruby写的一个轻量级的博客系统，也是Github Page默认搭配，[天意人间舫](http://nicejade.github.io)则是以**Jekyll**创造出的；(题外话，Hexo发布前需要运行`Hexo g`本地生成下，文章多了，速度上也会慢些(百篇文章，5s左右)；发布后更新速度也没Jekyll那么快；其他常用体验倒差不太多)。

在设计上，jekyll框架将博客模块化，比如有负责网页显示样式的部分（即模板），有负责博客内容的部分，也就是我们使用**markdown**语言来写的内容。其次，它通过一定的规则，又将各个模块的内容组织起来，并创建各个页面之间的联系。如此是它可以使我们在写作的时候，尽最大的精力去集中在内容的创作上，而不用太在意格式以及排版。并且借助于git这个相当流行的分布式版本控制系统，可很有效的管理所写的文章，完全可以做到在没有网络的情况下写作｜预览，待有网络时再将内容同步。

使用**Jekyll**本已经非常方便了，不管是本地测试还是发布线上。但还是不够简洁，对于渴望极致的懒人来讲。比如发布文章到线上：
```git
git add .
git commit -m "commit massge"
git push origin master
```
如果能够敲击一个命令完成，就不能忍受搞三行；虽然三行只多余费了不到半分钟。撰文写字，本就不易，一篇下来，已是很累；欲长久此好，必须尽可能减轻完成这事儿之成本；否则累觉不爱之后，爱好这种事儿，会在累烦的折腾种被阉割抛弃的。在操纵**Jekll**博客方面，有很多可以利用的脚本，比如**bash**,**Makefile**,win下的**bat**等等； 朋友@[痞子达](http://pizida.com) 向我推荐了**Rake**，这些日子用了下着实很方便，改写也颇为简单，就此录下一篇推荐给大家。

何为[Rake](http://rake.rubyforge.org)？: 即Ruby Make，一个用ruby开发的代码构建工具，要了解更多Rake可以参看其官网，抑或是这里整理的[简洁强大如斯：Rake](http://nicejade.github.io/2016/03/26/nice-rake.html)。

下载安装**Rake**，可以使用 **gem**：
>gem install rake

如何使用**Rake**来优雅Jekyll写博文流程？，只需要写一个**Rakefile**为名的Rake脚本放置在Blog项目的根目录下，同时做一点简单的配置即可。[Jekyll Rake Boilerplate](https://github.com/gummesson/jekyll-rake-boilerplate)是一个功能很完善的脚本，有以下诸多方法可供使用：

```rake
rake post["Title"]
rake draft["Title"]
rake publish
rake page["Title"]
    rake page["Title","Path/to/folder"]
rake build
rake watch
    rake watch[number]
    rake watch["drafts"]
rake preview
rake deploy["Commit message"]
rake transfer
```
这意味着使用**Jekyll**写文的流程可简化为：

>* 写草稿：rake draft["Title"]
* 将草稿发表：rake publish
* 直接写博文：rake post["Title"]
* 做页面：rake page["Title"]
* 写完后发布，rake deploy["Commit message"]

这个脚本目测为国外人编写的，于个人需求还是得调整下的。并且这里采用 `rake draft["Title"]` 这样命令行来运行，对于使用 `zsh` 作为终端的朋友，就颇为有点蛋疼了。"[]"在`zsh`这里会被转义，所以运行命令就得这样 `rake post\["TitleName"\]`，否则会报如下错误：
>zsh: no matches found: post[TitleName]

伊始用这个老报错，还不懂**Ruby**语言，去查看了下，用环境变量做参数可以，没报错（ENV["Title"]来接收消息）。费了些功夫才找到的原因，参见[傳參數到 Rake 中](https://ihower.tw/blog/archives/3546)。所以这边自己稍微改了下原有的写法，比如新建一篇文章：

```rake
# Add 2016-03－01(rake post title="xx")
desc "Create a post in _posts"
task :new do
    puts "Input File Path(book/life/resource/tech/tool,default _posts Root)："
    @dir = STDIN.gets.chomp
    puts "Input File Name(for Url)："
	@url = STDIN.gets.chomp
	puts "Input Article Title(for Article)："
	@name = STDIN.gets.chomp
	puts "Input Article Categories(工具｜资源｜生活｜技术｜读书 Separated By Spaces)："
	@categories = STDIN.gets.chomp
    puts "Input Article Tags(Separated By ,)"
    @tags = STDIN.gets.chomp
    puts "Input Article Keywords(Separated By ,)"
    @keywords = STDIN.gets.chomp
    puts "Input Article Description(Article Desc)："
	@description = STDIN.gets.chomp

	@slug = "#{@url}"
	@slug = @slug.downcase.strip.gsub(' ', '-')
	@date = Time.now.strftime("%F")
    @post_url = (@dir=="") ? "" : ("/" + "#{@dir}");
	@post_name = "_posts#{@post_url}/#{@date}-#{@slug}.md"
	if File.exist?(@post_name)
	   abort("Failed to create the file name already exists !")
	end
	FileUtils.touch(@post_name)
	open(@post_name, 'a') do |file|
	    file.puts "---"
		file.puts "layout: post"
		file.puts "title: #{@name}"
		file.puts "date: #{Time.now}"
		file.puts "categories: #{@categories}"
        file.puts "tags: #{@tags}"
        file.puts "keywords: #{@keywords}"
        file.puts "description: #{@description}"
	    file.puts "---"
	end
	exec "vi #{@post_name}"
end
```

运用的话，只需要`rake new`开启命令，按照其提示的一步步输入：title categories tags keywords description 等

```bash
➜  nicejade.github.io git:(master) ✗ rake new
Input File Path(book/life/resource/tech/tool,default _posts Root)：
life
Input File Name(for Url)：
the pleasure of thinking
Input Article Title(for Article)：
思维的的乐趣
Input Article Categories(工具｜资源｜生活｜技术｜读书 Separated By Spaces)：
生活
Input Article Tags(Separated By ,)
Thinking,Essay
Input Article Keywords(Separated By ,)
思维的乐趣
Input Article Description(Article Desc)：
王小波散文随笔：思维的录乐趣
```
**Rake**即可帮着在 `_posts/life`目录下创建命名为“2016-03-26-the-pleasure-of-thinking.md”的文件，并根据所输入的生成以下内容：

```
---
layout: post
title: 思维的乐趣
date: 2016-03-26 00:22:39 +0800
categories: 生活
tags: Thinking,Essay
keywords: 思维的乐趣
description: 王小波散文随笔：思维的乐趣
---
```

接下来只管产出内容即可。当然了，之前提到需要一点配置，就是需要在`_config.yml`种对template,page,git等进行配置，譬如：
```yml
post:
  template: _post.txt
  extension: md
page:
  template: _page.txt
  extension: md
editor: atom
git:
  branch: master
transfer:
  command: rsync
  settings: -av
  source: _site/
  destination: ~/Git/yourGithubName.github.com/
```
对应可以按需在`_config.yml`目录下 创建**_post.txt** **_page.txt**即可；根据Html种**Meta**对于**SEO**的重要，以及站点分类需要，个人配置内容如下：
```
---
title:
date:
categories:
tags:
keywords:
description:
---
```
如此配置完毕，即可运行如下命令：
> rake new  // 新建文章
> rake post["TitleName"] // 生成纯净文章模版配置
> rake deploy "message"="Commit Message" //一键发布文章
> rake preview   //一键预览(还会自主协助打开浏览器)
>rake build      //Build the site
>rake post["Title"] //创建文章(tags,keywords等洁净的)

当然Rake强大远非如此，完全可以用它来编出些强大的脚本，以此节省人力；并且比之于晦涩难记的Makefile，Bat，它的学习成本也小了很多。这里这是浅显的记载它能为Jekyll写博带来的便利。以上改写脚本已上传这里[jadeScriptCollect](https://github.com/nicejade/jadeScriptCollect)，会根据需要持续更新。

折腾不是为折腾而折腾，只为偷懒而勤奋；简洁才是王道。

2016-03-26 于深圳。

>原文出自: http://www.jeffjade.com
原文链接：http://www.jeffjade.com/2016/03/26/2016-03-26-rakefile-for-jekyll/#