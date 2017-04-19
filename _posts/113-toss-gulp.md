title: Gulp折腾之路(III)
date: 2016-08-08 10:10
categories: Front-End
tags:
- Gulp
- NodeJs
description: Gulp常用插件介绍：gulp-sequence, gulp-sftp, gulp.autoprefixer, gulp-useref, gulp-rev, gulp-order等等;
---

对于前端而言，`Gulp`实在是一个很酷且不可多得的存在；先前就有在[Gulp探究折腾之路(I)](http://www.jeffjade.com/2015/11/25/2015-11-25-toss-gulp/)，以及[Gulp折腾之路(II)](http://www.jeffjade.com/2016/01/19/2016-01-19-toss-gulp/)对使用心得略作记载；如今，基本都用`Vue Webpack`双剑合璧来解决所遇到的问题，`Gulp`也就很少折腾了。以下关于对她的些许记录，也是蛮久之前的事儿了；想来之后也不会过多去涉猎她了，就将这些心得贴于此处，日后若有机缘，复作更新(毕竟：学以致用)。

<!-- more -->

![Gulp折腾之路](http://7xoosr.com1.z0.glb.clouddn.com/gulpPage.jpg)

>**微注：** 前端更新实在是迅捷！谈及前端打包工具，`Gulp` 取代 `Grunt`荣登王者，其宝座还未热乎，16年 `Webpack` 便劈天盖地席卷而来。即便笔者在记叙这篇文章时候，也早已是投身于 `Webpack` 的石榴裙下, 且少使用`Gulp`了；所以，于此你应该有所考量。当然，Gulp很强大，辅助完成些脚本，也是很好的存在，譬如生成雪碧图、Sftp服务器上传等；且在2016年中也更新到4.0——一个很吸引人的版本。(Update@17/01/16)

### [Gulp-sftp](https://www.npmjs.com/package/gulp-sftp)的喜忧路

一路从**Xftp**，**winScp**，**Sublime text3**的sftp插件等迁移至**gulp-sftp**,一路都充满欢喜：毕竟在前端项目模块化、工程化之后，即便**Sublime text3**的sftp插件都不能很好实现需求(需当手动将打包后的东西，借助**Xftp**等工具上传，当然也可以扩展**Sublime text3**的sftp插件的功能)。有了**gulp-sftp**，就能利用**watch**来监测指定文件变化，自动上传指定内容；So Nice（喜）。

```js
gulp.task('upload', function() {
    return gulp.src( jadeWorkDir + '**' )
    .pipe(sftp({
        host: jadeConfig.sftp.host,
        user: jadeConfig.sftp.user,
        port: jadeConfig.sftp.port,
        key: jadeConfig.sftp.key,
        pass: jadeConfig.sftp.pass,
        remotePath: jadeConfig.sftp.remotePath + jadeConfig.objectDirName
    }));
});
```
但是用它也存在一个问题：比如开启一个新的项目，初始化上传改文件夹时候（运行: `gulp
upload`），总会报如下错误：

```
[15:22:46] Starting 'upload'...
[15:22:46] Authenticating with password.
events.js:141
    throw er; // Unhandled 'error' event
      ^
Error: No such file
    at SFTP._parse (E:\web\cdn\ns\node_modules\ssh2\lib\SFTP\SFTPv3.js:1090:23)
    at ChannelStream.<anonymous> (E:\web\cdn\ns\node_modules\ssh2\lib\SFTP\SFTPv3.js:72:10)
    at emitOne (events.js:77:13)
    at ChannelStream.emit (events.js:169:7)
    at readableAddChunk (_stream_readable.js:146:16)
    at ChannelStream.Readable.push (_stream_readable.js:110:10)
    at Parser.<anonymous> (E:\web\cdn\ns\node_modules\ssh2\lib\Channel.js:102:25)
    at emitOne (events.js:77:13)
    at Parser.emit (events.js:169:7)
    at Parser.parsePacket (E:\web\cdn\ns\node_modules\ssh2\lib\Parser.js:607:12)
```

查究了一番，原来是**gulp-sftp**不存在的远程文件夹不容创建（忧）。

>Folders which do not exist remotely can´t be created. 参见[gtg092x/gulp-sftp](https://github.com/gtg092x/gulp-sftp/issues/22)；

（update@2016-06-28）有得一些空闲，又重新回看这个问题；有想过，设定 `remotePath` 为外层文件夹，显然这不是一个好的解决办法；也尝试一个新的插件譬如 [gulp-ftp](https://www.npmjs.com/package/gulp-ftp)，竟然不能很好地工作。阴差阳错的对`remotePath`配置的路径做了改变，这问题就消失了；更改 *“/xxx/yyy/zzz/targetFolder/”* 为 *“/xxx/yyy/zzz/targetFolder”*，即okay了。

### [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer):Prefix CSS
```
gulp.task('autoprefixer', function () {
    return gulp.src( ['src/css/*.css','!src/css/*.min.css'] )
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'safari 8', 'ie 9', 'ie 10', '> 5%', 'Firefox > 10'],
            cascade: false
        }))
        .pipe(gulp.dest( basePath + 'css/' ));
});
```
使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用她我们可以很潇洒地写代码，不必考虑各浏览器兼容前缀。【特别是开发移动端页面时，就能充分体现它的优势。例如兼容性不太好的flex布局。】但是，使用这东西，需要注意的点是，她不能很好的工作，对于已然压缩过的CSS文件。

### [gulp-useref](https://www.npmjs.com/package/gulp-useref) |  [gulp-rev](https://github.com/sindresorhus/gulp-rev)
**活久见**是蛮有意思的，如此就可以更多体验那些存在；这两个插件也是在用了`webpack`之后，接触别的古董型项目才了解到的；这 `gulp-useref` 她可以把html里零碎的这些引入合并成一个文件，当然**它只负责合并，不负责压缩**！所以合并出来的文件我们要自行压缩，压缩以后调用 `gulp-rev` 负责在文件名后追加hash（如果项目使用CDN容易造成缓存的话）。最后调用`gulp-rev-replace` 抑或 `gulp-rev-collector` 负责把最终的文件名替换回HTML中去；看起来是不是有些意思呢？对此官方给出的如下：
>**gulp-useref**:Parse build blocks in HTML files to replace references to non-optimized scripts or stylesheets.
**gulp-rev**: Static asset revisioning by appending content hash to filenames unicorn.css → unicorn-d41d8cd98f.css

gulp-useref识别的就是build开头的注释，build后面首先跟的是类型扩展名，然后后面的路径就是build区块中的所有文件进行合并后的文件路径，这个相对路径是相对于这个HTML的路径。一个简单的示例如下：

```
<html>
<head>
    <!-- build:css css/combined.css -->
    <link href="css/one.css" rel="stylesheet">
    <link href="css/two.css" rel="stylesheet">
    <!-- endbuild -->
</head>
<body>
    <!-- build:js scripts/combined.js -->
    <script type="text/javascript" src="scripts/one.js"></script>
    <script type="text/javascript" src="scripts/two.js"></script>
    <!-- endbuild -->
</body>
</html>
```

经过运行一段蛮复杂的gulp脚本之后，以上示例将会被打包成这样(当然这里未使用`gulp-rev`来做版本控制)：

```
<html>
<head>
    <link rel="stylesheet" href="css/combined.css"/>
</head>
<body>
    <script src="scripts/combined.js"></script>
</body>
</html>
```

脚本写完了，写代码也还需注意的蛮多，比如说，这带有`<!--build:xxx  --><!-- endbuild -->`的内部，所引用的资源得是本地的，如果其中链接一发在线css/js，抱歉打包工作将不能很好的进行了；再有其中如果引用js，也不能将书写js代码，只能是引用本地js文件；如果项目中有多个 html,那么每个文件中所规定合成的文件名也须当做下区分 ......；所以说这般使用，多少有些古董化玩儿法，还是`Vue + Webpack`大法好；这里的稍作介绍，也是对这过去的某种玩儿法的一种缅怀，当然了，如今你想这么玩儿，写下来也能是一点点参考。

### [gulp-order](https://github.com/sirlantis/gulp-order): 指定次序
>The gulp plugin gulp-order allows you to reorder a stream of files using the same syntax as of gulp.src.

众所周知在写js时候，文件引入总要有一定顺序，至少依赖了某个文件，总要在使用该文件之前引入；即便是合并压缩到一起。故而就使得再合并js之后，有可能就不能很好的工作（毕竟执行gulp stream 的顺序，并不会依照写script标签的次序），这就需要额外指定压合并顺序，`gulp-order`就能很好承担这项工作，示例如下：

```
gulp.task('mergeJs', function(){
    gulp.src('./src/*.js')
    .pipe(order([
            'jquery-2.1.4.min.js',
            '*.js',
            'bootstrap.min.js'
        ]))
    .pipe(concat('combined.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distPath))
})
```

冰心说：『眼因多流泪水而愈益清明，心因饱经忧患而愈益温厚』；这是对生活有多么丰富的经历，以及透彻领悟才能锻造出来的心怀态度啊。对于技术，其实本源也是如此；只有我们主动去见识，去尝试，去折腾，去塑新，才能雕琢出更强大的自己(/技术)；也才不会在事情降临之时，显得无助与见肘。相信吧：**A Problem Is A Chance For You To Your Best.**。既然谈及了些鸡汤，那就不妨再荐一发广告：有在简书，建立专题[《折腾之美》](http://www.jianshu.com/collection/2f6a49e22121)着重搜集汇藏“折腾”之法，以令生活更简洁而丰美为定调。虽然简书已然演化为鸡汤遍野，壮语横行的一席催进地；希冀这《折腾之美》醉中流醒，仍为一抔实用田。


---

**猜你喜欢：**
[Gulp探究折腾之路(I)](http://www.jeffjade.com/2015/11/25/2015-11-25-toss-gulp/)
[Gulp折腾之路(II)](http://www.jeffjade.com/2016/01/19/2016-01-19-toss-gulp/)
