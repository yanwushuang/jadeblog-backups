title: 浅谈android中的目录结构
date: 2015-01-08
categories: Android
tags: Android
---

***
之前在android游戏开发中就遇到本地数据存储的问题：一般情形之下就将动态数据写入SD中存储，在没有SD卡的手机上就需另作处理了;再有在开发android应用的过程中，总要去调试APP,安装时又想去了解android的目录结构。然后在网络上搜到了一点材料，整理如下:

<!--more-->

先行说明下几个专业术语：

内部存储┐==内部存储一般是指用户可以使用的空间位于"/data"    
系统存储├─物理位置是位于手机内部的非易失性存储器上，就是俗称的ROM   
系统缓存┘==系统缓存是存放在"/cache"下的   

内存 ———物理位置是位于手机内部的随机存储器上，就是俗称的RAM
RAM:相当于电脑里面的内存条，掉电不能保存用户数据，运行速度比较快。一般的Ram空间为512M~1G

ROM:相当于一块硬盘=微硬盘能持久的储存一些数据，如手机掉电，之前的用户数据依然会被保存,，一般空间为1G~32G

SD卡：相当于一个外部的U盘，不是一个必须设备(有内置和外置的,如今的智能机大多都有内置的蛮大空间)

而android系统是基于linux系统建立的，她的分区结构跟windows不同，没有C盘D盘的，系统存储是、系统缓存、内部存储分别都是不同的分区，每个分区的大小是在系统建立的时候就分配好了的，一般人是无法更改的

就相当于系统存储是windows的C盘，系统缓存相当于windows的临时文件夹
内部存储就相当于windows的其他盘，android系统中，“/”以及“/system”等目录是用于系统存储的，（“/”是系统的根目录）比如“/system/app”是指系统软件的存放目录

---

Google Android手机的软件为了安全性和稳定性都是默认安装到手机内存里，但是手机内存有限，所以我们会做app2sd操作，来让我们安装的软件放到sd卡上，这个操作是需要rom的支持的。

Android 2.2 可以将手机程序安装在外置的sd卡上，也就是我们平常所说的app2sd。但是，官方的app2sd(application to Secure Digital)**[Google的Android系统是基于Linux的，所以存储卡上本身的Fat格式是不会被识别的，所以我们要分区（第二分区）出来，格式化成Linux认识的ext2或3或4格式，再用链接命令，把这个分区映射成一个系统文件夹system/sd，把所有的软件装到这个“文件夹”下，这就是App2sd功能的操作过程。   同时安装在SD卡中的软件或者游戏还是需要占用手机的内存的，因为放在SD卡当中的只是文件本身，而运行文件还是放在手机内存中。因此，App2sd的操作其实是牺牲了一部分软件的速度和稳定性来换取更多的手机内存安装更多的软件。]**非常鸡肋，需要软件自身支持安装在内存卡上才可以，也就是说用官方的app2sd，要把程序安装在内存卡上，并不是我们使用者说了算，而是软件开发者说了算。经测试安装60多个软件，其中仅有可怜的5个程序能使用官方的app2sd安装在内存卡上。所以，官方的这个app2sd就是忽悠人的。当然，现在很多第三方ROM都自带了第三方的app2sd，可以将任何程序都安装在sd卡上。

在正式介绍app2sd之前，我先要介绍下android系统的几个比较重要的目录，这是理解后面内容的基础。

>/system 存放的是rom的信息；
>/system/app 存放rom本身附带的软件即系统软件；
>/system/data 存放/system/app 中核心系统软件的数据文件信息。
>/data 存放的是用户的软件信息（非自带rom安装的软件）；
>/data/app 存放用户安装的软件；
>/data/data 存放所有软件（包括/system/app 和 /data/app 和 /mnt/asec中装的软件）的一些lib和xml文件等数据信息；
>/data/dalvik-cache 存放程序的缓存文件，这里的文件都是可以删除的。
>/mnt 目录，熟悉linux的人都清楚，linux默认挂载外部设备都会挂到这个目录下面去，如将sd卡挂载上去后，会生成一个/mnt/sdcard 目录。
>/sdcard 目录，这是一个软链接（相当于windows的文件夹的快捷方式），链接到/mnt/sdcard 目录，即这个目录的内容就是sdcard的内容。


在Android 2.2之后的版本允许将应用程序安装于SD卡，每一个安装在SD卡的应用程序，都可以在SD卡中的/sdcard/.android_secure 目录里找到名称中有出现它的程序名，和副文件名为asec的经过特殊加密处理后的档案。当SD卡挂载于手机时，/mnt/sdcard/.android_secure 目录会被映射到/mnt/asec 目录和 /mnt/secure 目录。其中/mnt/asec  目录中主要是程序的安装目录，包括其执行文件和lib文件等；而/mnt/secure 目录中就存放程序加密后的档案。也就是说，在/mnt路径下看到的/mnt/asec目录和/mnt/secure目录并不是真正存在在手机内存或者sd卡的分区挂载目录，它们只是/mnt/sdcard/.android_secure目录的一个影像而已。

因此，用户程序安装到到sd卡上后，其内容可能分散到：/mnt/asec , /mnt/secure , /data/data 。

要实现app2sd，目前比较流行有两种方案，分别是app2ext 和 data2ext，下面分别介绍下这2种方案。

在Linux文件系统中，有一种特别的文件叫“软链接”，类似于Windows下的快捷方式，软链接可以把一个文件或者文件夹映射到别的地方，一个例子如上面介绍的/sdcard 就是/mnt/sdcard 的软链接。

**app2ext**的原理是，删除data区中的app文件夹，然后在sd卡的ext分区上创建一个app文件，并通过软链接映射到data区。这样系统会以为，app这个软链接是一个真实的文件夹，会把程序都安装在里面，但实际上，这些程序都安装到卡上了。但由于操作系统并不知道，所以这种情况下，我们依然看到系统显示这个程序是安装在“内置空间”的。

**data2ext**则更彻底，它不是用软链接，而是直接用“挂载”功能，Linux下所有的存储设备都必须挂载成一个文件夹才能进行文件操作（如sd卡就挂载在/mnt/sdcard目录下面）。data文件夹本来是对应手机内部Flash中的一个分区（为了保持术语的准确，这里要把内部Flash和内存相区别，内部Flash是ROM，内存是RAM）。而data2ext则是修改了挂载对应关系，使data文件夹挂载的不是内置Flash，而是sd卡的整个ext分区。这样，不仅是app，连存储程序设置的data和缓存dalvik-cache都会存储到sd卡中。

可以看到，dalvik-cache和data这两个文件夹的位置，是这两种方式的一个重大区别。其中dalvik-cache是虚拟机预编译缓存，data（不同于/data，这个是/data/data）是存储程序数据的地方，例如游戏的存档记录，软件的配置信息等。这样有什么区别，区别在于假如你重刷了ROM，app2ext的话，所有的程序都可以保留，但是这些程序的配置信息和游戏的存档都会丢失。而data2ext则可以连同配置和存档都保留，但是dalvik-cache也是一个容易积累垃圾的地方，这些垃圾也会一同保留。
data2ext由于是把整个data分区都放在sd卡上，因此，我们刷ROM需要WIPE的时候，这个data分区的内容就可能不会被wipe，这可以保存用户的个人资料，但是也可能造成系统莫名其妙的故障。

以下是保存用户输入数据到rom,sd,cache等代码:

``` java
	public  class FileService {
		/**
		 * save data to phone rom
		 * @param context  上下文
		 * @param fileName  保存的文件名
		 * @param name      用户名
		 * @param password   密码
		 * @return
		 */
	   public static boolean saveToRom(Context context,String fileName,String name,String password){
		    // File file = new File("/data/data/cn.itcast.login/a.txt");
		    //相当于存储到/data/dat/packageName/目录下
			File file = new File(context.getFilesDir(), fileName);
			// 如果没有指定访问的模式 ,文件的模式 默认是私有的权限.
			// 只有当前的应用程序可以读写这个文件 ,别的应用程序是不可以操作这个文件.
		   try {
			FileOutputStream fos=new FileOutputStream(file);
			fos.write((name+":"+password).getBytes());
			fos.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	   }

	   /**
		 * 保存数据到手机的rom空间的缓存目录
		 * 作用 保存应用程序的临时数据, 在手机内存不足的时候 系统会释放掉这块空间
		 * 用户也可以手工的释放掉这块空间
		 * @param context 上下文
		 * @param filename 保存的文件名
		 * @param name 用户名
		 * @param password 密码
		 * @return
		 */
	   public static boolean saveToRomCache(Context context,String fileName,String name,String password){
		    File file=new File(context.getCacheDir(),fileName);///data/dat/packageName/
			   try {
				FileOutputStream fos=new FileOutputStream(file);
				fos.write((name+":"+password).getBytes());
				fos.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
	  }

	   /**
	    * sava data to externalStorage【外部存储卡】
	    * @param context
	    * @param fileName
	    * @param name
	    * @param password
	    * @return
	    */
	   public static boolean saveToSD(Context context,String fileName,String name,String password){
		    //相当于存储到/mnt/sdcard/目录下
		   //在保存数据到sd卡之前 ,最好判断一下 用户是否有sd卡 sd是否可用.
		    File file=new File(Environment.getExternalStorageDirectory(),fileName);
		    try {
				FileOutputStream fos=new FileOutputStream(file);
				fos.write((name+":"+password).getBytes());
				fos.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
	   }

	   /**
	    * 将用户输入的数据以xml文件格式保存到手机rom空间
	    * @param context
	    * @param name
	    * @param password
	    * @return
	    */
	   public static boolean saveToXML(Context context,String name,String password){
		   File file=new File(context.getFilesDir(),"info.xml");
		   try {
			FileOutputStream fos=new FileOutputStream(file);
			XmlSerializer serial=Xml.newSerializer();
			//初始化一下xml的序列化器
			serial.setOutput(fos, "UTF-8");
			serial.startDocument("UTF-8", true);
			serial.startTag(null, "map");

			serial.startTag(null, "name");
			serial.text(name);
			serial.endTag(null, "name");

			serial.startTag(null, "password");
			serial.text(password);
			serial.endTag(null, "password");

			serial.endTag(null, "map");
			serial.endDocument();
			fos.flush();
			fos.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	   }

	   /**
	    * 从rom文件中读取存储的内容
	    * @param context
	    * @param fileName
	    * @return
	    */
	   public static Map<String,String>  readFromRom(Context context,String fileName){
		   File file=new File(context.getFilesDir(),fileName);
		   try {
			FileInputStream fis=new FileInputStream(file);
			byte[] result=StreamTools.getBytes(fis);
			String[] data=new String(result).split(":");
			String name=data[0];
			String password=data[1];
			Map<String,String> map=new HashMap<String, String>();
			map.put("name", name);
			map.put("password", password);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	   }
	 }
```

[参考原文链接A](http://www.cnblogs.com/codeworker/archive/2011/12/30/2307834.html)
[参考原文链接B](http://blog.csdn.net/kelingbest/article/details/24004075)

***
