title: Android子线程更新UI主线程方法之Handler
date: 2015-01-16
categories: Program
tags: Java
---

我们开发应用程序的时候，处于线程安全的原因子线程通常是不能直接更新主线程（UI线程）中的UI元素的，那么在Android开发中有几种方法解决这个问题，其中方法之一就是利用Handler处理的。

<!--more-->

下面说下有关Handler相关的知识。

多线程一些基础知识回顾：
在介绍Handler类相关知识之前，我们先看看在Java中是如何创建多线程的
方法有两种：

* 通过继承Thread类，重写Run方法来实现
* 通过继承接口Runnable实现多线程

具体两者的区别与实现，看看 [这篇文章](http://developer.51cto.com/art/201203/321042.htm) 中的介绍;

接下来让我们看看Handler是什么？如何来用~~

Handler是这么定义:**主要接受子线程发送的数据, 并用此数据配合主线程更新UI.**
Handler的主要作用：**主要用于异步消息的处理**

**Handler的运行过程：**
当（子线程）发出一个消息之后，首先进入一个（主线程的）消息队列，发送消息的函数即刻返回，而在主线程中的Handler逐个的在消息队列中将消息取出，然后对消息进行处理。这样就实现了跨线程的UI更新（实际上还是在主线程中完成的）。
这种机制通常用来处理相对耗时比较长的操作，如访问网络比较耗时的操作，读取文大文件，比较耗时的操作处理等。

**在大白话一点的介绍它的运行过程：**
启动应用时Android开启一个主线程 (也就是UI线程) , 如果此时需要一个耗时的操作，例如: 联网读取数据，或者读取本地较大的一个文件的时候，你不能把这些操作放在主线程中，如果你放在主线程中的话，界面会出现假死现象（这也就是你在主线程中直接访问网络时会提示你异常的原因, [如下所述](#jump)）。

这个时候我们需要把这些耗时的操作，放在一个子线程中,因为子线程涉及到UI更新，Android主线程是线程不安全的，更新UI只能在主线程中更新.。
这个时候，Handler就出现了,来解决这个复杂的问题,由于Handler运行在主线程中(UI线程中), 它与子线程可以通过Message对象来传递数据, 这个时候，Handler就承担着接受子线程传过来的(子线程用sedMessage()方法传弟)Message对象，(里面包含数据) , 把这些消息放入主线程队列中，配合主线程进行更新UI。


#### 接下来我们看看关于Handler都有哪些方法（它都能干什么）:
其中Handler对象的一些主要方法，如下：

>post(Runnable) postAtTime(Runnable,long)  
postDelayed(Runnable long)  
sendEmptyMessage(int)  
sendMessage(Message)  
sendMessageAtTime(Message,long)  
>sendMessageDelayed(Message,long)  

正如方法名字中看到的，有两类方法：
(1)在某个主线程中执行Runnable
(2)在子线程中发送一个消息，在主线程中检测该消息处理

线程间传递Message对象的sendMessage方法和发送Runnable多线程对象的post方法。正对应着上面所说的两个特性1）、2）

**下面开发个Handler实例做说明：**

用post的方法执行一个Runnable对象，在该对象中随机产生一个10~100之间的随机数，赋值到UI主线程中的TextView中线程，执行5次，每次相隔5秒， 拼接每次的数字， 最后执行结果应该如: 10 22 33 44 61

主要代码如下：

```java
    int i = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        handler.post(run);
    }

    Handler handler = new Handler(){
        @Override
        public void handleMessage(Message msg){
            String s = String.valueOf(msg.what);
            TextView tv = (TextView)findViewById(R.id.textView);
            tv.setText(tv.getText() + ” ” + s);
        }
    };

    Runnable run = new Runnable(){
        @Override
        public void run(){
            Random r = new Random();
            int rnum = r.nextInt((100 – 10) + 1) + 10;
            handler.sendEmptyMessage(rnum);
            handler.postDelayed(run, 5000);
            i++;
            if (i==5){
                handler.removeCallbacks(run);
            }
        }
    };
```
<span id = "jump">**Android主线程不能访问网络异常解决办法:**</span>
从两个方面说下这个问题：
1. 不让访问网络的原因
2. 解决该问题的办法

**不让访问网络的原因：**
由于对于网络状况的不可预见性，很有可能在网络访问的时候造成阻塞，那么这样一来我们的主线程UI线程 就会出现假死的现象，产生很不好的用户体验。所以，默认的情况下如果直接在主线程中访问就报出了这个异常，名字是NetworkOnMainThreadException

**解决该问题的办法：**
1. 独立线程
2. 异步线程AsyncTask
3. StrictMode修改默认的策略

#### 1) 独立线程的办法

启动一个新线程的代码：

```java
    new Thread(){
        @Override
        public void run() {
            Dosomething();
            handler.sendEmptyMessage(0);
        }
    }.start();
```

此处我们重写了线程类的run方法，执行Dosomething. 在里面还有个handler对象，这又涉及到了跨线程修改UI元素内容的问题。在java中是不允许跨线程修改UI元素的，如我们在新启动的线程中想去修改UI主线程中TextView的文本时，会报错误的。如果想做这样的操作，我们就得借助Handler这个类来实现。 关于这个handler类的用法，我们单独的再来写一篇博客进行介绍。

#### 2) 异步调用的方法 AsyncTask

这里关于AsyncTask 介绍的文章不错， 详细情况看作者的介绍吧 :[Click Here](http://www.cnblogs.com/dawei/archive/2011/04/18/2019903.html#2824345)
接下来也将会有一篇博客专门介绍 关于更新主线程UI线程的所有办法

#### 3) StrictMode修改默认的策略

在我们的Activity类的onCreate方法中，设置如下规则：

```java
    StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
    StrictMode.setThreadPolicy(policy);
```

这样也可以解决这个问题

关于StrictMode的具体介绍，请看 [这个博客](http://hb.qq.com/a/20110914/000054.htm) 介绍的非常详细：
