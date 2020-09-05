---
title : JavaScript全局污染
---

## 当我们在声明全局变量的时候，我们干了啥？
 
 先答后解：当我们在顶层代码中var一个变量的时候，我们其实**定义了一个不可配置的属性**。谁的属性？当然是对象的属性。哪个对象？盲生，你发现了华点！window全局对象表示有被cue到。
 
 >PS：在非严格模式中，__不论是在顶层代码还是函数体__，若未事先声明变量就直接赋值，js会隐式声明该变量并将作为属性添加到window对象中，与用var声明的变量不同，**这种隐式声明的变量是可配置的**（可用delete运算符进行删除）
 
1. 首先，让我们var一个变量myName1，再直接赋值一个变量myName2，并打印window全局对象：

```javascript
<script>
	var myName1 = "旦旦";
	myName2 = "旦旦boom";
	console.log(window);
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200225101723501.png)

2. 通过对window全局对象的查找，我们发现，刚刚声明赋值的两个变量成为了window对象的两个属性。这两个属性的特性如何？让我们继续检测：

```javascript
<script>
    var myName1 = "旦旦" ; 
    myName2 = "旦旦boom";
    console.log(window);
    console.log(Object.getOwnPropertyDescriptor(window,"myName1"));
    console.log(Object.getOwnPropertyDescriptor(window,"myName2"));
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200225155427119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)

由此可知，在script标签中直接通过var关键字声明的变量，会在window对象中定义该属性，且该属性特性为**可写可枚举不可配置**。不声明直接赋值也会在window对象中定义该属性，且该属性特性为**可写可枚举可配置**。


## 全局污染
许多编程语言都有全局变量，例如Java的public static成员属性就是全局变量。但JavaScript没有链接器（linker），**所有的编译单元都载入一个公共全局对象中**。

不可否认，全局变量在微型小型的程序中非常方便，所有的作用域都能访问到全局变量。但在大型的项目中，这些全局变量难以管理：假如一个开发者定义了一个全局变量a，另一个开发者也定义了一个全局变量a，两个开发者开发的部分合并时，这两个全局变量a将会互相冲突，可能导致程序无法运行，而且通常难以调试。
## 我们通常要减少创建全局变量
为了减少全局变量的定义，这里简单提两个方法:
1. 匿名函数

```javascript
(function(){    //程序员A的代码
	var myName = "旦旦";
	var myAge = 18;
	console.log(myName , myAge);//旦旦  18
})()
(function(){    //程序员B的代码
	var myName = "旦旦boom";
	var myAge = 20;
	console.log(myName , myAge);//旦旦boom  20

})()
```
2. 定义一个全局变量的命名空间

```javascript
var aGO = {    //程序员A的全局命名空间
	myName:"旦旦",
	myAge:18,
	show:function(){
		console.log(this.myName , this.myAge);
	}
}
aGO.show(); // 旦旦  18
var bGO = {    //程序员B的全局命名空间
	myName:"旦旦boom",
	myAge:20,
	show:function(){
		console.log(this.myName , this.myAge);
	}
}
bGO.show(); // 旦旦boom  20
```

