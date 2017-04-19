title: Android保存图片到系统图库
date: 2015－03-19 19:40
categories: Android
tags: Android
description: 
toc: true
---

近期做Android开发需求，涉及到需要将游戏应用的二维码保存到本地相册，以便用户可以查看分享。参考了网上[stormzhang 的这篇文章](http://stormzhang.com/android/2014/07/24/android-save-image-to-gallery/)，得到如下可以使用的代码：

<!--more-->

``` java
public static void saveImageToGallery(Context context, Bitmap bmp) {
    // 首先保存图片
    File appDir = new File(Environment.getExternalStorageDirectory(), "Boohee");
    if (!appDir.exists()) {
        appDir.mkdir();
    }
    String fileName = System.currentTimeMillis() + ".jpg";
    File file = new File(appDir, fileName);
    try {
        FileOutputStream fos = new FileOutputStream(file);
        bmp.compress(CompressFormat.JPEG, 100, fos);
        fos.flush();
        fos.close();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
	}
    
    // 其次把文件插入到系统图库
    try {
        MediaStore.Images.Media.insertImage(context.getContentResolver(),
				file.getAbsolutePath(), fileName, null);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
    // 最后通知图库更新
    context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + path)));
}
```

在Android4.4之前也就是以发送一个Action为“Intent.ACTION_MEDIA_MOUNTED”的广播通知执行扫描。方法如下:

	this.sendBroadcast(new Intent(Intent.ACTION_MEDIA_MOUNTED, Uri.parse("file://" + Environment.getExternalStorageDirectory())));   

但在Android4.4中，则会抛出以下异常：

	W/ActivityManager(  498): Permission Denial: not allowed to send broadcast android.intent.action.MEDIA_MOUNTED from pid=2269, uid=20016

那是因为Android4.4中限制了系统应用才有权限使用广播通知系统扫描SD卡。

参考 [逐Ls梦 的专栏](http://blog.csdn.net/sgz_china/article/details/24657709)这篇文章可得到如下解决方案替代之：

	MediaScannerConnection.scanFile(this, new String[]{Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).getPath() + "/" + fileName}, null, null);  

即：使用MediaScannerConnection执行具体文件或文件夹进行扫描。


