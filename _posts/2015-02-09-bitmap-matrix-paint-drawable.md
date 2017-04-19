title: Drawable.Bitmap.Canvas.Paint.Matrix
date: 2015-02-09 13:00:00
categories: Android
tags: Android
description: 首先让我们理解下Android平台中的显示类是View，但是还提供了底层图形类android.graphics，今天所说的这些均为graphics底层图形接口。
toc: true
---

由于对Drawable、Bitmap、Canvas、Paint和 Matrix 的关系和使用 一直不太清楚，就在网上搜集了一下，摘录一些，主要来看这两篇文章:[Drawable、Bitmap、Canvas和Paint的关系以及部分使用方法](http://www.cnblogs.com/warioland/archive/2011/10/17/2215039.html)  和 Android显示系统之Pixel、Bitmap、Drawable、Canvas、Paint和Matrix之间的联系

<!--more-->

首先让我们理解下Android平台中的显示类是View，但是还提供了底层图形类android.graphics，今天所说的这些均为graphics底层图形接口。


<font color="green" size="+1">Bitmap </font>-- 称作位图，一般位图的文件格式后缀为bmp，当然编码器也有很多如RGB565、RGB888、ARGB8888。作为一种像素的显示对象 执行效率高，但是存储效率低的缺点也很明显。就理解为一种bmp格式图像存储对象。

<font color="green" size="+1">Drawable </font>-- 作为Android下通用的绘制图形对象，它可以装载常用格式的图像，比如GIF、PNG、JPG，当然也支持BMP，当然还提供一些高级的可视化对象，比如渐变、图形等。

<font color="green" size="+1">Canvas </font> -- 画布，我们可以看作是一种处理过程，使用各种方法来管理Bitmap、GL或者Path路径，同时它可以配合Matrix矩阵类给图像做旋转、缩放等操作，同时Canvas类还提供了裁剪、选取等操作。

<font color="green" size="+1">Paint</font> -- 可以把它看做一个画图工具，比如画笔、画刷。他管理了每个画图工具的字体、颜色、样式。 如果涉及一些Android游戏开发、显示特效可以通过这些底层图形类来高效实现自己的应用。

#### 1. Drawable to--> Bitmap  

BitmapDrawable 继承自 Drawable

    //方法一    
    Resources res;    
    InputStream is=res.openRawResource(R.drawable.pic);    
    BitmapDrawable bitmapDrawable=new BitmapDrawable(is);    
    Bitmap bmp=bitmapDrawable.getBitmap();    

    //方法二    
    Resources res;    
    BitmapDrawable bitmapDrawable=(BitmapDrawable)res.getDrawable(R.drawable.pic);    
    Bitmap bmp=bitmapDrawable.getBitmap();    

    //方法三    
    ImageView image；    
    image.setImageBitmap(BitmapFactory.decodeStream(~~~~));    
    BitmapDrawable bitmapDrawable=(BitmapDrawable)image.getDrawable();    
    Bitmap bmp=bitmapDrawable.getBitmap();  


#### 2. Bitmap to--> Drawable     

```java
Drawable d = new BitmapDrawable(bitmap);   

```

#### 3. 从资源中获取Bitmap

① 通过decodeResource,这种方式不可取，因为这些函数在完成decode后，最终都是通过java层的createBitmap来完成的，需要消耗更多内存。

    Resources res=getResources();  
    Bitmap bmp=BitmapFactory.decodeResource(res, R.drawable.pic);  
    ② 通过BitmapFactory.decodeStream方法，创建出一个bitmap (推荐)
    InputStream is = context.getResources().openRawResource(R.drawable.app_sample_code);  
    Bitmap bmp = BitmapFactory.decodeStream(is);  


#### 4. Bitmap to--> byte[]     

    private byte[] Bitmap2Bytes(Bitmap bm){     
        ByteArrayOutputStream byteos = new ByteArrayOutputStream();       
        bm.compress(Bitmap.CompressFormat.PNG, 100, byteos);       
        return byteos.toByteArray();     
    }  


#### 5. byte[] to--> Bitmap     

    private Bitmap Bytes2Bimap(byte[] byte){     
        if(byte.length!=0){     
            return BitmapFactory.decodeByteArray(byte, 0, byte.length);     
           }     
        else {     
            return null;     
        }     
     }  


#### 6. Matrix     

<font color="green" size="+1"> Matrix</font>为矩阵的意思，一般用来与Bitmap配合，实现图像的缩放、变形、扭曲等操作。

    public static Bitmap scaleBitmap(Bitmap bitmap, int scalWidth, int scaleHeight) {      
        int w = bitmap.getWidth();      
        int h = bitmap.getHeight();      
        // 创建操作图片用的Matrix对象      
        Matrix matrix = new Matrix();      
        // 计算缩放比例      
        float sx= ((float) scaleWidth / w);      
        float sy= ((float) scaleHeight / h);      
        // 设置缩放比例      
        matrix.postScale(sx, sy);      
        // 建立新的bitmap，其内容是对原bitmap的缩放后的图     
        Bitmap scaleBmp = Bitmap.createBitmap(bitmap, 0, 0, w, h, matrix, true);      
        return scaleBmp;      
    }

Matrix类的其他典型方法。

```java
boolean  postScale(float sx, float sy)//缩放    
boolean     postSkew(float kx, float ky)//扭曲    
boolean     postTranslate(float dx, float dy)//转换    
boolean     preConcat(Matrix other)//合并    
boolean     preRotate(float degrees)//旋转    
```

[原文链接地址](http://blog.csdn.net/ymangu666/article/details/39892353)
