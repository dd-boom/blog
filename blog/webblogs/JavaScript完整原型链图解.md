---
title: JavaScript完整原型链图解
---
##  了解完整原型链对我们有什么帮助?
没什么帮助，装逼意义大于实用（doge）
好的吧，可能是我还是新手，没碰上这方面的需求
## 完整原型链图示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706194823401.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)
上图里，我们常用的部分是右下至右上的链，即从构造函数到构造函数原型对象再到`null`的部分。
而实际上，我们常见的`Function`和`Object`也参与了原型访问链。
在这个图中，==不管将哪个块当作实例对象，总有一个构造函数和一个原型对象和它组成三角关系==。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706203702694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)
只有一个块例外，那就是`Object.prototype`。若`Object.prototype.__proto__ === Object.prototype `，则原型链访问将一直访问`Object.prototype`没有尽头，故底层规定`Object.prototype.__proto__ === null`，使原型链访问停止。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706205430150.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)

以下是4点总结：
1. 所有构造函数都是`Function`的实例对象，包括`Function`自身，所有构造函数的`__proto__`都指向`Function.prototype`，即所有构造函数都继承`Function`的原型对象。
2. 所有原型对象都是`Object`的实例对象，所有原型对象的`__proto__`都指向`Object.prototype`，即所有原型对象都继承`Object`的原型对象。
3. `Function`可通过`__proto__`访问自己的原型对象，也可通过`prototype`访问自己的原型对象。这是因为`Function`本身也是`Function`的实例对象，把`Function`当成构造函数看，它可通过`prototype`访问原型对象，把`Function`当成实例对象看，它可通过`__proto__`访问原型对象。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706205957192.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)
44. `Object.prototype.__proto__`指向`null`，原型链访问到这里停止


如有不对，欢迎指正，
以上。
