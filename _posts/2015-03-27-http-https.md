title: Http和Https的区别
date: 2015－03-27
categories: Program
tags: Http
description:
---

今天大家一起聚于会议室听一个同事的分享，中途需要联网的时候，网络状态良好竟不能访问该网址，那些年也是接触过网络的我看了下懵了，旁边一大牛瞬间即解决了(将地址前的Https改成Http，奇迹般地可以了)，好生疑惑，下来一搜究竟，原始如此：

>Http是HTTP协议运行在TCP之上。所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份。
Https是HTTP运行在SSL/TLS之上（在HTTP(应用层) 和TCP(传输层)之间插入一个SSL/TLS协议），SSL/TLS运行在TCP之上。所有传输的内容都经过加密，加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。此外客户端可以验证服务器端的身份，如果配置了客户端验证，服务器方也可以验证客户端的身份。

<!-- more -->

即是加密与不加密区别。Https方式访问，客户端到服务器端传输的数据是加密的，即使被截获也没法破解，安全性很高；http方式访问，账户密码是明文传输的，极易泄露。既然如此，在公共场所使用服务的时候，有https就用https。而http是明文传输的，如果有人抓到数据包，你在一个http request里的数据都能见到。大部分网站都要求敏感信息通过https发送, 所以对于一个普通PC用户, 在连接上公共wifi时注意url是否是https的就可以了, 如果要在网站输入敏感信息, 一定确保是 `https://` 开头的.上网需谨慎，安全要注意！另外呢这二者使用的端口也有所区别：Http：80而Https使用的是443端口。现在仔细去看下， 谷歌地址：`https://www.google.com` 度娘的地址： `https://www.baidu.com/`，看来平时多留心下好奇下，知识常识真是无处不在啊。

另外比较好奇的是，既然当时该网址（其实是公司网址和月光博客地址）后台没有部署SSL证书神马的造成链接不成功，可是只是点击链接而已，怎么就无故的是以 `Https://` 打头了呢？

这篇[What is the Difference Between http and https?](http://www.wisegeek.org/what-is-the-difference-between-http-and-https.htm)是详细的讲解了Http和Https的区别。
>There are some primary differences between http and https, however, beginning with the default port, which is 80 for http and 443 for https. Https works by transmitting normal http interactions through an encrypted system, so that in theory, the information cannot be accessed by any party other than the client and end server. There are two common types of encryption layers: Transport Layer Security (TLS) and Secure Sockets Layer (SSL), both of which encode the data records being exchanged.

>When using an https connection, the server responds to the initial connection by offering a list of encryption methods it supports. In response, the client selects a connection method, and the client and server exchange certificates to authenticate their identities. After this is done, both parties exchange the encrypted information after ensuring that both are using the same key, and the connection is closed. In order to host https connections, a server must have a public key certificate, which embeds key information with a verification of the key owner's identity. Most certificates are verified by a third party so that clients are assured that the key is secure.

>Https is used in many situations, such as log-in pages for banking, forms, corporate log ons, and other applications in which data needs to be secure. However, if not implemented properly, https is not infallible, and therefore it is extremely important for end users to be wary about accepting questionable certificates and cautious with their personal information while using the Internet.
