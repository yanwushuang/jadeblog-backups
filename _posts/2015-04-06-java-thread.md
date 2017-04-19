title: 多线程基础之Runnable/Thread与Callable
date: 2015－04-06 11:30
categories: Program
tags: Java
description:
---

java.lang包下有二个非常有用的东西：Runnable接口与Thread类，Thread实现了Runnable接口（可以认为Thread是Runnable的子类），利用它们可以实现最基本的多线程开发。Runnable方式可以避免Thread 方式由于JAVA单继承特性带来的缺陷。Runnable的代码可以被多个线程(Thread实例)共享，适合于多个线程处理同一资源的情况。

<!-- more -->
线程的分类: 
* 用户线程:运行在前台，执行具有的任务程序的主线程，连接网络的子线程等都是用户线程

* 守护线程:运行在后头，为其他前台线程服务。一旦所有用户线程都结束运行，守护线程会随JVM一起结束工作。可以通过调用Thread类的setDaemon(true)方法来设置当前的线程为守护线程，该方法必须在start()方法之前调用，否则会抛出 IllegalThreadStateException异常。在守护线程中产生的新线程也是守护线程。不是所有的任务都可以分配给守护线程来执行，比如读写操作或者计算逻辑。

## 一、Runnable入门示例

```java   
public class RunnableDemo1 {

    public static void main(String[] args) {
        new Runnable() {
            public void run() {
                for (int i = 0; i < 5; i++) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("r1 -> i=" + i);
                }

            }
        }.run();

        new Runnable() {
            public void run() {
                for (int i = 0; i < 5; i++) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("r2 -> i=" + i);
                }
            }
        }.run();
    }
}
```
复制代码
代码很简单，每个线程依次输出0-4这5个数字，运行结果：

r1 -> i=0
r1 -> i=1
r1 -> i=2
r1 -> i=3
r1 -> i=4
r2 -> i=0
r2 -> i=1
r2 -> i=2
r2 -> i=3
r2 -> i=4

## 二、向Runnable传递参数

实际应用中，线程开始处理前，通常会有一些初始参数，如果要传入参数，可以参考下面的方法，先定义一个Runnable的子类

```java  
package com.cnblogs.yjmyzz;
public class MyRunnable implements Runnable{
    
    private String name;
    private int max;
    
    public MyRunnable(String name,int max){
        this.name = name;
        this.max = max;
    }

    public void run() {
        for (int i = 1; i <= max; i++) {
            try {
                Thread.sleep(5);
                System.out.println(name + ".i=" + i);
            } catch (InterruptedException e) {                    
                e.printStackTrace();
            }                
        }            
    }   
}
```
然后这样使用：
```java
package com.cnblogs.yjmyzz;

public class RunnableDemo2 {

    public static void main(String[] args) {
        
        new MyRunnable("A", 5).run();
        
        new MyRunnable("B", 5).run();
    }

}
```
运行结果：
A.i=1
A.i=2
A.i=3
A.i=4
A.i=5
B.i=1
B.i=2
B.i=3
B.i=4
B.i=5

## 三、利用Thread并行处理

刚才的二个例子，相当大家也发现了问题，虽然是有二个线程，但是始终是按顺序执行的，上一个线程处理完成前，下一个线程无法开始，这其实跟同步处理没啥二样，可以通过Thread类改变这种局面：

```java 
public class RunnableDemo3 {
    public static void main(String[] args) {

        Runnable r1 = new MyRunnable("A", 5);
        Runnable r2 = new MyRunnable("B", 5);
        
        Thread t1 = new Thread(r1);
        Thread t2 = new Thread(r2);
        
        t1.start();
        t2.start();
        
    }
}
```
Thread通过start方法，可以让多个线程并行处理，运行结果如下：

B.i=1
A.i=1
B.i=2
A.i=2
B.i=3
A.i=3
B.i=4
A.i=4
B.i=5
A.i=5

从输出结果上看，二个线程已经在并行处理了。

## 四、通过在线抢购示例理解资源共享
双十一一过，每到这个时候，通常是狼多肉少，下面的OrderRunnable类模拟这种抢购情况，假设产品数只有10个，抢购的客户却有100个
```java 
package com.cnblogs.yjmyzz;

public class OrderRunnable implements Runnable{
    
    String taskName;
    
    public OrderRunnable(String taskName){
        this.taskName=taskName;
    }

    private int productNum = 10;
    private int customerNum = 100;

    public void run() {
        for (int i = 0; i < customerNum; i++) {
            if (productNum > 0) {
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {                    
                    e.printStackTrace();
                }
                System.out.println(taskName + " -> order success!");
                productNum -= 1;
            }
        }
    }
}
```

现在想用二个线程来处理：
```java
package com.cnblogs.yjmyzz;

public class RunnableDemo4 {

    public static void main(String[] args) {

        Runnable r1 = new OrderRunnable("A");
        Runnable r2 = new OrderRunnable("B");
        
        new Thread(r1).start();
        new Thread(r2).start();
    }
}
```
运行结果：

A -> order success!
B -> order success!
B -> order success!
A -> order success!
B -> order success!
A -> order success!
A -> order success!
B -> order success!
B -> order success!
A -> order success!
B -> order success!
A -> order success!
A -> order success!
B -> order success!
A -> order success!
B -> order success!
A -> order success!
B -> order success!
A -> order success!
B -> order success!

显然，这个结果不正确，只有10个产品，却生成了20个订单！
正确的做法，让多个Thread共同使用一个Runnable：
```java
package com.cnblogs.yjmyzz;
public class RunnableDemo5 {

    public static void main(String[] args) {

        Runnable r1 = new OrderRunnable("A");        
        
        new Thread(r1).start();
        new Thread(r1).start();
    }
}
```
执行的结果如下：
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!
A -> order success!

## 五、ThreadPoolExecutor
如果有大量线程，建议使用线程池管理，下面是ThreadPoolExecutor的示例用法：
``` java
package com.cnblogs.yjmyzz;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class RunnableDemo7 {

    public static void main(String[] args) {        

        ThreadPoolExecutor threadPool = new ThreadPoolExecutor(2, 10, 1,
                TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(3));
        
        for (int i = 0; i < 6; i++) {
            threadPool.execute(new MyRunnable("R"+i, 5));
        }
    }
}
```

[ThreadPoolExecutor几点使用建议](http://www.iteye.com/topic/1118660)
[ThreadPoolExecutor](http://jiaguwen123.iteye.com/blog/1017636)
![ThreadPoolExecutor](http://images.cnitblog.com/blog/27612/201411/131555523973501.jpg)

## 六、ThreadPoolTaskExecutor
终于轮到我大Spring出场了，Spring框架提供了org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor类，可以用注入的形式生成线程池
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx" xmlns:jdbc="http://www.springframework.org/schema/jdbc"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
     http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
     http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
     http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-3.0.xsd
     http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
     http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd"
    default-autowire="byName">

    <bean id="threadPoolTaskExecutor"
        class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
        <property name="corePoolSize" value="2" />
        <property name="maxPoolSize" value="10" />
        <property name="queueCapacity" value="1000" />
        <property name="keepAliveSeconds" value="15" />
        <property name="rejectedExecutionHandler">
            <bean class="java.util.concurrent.ThreadPoolExecutor$CallerRunsPolicy" />
        </property>
    </bean>

</beans>
```
配置好以后，就可以直接使用了

```java
package com.cnblogs.yjmyzz;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

public class RunnableDemo8 {

    @SuppressWarnings("resource")
    public static void main(String[] args) {

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext(
                "spring.xml");
        ThreadPoolTaskExecutor taskExecutor = applicationContext.getBean(
                "threadPoolTaskExecutor", ThreadPoolTaskExecutor.class);

        for (int i = 0; i < 6; i++) {
            taskExecutor.execute(new MyRunnable("R" + i, 5));
        }
    }
}
```

## 七、FutureTask<T>
如果某些线程的处理非常耗时，不希望它阻塞其它线程，可以考虑使用FutureTask，正如字面意义一样，该线程启用后，马上开始，但是处理结果将在"未来"某一时刻，才真正需要，在此之前，其它线程可以继续处理自己的事情
```java
package com.cnblogs.yjmyzz;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class RunnableDemo9 {

    public static void main(String[] args) throws InterruptedException,
            ExecutionException {

        FutureTask<String> task = new FutureTask<String>(
                new Callable<String>() {
                    public String call() throws InterruptedException {
                        System.out.println("FutureTask开始处理...");
                        Thread.sleep(1000);
                        return "hello world";
                    }
                });
        System.out.println("FutureTask准备开始...");
        new Thread(task).run();
        System.out.println("其它处理开始...");
        Thread.sleep(1000);
        System.out.println("其它处理完成...");
        System.out.println("FutureTask处理结果：" + task.get());
        System.out.println("全部处理完成");
    }
}
```

二个注意点：

a) FutureTask使用Callable接口取得返回值，因为结果可能并不需要立刻返回，而是等到未来真正需要的时候，而Runnable并不提供返回值

b) FutureTask通过Thread的run()或start()调用后，马上就开始处理，但并不阻塞后面的线程，在真正需要处理结果的时候，调用get()方法，这时如果FutureTask本身的处理尚未完成，才会阻塞，等待处理完成

刚才的运行结果：

    FutureTask准备开始...
    FutureTask开始处理...
    其它处理开始...
    其它处理完成...
    FutureTask处理结果：hello world
    全部处理完成

可以看到，“其它处理”并未被FutureTask阻塞，但FutureTask其实已经在后台处理了。

总结：
>在我们刚接触的时候可能会迷糊继承Thread类和实现Runnable接口实现多线程，其实在接触后我们会发现这完全是两个不同的实现多线程，一个是多个线程分别完成自己的任务，一个是多个线程共同完成一个任务。

>其实在实现一个任务用多个线程来做也可以用继承Thread类来实现只是比较麻烦，一般我们用实现Runnable接口来实现，简洁明了。

>大多数情况下，如果只想重写 run() 方法，而不重写其他 Thread 方法，那么应使用 Runnable 接口。这很重要，因为除非程序员打算修改或增强类的基本行为，否则不应为该类（Thread）创建子类。


[参考传送门－菩提树下的杨过](http://www.cnblogs.com/yjmyzz/p/runnable-callble-and-thread-in-java.html)
[Java中继承thread类与实现Runnable接口的区别](http://mars914.iteye.com/blog/1508429)
