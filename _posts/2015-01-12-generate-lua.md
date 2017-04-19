title: 生成lua的静态库.动态库.lua.exe和luac.exe
date: 2015-01-12
categories: Program
tags: Lua
---

前些日子准备学习下关于lua coroutine更为强大的功能，然而发现根据lua 5.1.4版本来运行一段代码的话也会导致 <font color="purple">“lua: attempt to yield across metamethod/C-call boundary”</font>的错误(据悉主线程中调用yield也会如此)。
于是就想使用5.2以上的版本试试;windows下没有5.2以上的版本，又不愿意使用VS编译出lua.exe;就在网上搜索下了关于使用命令行生成lua的静态库.动态库.lua.exe和luac.exe资料:现整理如下：

<!-- more -->

将下载的lua源码解压,在src目录下 打开[VC命令行](#jump)提示窗口 执行如下代码即可(针对5.1):
 
生成~~~ 静态库：
```
del *.obj liblua.lib
 
cl -c -nologo -O2 -Ob1 -Oi -Gs -MT lapi.c lcode.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c ldblib.c liolib.c lmathlib.c loslib.c ltablib.c lstrlib.c loadlib.c linit.c
 
link -lib -out:liblua.lib -verbose:lib *.obj
```
生成~~~ 动态库： 
```
del *.obj liblua.dll
 
cl -c -nologo -O2 -Ob1 -Oi -Gs -MT -DLUA_BUILD_AS_DLL lapi.c lcode.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c ldblib.c liolib.c lmathlib.c loslib.c ltablib.c lstrlib.c loadlib.c linit.c
 
link -link -dll -out:liblua.dll -verbose:lib *.obj
```
 
生成~~~ lua.exe：
```
del *.obj lua.exe
 
cl -c -nologo -O2 -Ob1 -Oi -Gs -MT lapi.c lcode.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c ldblib.c liolib.c lmathlib.c loslib.c ltablib.c lstrlib.c loadlib.c linit.c lua.c
 
link -link  -out:lua.exe -verbose:lib *.obj
```
生成~~~ luac.exe：

```
del *.obj luac.exe
 
cl -c -nologo -O2 -Ob1 -Oi -Gs -MT lapi.c lcode.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c ldblib.c liolib.c lmathlib.c loslib.c ltablib.c lstrlib.c loadlib.c linit.c print.c luac.c
 
link -link -out:luac.exe -verbose:lib *.obj
```
-----  

以上是针对5.1.4的;想比较于5.2而言,变动还是蛮大的，就需要根据源码中Doc目录下readme.html所提醒的去编译：

比如我要编译5.2.3,生成lua.exe的话，执行之下代码即可：

del *.obj lua.exe   
``` 
cl -c -nologo -O2 -Ob1 -Oi -Gs -MT lapi.c lcode.c lctype.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c lbitlib.c lcorolib.c ldblib.c liolib.c lmathlib.c loslib.c lstrlib.c ltablib.c loadlib.c linit.c lua.c  

link -link  -out:lua.exe -verbose:lib *.obj  
```
Building Lua on other systems(eg:windows)原文如下：
If you're not using the usual Unix tools, then the instructions for building Lua depend on the compiler you use. You'll need to create projects (or whatever your compiler uses) for building the library, the interpreter, and the compiler, as follows:

>library:
lapi.c lcode.c lctype.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c lbitlib.c lcorolib.c ldblib.c liolib.c lmathlib.c loslib.c lstrlib.c ltablib.c loadlib.c linit.c

>interpreter:
library, lua.c

>compiler:
library, luac.c

如若编译时选得参数和版本不太一致就会出现类似的错误:
>linit.obj : error LNK2001: 无法解析的外部符号 _luaopen_coroutine
>linit.obj : error LNK2001: 无法解析的外部符号 _luaopen_bit32

-----   

<span id = "jump">VC命令行</span>:可配置VS or VC环境变量,也可采取如下方法设置下即可:

**运行脚本vsvars32.bat：**
D:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\Tools\vsvars32.bat

* 这个批处理 主要就是在运行CMD的时候先为我们设置一下环境变量(临时的) (这个脚本中写入的是bin, lib,include , tools的路径信息，也可以自己配置)

* 抑或可以参考 [这里](http://www.cppblog.com/ownwaterloo/archive/2009/04/15/80059.aspx) or [这里](http://www.cnblogs.com/bluestorm/p/3321558.html)

<script type="text/javascript" src="http://blogparts.giffy.me/0013/parts.js"></script>

-----