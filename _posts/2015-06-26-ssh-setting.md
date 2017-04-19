title: 如何设置添加SSH
date: 2015-06-26 22:18:37
categories: Toss
tags: SSH
---

去(2014)年有开始折腾个人Blog；从使用Jekll到Hexo，平台也从Github一度迁移至国内的Gitcafe（Hexo创建/测试/发布Blog都极为方便，也很易扩展；而Gitcafe在国内访问相对速度快很多）。但由于各种原因Gitcafe很多时候会出些意外，折腾起来有些力不从心了，就还是被迫回归于Github（虽然Gitcafe这个团队很努力地致力于这一块，但...）参考这篇[Hexo搭建Github静态博客](http://www.cnblogs.com/zhcncn/p/4097881.html)倒时很容易将托管平台从Gitcafe迁移至Github（事实上只需要在_config.yml更改托管地址映射即可）；但是过程中总还会遇到些小问题：比如这SSH的设置，已经搞了几次了，但对于机制没搞明白，过段时间就忘了，索性弄个明白且纪录在案，以便来日。

<!-- more -->

## 何谓这SSH[度娘词条](http://baike.baidu.com/link?url=ItHZRnllfl4yFExmdbjJJKVDvRZ8Q0BPZEphP1Kzoi6-tQtfsRT9pmfYhisdp5nC49E993Y0jMtS8n3dxZ_6iaApM8ozGyjEewk95jCtN5q)？
SSH 为 Secure Shell 的缩写，由 IETF 的网络工作小组（Network Working Group）所制定；SSH 为建立在应用层和传输层基础上的安全协议。SSH 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。SSH最初是UNIX系统上的一个程序，后来又迅速扩展到其他操作平台。SSH在正确使用时可弥补网络中的漏洞。SSH客户端适用于多种平台。几乎所有UNIX平台—包括HP-UX、Linux、AIX、Solaris、Digital UNIX、Irix，以及其他平台，都可运行SSH。

## 这SSH的功用[度娘词条](http://baike.baidu.com/link?url=ItHZRnllfl4yFExmdbjJJKVDvRZ8Q0BPZEphP1Kzoi6-tQtfsRT9pmfYhisdp5nC49E993Y0jMtS8n3dxZ_6iaApM8ozGyjEewk95jCtN5q)
传统的网络服务程序，如：ftp、pop和telnet在本质上都是不安全的，因为它们在网络上用明文传送口令和数据，别有用心的人非常容易就可以截获这些口令和数据。而且，这些服务程序的安全验证方式也是有其弱点的， 就是很容易受到“中间人”（man-in-the-middle）这种方式的攻击。所谓“中间人”的攻击方式， 就是“中间人”冒充真正的服务器接收你传给服务器的数据，然后再冒充你把数据传给真正的服务器。服务器和你之间的数据传送被“中间人”一转手做了手脚之后，就会出现很严重的问题。通过使用SSH，你可以把所有传输的数据进行加密，这样"中间人"这种攻击方式就不可能实现了，而且也能够防止DNS欺骗和IP欺骗。使用SSH，还有一个额外的好处就是传输的数据是经过压缩的，所以可以加快传输的速度。SSH有很多功能，它既可以代替Telnet，又可以为FTP、PoP、甚至为PPP提供一个安全的"通道"。

## **Https 和 SSH 的区别：**
之前自己在用github管理项目的时候，都是直接使用https url克隆到本地，当然也有有些人使用 SSH url 克隆到本地。然而，为什么绝大多数人会使用https url克隆呢？

这是因为，使用https url克隆对初学者来说会比较方便，复制https url 然后到 git Bash 里面直接用clone命令克隆到本地就好了。而使用 SSH url 克隆却需要在克隆之前先配置和添加好 SSH key 。因此，**如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。** 以下是两者的区别：

1. 前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2. https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

## **在Github上添加SSH key的步骤：**
### **1、首先需要检查你电脑是否已经有 SSH key**
运行 git Bash 客户端，输入如下代码：
```
$ cd ~/.ssh
$ ls
```
这两个命令就是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，那么你可以跳过步骤2，直接进入步骤3。

### **2、创建一个 SSH key**
$ ssh-keygen -t rsa -C "your_email@example.com"
代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，因此，运行上面那条命令后会让你输入一个文件名，用于保存刚才生成的 SSH key 代码，如：

Generating public/private rsa key pair.
\# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
当然，你也可以不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。

接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），
当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码，直接提交到github上了，如：

>Enter passphrase (empty for no passphrase):
Enter same passphrase again:

接下来，就会显示如下代码提示，如：

Your identification has been saved in /c/Users/you/.ssh/id_rsa.
\# Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
\# The key fingerprint is:01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
当你看到上面这段代码的收，那就说明，你的 SSH key 已经创建成功，你只需要添加到github的SSH key上就可以了。

### **3、添加你的SSH key 到 github上面去**
a、首先你需要拷贝 id_rsa.pub 文件的内容，你可以用编辑器打开文件复制，也可以用git命令复制该文件的内容，如：

$ clip < ~/.ssh/id_rsa.pub
b、登录你的github账号，从又上角的设置（ Account Settings ）进入，然后点击菜单栏的 SSH key 进入页面添加 SSH key。

c、点击 Add SSH key 按钮添加一个 SSH key 。把你复制的 SSH key 代码粘贴到 key 所对应的输入框中，记得 SSH key 代码的前后不要留有空格或者回车。当然，上面的 Title 所对应的输入框你也可以输入一个该 SSH key 显示在 github 上的一个别名。默认的会使用你的邮件名称。

### **4、测试一下该SSH key**
在git Bash 中输入以下代码
```
$ ssh -T git@github.com
```
当你输入以上代码时，会有一段警告代码，如：

>The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?

这是正常的，你输入 yes 回车既可。如果你创建 SSH key 的时候设置了密码，接下来就会提示你输入密码，如：

Enter passphrase for key '/c/Users/Administrator/.ssh/id_rsa':
当然如果你密码输错了，会再要求你输入，知道对了为止。

注意：输入密码时如果输错一个字就会不正确，使用删除键是无法更正的。

密码正确后你会看到下面这段话，如：
>Hi username! You've successfully authenticated, but GitHub does not
provide shell access.

**如果用户名是正确的,你已经成功设置SSH密钥。如果你看到 “access denied” ，者表示拒绝访问，那么你就需要使用 https 去访问，而不是SSH。**事实上此次折腾Blog，最终Deploy本地Hexo-Blog，因为“access denied”用的还是https方式。

总结一下即是：使用`ssh-keygen -t rsa -C "your_email@example.com"`命令，为其取一个名字将生成的keyValue存起来(也可以不取，默认是id_rsa和id_rsa.pub；让输入的密码也是可取可不取)；然后将id_rsa.pub中de内容复制到各个平台(同github设置方法一直，其他如Gitcafe/Git@OSC等等也是如此)addSSHKey处即可。

原文链接：https://help.github.com/articles/generating-ssh-keys/
参考链接: http://blog.csdn.net/binyao02123202/article/details/20130891
