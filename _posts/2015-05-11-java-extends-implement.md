title: 浅谈java中extends与implements的区别
date: 2015-05-11 11:18:31
categories: Program
tags: Java 
---
　　Extends可以理解为<font color="blue">全盘继承</font>了父类的功能。implements可以理解为为这个类<font color="blue">附加一些额外的功能</font>；interface定义一些方法,并没有实现,需要implements来实现才可用。extend可以继承一个接口,但仍是一个接口,也需要implements之后才可用。对于class而言，Extends用于(单)继承一个类（class），而implements用于实现一个接口(interface)。

<!-- more -->

>interface的引入是为了部分地提供多继承的功能。
在interface中只需声明方法头，而将方法体留给实现的class来做。
这些实现的class的实例完全可以当作interface的实例来对待。
在interface之间也可以声明为extends（多继承）的关系。
注意一个interface可以extends多个其他interface。

　　在类的声明中，通过关键字extends来创建一个类的子类。一个类通过关键字implements声明自己使用一个或者多个接口。extends 是继承某个类, 继承之后可以使用父类的方法, 也可以重写父类的方法;implements 是实现多个接口, 接口的方法一般为空的, 必须重写才能使用.

　　extends是继承父类，只要那个类不是声明为final或者那个类定义为abstract的就能继承，JAVA中不支持多重继承，但是可以用接口 来实现，这样就要用到implements，继承只能继承一个类，但implements可以实现多个接口，用逗号分开就行了;比如 `class A extends B implements C,D,E`;

　　学了好久,今天终于明白了implements（实现接口就是在接口中定义了方法，这个方法要你自己去实现，接口可以看作一个标准，比如定义了一个动物的接口，它里面有吃（eat()）这个方法，你就可以实现这个方法implements，这个方法是自己写，可以是吃苹果，吃梨子，香蕉，或者其他的。IMPLEMENTS就是具体实现这个接口。）,其实很简单,看下面几个例子就ok啦~v~ 接口的一些概念：
``` java
public inerface Runner
{
  int ID = 1;
  void run ();
}
interface Animal extends Runner
{
  void breathe ();
}
class Fish implements Animal
{
  public void run ()
{
   System.out.println("fish is swimming");
}
public void breather()
{
   System.out.println("fish is bubbing");   
}
}
abstract LandAnimal implements Animal
{
  public void breather ()
{
   System.out.println("LandAnimal is breathing");
}
}
class Student extends Person implements Runner
{
   ......
   public void run ()
    {
         System.out.println("the student is running");
    }
   ......
}

interface Flyer
{
  void fly ();
}
class Bird implements Runner , Flyer
{
  public void run ()
   {
       System.out.println("the bird is running");
   }
  public void fly ()
   {
       System.out.println("the bird is flying");
   }
}
class TestFish
{
  public static void main (String args[])
   {
      Fish f = new Fish();
      int j = 0;
      j = Runner.ID;
      j = f.ID;
   }
}
```
接口实现的注意点：
a.实现一个接口就是要实现该接口的所有的方法(抽象类除外)。
b.接口中的方法都是抽象的。
c.多个无关的类可以实现同一个接口，一个类可以实现多个无关的接口。

---
**extends与implements的不同**: 一个类通过关键字implements声明自己使用一个或者多个接口。在类的声明中，通过关键字extends来创建一个类的子类。
```java
class 子类名 extends 父类名 implenments 接口名
{...
}
```

A a = new B(); 结果a是一个A类的实例，只能访问A中的方法。那么又和A a = new A();有什么区别呢？

class B extends A 继承过后通常会定义一些父类没有的成员或者方法。

A a = new B();这样是可以的，上传。a是一个父类对象的实例，因而不能访问子类定义的新成员或方法。

---
假如这样定义：
```java
class A{
    int i;
    void f(){}
}
class B extends A{
    int j;
    void f(){}//重写
    void g(){}
}
```
然后：B b = new B();
b就是子类对象的实例，不仅能够访问自己的属性和方法，也能够访问父类的属性和方法。诸如b.i,b.j,b.f(),b.g()都是合法的。此时 b.f()是访问的B中的f()

A a = new B();
a虽然是用的B的构造函数，但经过upcast，成为父类对象的实例，不能访问子类的属性和方法。a.i,a.f()是合法的，而a.j,a.g()非 法。此时访问a.f()是访问B中的f()

---
A a = new B(); 这条语句，实际上有三个过程：
(1) A a;将a声明为父类对象，只是一个引用，未分配空间
(2) B temp = new B();通过B类的构造函数建立了一个B类对象的实例，也就是初始化
(3) a = (A)temp;将子类对象temp转换未父类对象并赋给a，这就是上传(upcast)，是安全的。
经过以上3个过程，a就彻底成为了一个A类的实例。
子类往往比父类有更多的属性和方法，上传只是舍弃，是安全的；而下传(downcast)有时会增加，通常是不安全的。

---
a.f()对应的应该是B类的方法f();调用构造函数建立实例过后，对应方法的入口已经确定了。
如此以来，a虽被上传为A类，但其中重写的方法f()仍然是B的方法f()。也就是说，每个对象知道自己应该调用哪个方法。
A a1 = new B();
A a2 = new C();
a1,a2两个虽然都是A类对象，但各自的f()不同。这正是的多态性的体现。
这类问题在《Java编程思想》上都讲的很清楚.

　　**implements一般是实现接口。extends 是继承类。** 接口一般是只有方法声明没有定义的，那么java特别指出实现接口是有道理的，因为继承就有感觉是父类已经实现了方法，而接口恰恰是没有实现自己的方法，仅仅有声明，也就是一个方法头没有方法体。因此你可以理解成接口是子类实现其方法声明而不是继承其方法。但是一般类的方法可以有方法体，那么叫继承比较合理。引入包可以使用里面非接口的一切实现的类。那么是不是实现接口，这个你自己决定，如果想用到那么你不是实现，是不能调用这个接口的，因为接口就是个规范，是个没方法体的方法声明集合。我来举个例子吧：接口可以比作协议，比如我说一个协议是“杀人”那么这个接口你可以用 砍刀去实现，至于怎么杀砍刀可以去实现，当然你也可以用抢来实现杀人接口，但是你不能用杀人接口去杀人，因为杀人接口只不过是个功能说明，是个协议，具体怎么干，还要看他的实现类。那么一个包里面如果有接口，你可以不实现。这个不影响你使用其他类。

　　implements是一个类实现一个接口用的关键字，他是用来实现接口中定义的抽象方法。比如：people是一个接口，他里面有say这个方法。public interface people(){ public say();}但是接口没有方法体。只能通过一个具体的类去实现其中的方法体。比如chinese这个类，就实现了people这个接口。 
``` java
public class chinese implements people{ 
    public say() {
        System.out.println("你好！");
    }
}
```

　　在java中implements表示子类实现父类，如类A实现类B写成 class A implements B{}
与Extends的不同. extends， 可以实现父类，也可以调用父类初始化 this.parent()。而且会覆盖父类定义的变量或者函数。这样的好处是：架构师定义好接口，让工程师实现就可以了。整个项目开发效率和开发成本大大降低。
　　implements，实现父类，子类不可以覆盖父类的方法或者变量。即使子类定义与父类相同的变量或者函数，也会被父类取代掉。
　　这两种实现的具体使用，是要看项目的实际情况，需要实现，不可以修改implements，只定义接口需要具体实现，或者可以被修改扩展性好，用extends。

[原文链接](http://www.jb51.net/article/34512.htm)