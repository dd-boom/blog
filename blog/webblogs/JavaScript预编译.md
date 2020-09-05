---
title: JavaScript预编译
---

## JavaScript预编译
总所周知，js在运行时，会有三个阶段，分别是：
1. 词法分析阶段（检测代码中是否含有明显的语法错误）
2. 预编译阶段
3. 解释执行阶段

其中，所谓的预编译阶段，就是在内存中开辟一些空间，存放一些变量与函数对这些内存中每一个通道进行编译。从代码的层面来看，预编译阶段给代码的执行提供了执行期上下文（执行环境）。

在js语言中，预编译分为两种：
1. 全局的预编译，这种预编译只有在代码执行前进行一次
2. 局部的预编译，这种预编译会在函数调用时进行，会进行多次
***
首先，让我们先来看一段代码：

```javascript
<script>
	var a = 1;
	console.log(a);//1
	console.log(b);//undefined
	fn(1,2);//3 2 2
	function fn(a,c){
		var a = 3;
		var b = 2;
		console.log(a,b,c);
	}
		var b = 3;
</script>
```
如上代码十分简单，下面让我们以这段代码为例子，展示一遍预编译的过程。
***

### **1.1- 全局的预编译**
全局的预编译发生在页面打开之后，代码执行之前，只会发生一次，且遵循以下步骤：
1. 创建全局对象GO(Global Object)~这个对象直到页面关闭才会被销毁~
```javascript
GO = {
}
```
2. 将在全局中声明的变量放置到GO中，并赋值为undefined
```javascript
GO = {
	a : undefined,
	b : undefined
}
```
3. 将全局中声明的函数也放到GO中
```javascript
GO = {
	a : undefined,
	b : undefined,
	fn : function(a,c){
		var a = 3;
		var b = 2;
		console.log(a,b,c);
	}
}
```
至此，全局的预编译就完成了。
**1.2- 全局的代码执行**
当js代码执行的时候，是从上到下执行的。首先第一行，将1赋值给a；
```javascript
GO = {
	a : 1,
	b : undefined,
	fn : function(a,c){
		var a = 3;
		var b = 2;
		console.log(a,b,c);
	}
}
```
第二行，在控制台打印a，此时a的值为1，故打印1；
第三行，在控制台打印b，此时b的值为undefined，故打印undefined；
第四行，**调用fn函数，此时进行函数的局部预编译**：
### **2.1- 函数的局部预编译**
局部的预编译发生在函数被调用的时候，每次函数被调用，都会预编译相对应的AO，局部的预编译遵循以下步骤：

1. 创建局部的活动对象AO(Activation Object)~函数执行完毕后，AO会被销毁~
```javascript
AO = {
	
}
```
2. 将fn函数的形参，变量的声明放到AO中，并赋值为undefined
```javascript
AO = {
	a : undefined,
	c : undefined,
	b : undefined
}
```
**2.2- 函数的代码执行**
1. 将形参与实参统一
```javascript
AO = {
	a : 1,
	c : 2,
	b : undefined
}
```
2. 从上到下一行一行的执行函数内的代码，先把3赋值给a，再把2赋值给b
```javascript
AO = {
	a : 3,
	c : 2,
	b : 2
}
```
3. 执行打印的方法，打印a，b，c三个变量，此时这三个变量分别是3，2，2，故打印3，2，2
4. fn执行完毕，**销毁AO**
 
### **1.3- fn执行结束后，还有一句全局环境的js代码未执行，故执行它** 
将3赋值给b
```javascript
GO = {
	a : 1,
	b : 3,
	fn : function(a,c){
		var a = 3;
		var b = 2;
		console.log(a,b,c);
	}
}
```
以上，所有代码执行完毕，GO始终保留在内存里不会被销毁，除非这个页面被关闭。
