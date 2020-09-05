---
title: 关于JavaScript的this
---

## 一、JavaScript中的this是什么?

先答后解：this是一个属性，它会绑定一个指针，指向一个对象。

解：

1. 什么的属性？

   活动记录的属性。当一个函数被调用时，会创建一个执行上下文，也称活动记录。这个记录会包含函数的调用栈、调用方式、传入的参数等，this就是其中一个属性。

   

2. 指向哪个对象?

   调用这个函数的对象，即谁调用这个函数，这个函数里的this就指向谁。至于如何找到这个对象，请看下节。

   

3. 什么时候绑定？

   当函数被调用的时候绑定，当函数被调用时绑定，当函数被调用时绑定，重要的事情说三遍。

   只要函数没有没有执行，那么this就不会绑定任何东西。只有引擎对this进行RHS引用时，this才绑定。如下：

   ```JavaScript
   function fn(){
       console.log(this); //此时只是声明函数,还没有调用,this还没有绑定任何东西
   }
   fn(); //函数被调用了，引擎对console内置对象RHS引用、并检索到log方法后，对this进行RHS引用。this绑定了。
   ```



## 二、this到底要绑定谁？

按照优先度从低到高，绑定规则依次为默认绑定、隐式绑定、显式绑定、new绑定

1. **默认绑定：绑定给Window**

```javascript
var name = "旦旦";
function fn(){
    console.log(this.name);
}
fn(); //"旦旦"
```

> PS：**严格模式下，this默认绑定绑定给undefined**
>
> ```javascript
> "use strict"
> var name = "旦旦";
> function fn(){
>  console.log(this);
>  console.log(this.name);
> } 
> fn(); //undefined	Uncaught TypeError: Cannot read property 'name' of undefined
> ```
>
> > **若函数在严格模式下调用，但函数体在非严格模式中声明，则this还是默认绑定给Window**
> >
> > ```javascript
> > var name = "旦旦";
> > function fn(){
> >  console.log(this);
> >  console.log(this.name);
> > } 
> > "use strict"
> > fn();//Window	"旦旦"
> > ```

2. **隐式绑定：this绑定给调用函数的上下文对象**

   简单的说，当函数被调用时，若被某个对象引用，则绑定给那个对象。(若引用链有多层，则绑定最后一层的对象)

```javascript
var name = "全局旦旦";
function showName(){
    console.log(this.name);
}
var obj = {
    name : "obj旦旦" ,
    fn : showName ,
    obj2 : {
    	name : "obj2旦旦" ,
    	fn : showName
	}
}
showName();//"全局旦旦";
obj.fn();//"obj旦旦"
obj.obj2.fn();//"obj2旦旦"
```

> **隐式丢失：只要调用时没有上下文对象引用，即使是在对象中定义的函数，this'也默认绑定Window（严格模式默认绑定undefined）**
>
> ```javascript
> var name = "全局旦旦";
> var obj = {
>  name : "obj旦旦",
>  showName : function(){
>      console.log(this.name);
>  }
> }
> function fn(){
>  obj.showName();
> }
> var foo = function(a){
>  a();
> }
> obj.showName();//"obj旦旦"(有引用)
> fn();//"obj旦旦"(fn函数体内有引用)
> foo(obj.showName);//"全局旦旦"(回调函数obj.showName本质上只是个指向函数体的指针,obj在这里没有参与引用)
> setTimeout(obj.showName,100);//"全局旦旦"(与上同)
> ```

3. **显式绑定：通过函数内置的方法改变this的指向(call、apply、bind)**

```javascript
var name = "全局旦旦";
var obj = {name : "obj旦旦"};
function showName(a , b){
    console.log(this.name , a , b);
    
}
showName("今年" , "18岁"); // 全局旦旦 今年 18岁
showName.call(obj , "今年" , "18岁"); // obj旦旦 今年 18岁
showName.apply(obj , ["今年" , "18岁"]);// obj旦旦 今年 18岁
showName.bind(obj , "今年" , "18岁")();// obj旦旦 今年 18岁
```

>除了call、apply和bind，还有一些不太常用的其他对象的内置方法，也可以改变this指向，如：
>
>```javascript
>var name = "全局旦旦";
>var arr = ["18岁" , "20岁" , "22岁"];
>var obj = {name : "obj旦旦"};
>console.log(arr.forEach(function(ele){
>    console.log(this.name + ele);
>} ));//全局旦旦18岁		全局旦旦20岁		全局旦旦22岁
>console.log(arr.forEach(function(ele){
>    console.log(this.name + ele);
>} , obj));//obj旦旦18岁	obj旦旦20岁	obj旦旦22岁
>```

4. **new绑定：通过new关键字初始化构造函数，创建实例对象**

```javascript
function showName(){
    console.log(this.name);
}
var name = "全局旦旦";
var obj = {
    name : "obj旦旦",
    showName : showName
};
function Person(name){
    this.name = name
    this.showName = showName;
}
var newObj = new Person("new旦旦");
showName();//全局旦旦
obj.showName();//obj旦旦
newObj.showName();//new旦旦
```



以上，如有错漏，欢迎指正。
