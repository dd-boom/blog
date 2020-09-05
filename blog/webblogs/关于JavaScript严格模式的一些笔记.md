---
title: JavaScript严格模式
---

## 严格模式是什么?
js的严格模式，即ES5中引入一种代码执行方式的变体，与js的非严格模式相比，它：
 - 修正了该语言的一些重要缺陷，消除了一些不严谨的地方
 - 清除了一些代码运行的不安全之处，增强了安全机制
 - 提高了代码的运行速度
 - 禁用了一些未来可能会定义的语法，为以后的版本做准备
 >支持严格模式的浏览器:
>&nbsp;&nbsp;&nbsp;&nbsp;Internet Explorer 10 +、 Firefox 4+ Chrome 13+、 Safari 5.1+、 Opera 12+。

## <br/>严格模式的开启方式
```javascript
<script>
	"use strict"
	myName = "旦旦boom";
	console.log(myName);//报错:myName is not defined
	//在脚本中使用严格模式
</script>
<script>
	function fn(){
		"use strict"
		myName = "旦旦boom";
		console.log(myName);
	}
	fn();//报错:myName is not defined
	//在函数中使用严格模式
</script>
```

如上，在需要进入严格模式的==脚本或函数的开头处，码入“use strict”指令==，即可在对应代码块进入严格模式。
 >ps：
 >&nbsp;&nbsp;&nbsp;&nbsp;“use strict”（可以使用单引号也可以使用双引号）指令不包含任何语言的关键字，仅仅是一个包含一个特殊字符串直接量的表达式。
 >&nbsp;&nbsp;&nbsp;&nbsp;对于没有实现ES5的js解释器来说，这只是一条什么也没做、没有副作用的表达式关键句。
 
 ## <br/>严格模式与非严格模式的区别
 - __严格模式中所有的变量都要==事先声明==；非严格模式中，不声明直接使用变量，会给全局对象添加新属性__
 

```javascript
<script>
	nName = "非严格";
	console.log(nName);//非严格
	(function(){
	    "use strict"
	    sName = "严格";
	    console.log(sName);//Uncaught ReferenceError: sName is not defined
	})();
</script>
```
- __严格模式中，函数声明时，==形参重名会产生语法错误==；非严格模式中，最后一个重名的形参会覆盖前面所有重名的形参__

```javascript
<script>
    function nFn(a,b,b){
        console.log(a);
        console.log(b);
        console.log(b);
    }
    nFn(1,2,3);//1,3,3
    nFn(1,2);//1,undefined,undefined
    (function(){
        "use strict"
        function sFn(a,b,b){
            console.log(a);
            console.log(b);
            console.log(b);
        }//Uncaught SyntaxError: Duplicate parameter name not allowed in this context
    })();
</script>
```

-  __严格模式中，函数里的==arguments拥有传入实参的静态副本==；非严格模式中，arguments的元素和函数参数指向同一个值的引用__

```javascript
<script>
    function nFn(a){
        a = 10;
        console.log(a);
        console.log(arguments[0]);
    }
    nFn(4);//10  10
    (function(){
        "use strict"
        function sFn(a){
            a = 10;
            console.log(a);
            console.log(arguments[0]);
        }
        sFn(4);//10  4
    })();
</script>
```

-  __严格模式限制了调用栈的检测能力，==使用arguments.callee.caller和arguments.callee时会报错==__

```javascript
<script>
    function nFn(){
        console.log(arguments.callee === nFn);
        console.log(arguments.callee.caller);
    }
    nFn();//true null
    (function(){
        "use strict"
        function sFn(){
            console.log(arguments.callee === sFn);
            console.log(arguments.callee.caller);
        }
        sFn();//Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them  
    })();
</script>
```

-  __严格模式中==不允许使用with语句==__

```javascript
<script>
    var nObj = {
        name:"旦旦boom",
        age:18
    }
    with(nObj){
        console.log(name);//旦旦boom
        console.log(age);//18
    }
</script>
<script>
    "use strict"
    var sObj = {
        name:"旦旦boom",
        age:18
    }
    with(sObj){//Uncaught SyntaxError: Strict mode code may not include a with statement
        console.log(name);
        console.log(age);
    }
</script>
```

-  __严格模式中==不允许使用eval和arguments作为变量名==__

```javascript
<script>
    var eval = 0;
    var arguments = 0;
    //一切正常
</script>
<script>
	"use strict";
    var eval = 0;//Uncaught SyntaxError: Unexpected eval or arguments in strict mode
    var arguments = 0;
</script>
```

-  __严格模式中==不允许使用以0为前缀的八进制==__

```javascript
<script>
	console.log(010);//8
</script>
<script>
	"use sitrict";
	console.log(010);//Uncaught SyntaxError: Unexpected eval or arguments in strict mode
</script>
<script>
	"use sitrict";
	console.log(parseInt(10,8));//8
</script>
```

-  __严格模式中，==函数内部没有明确隶属对象的this为undefined==；非严格模式中，这种this指向window__

```javascript
<script>
    function nFn(){
        console.log(this);
    }
    nFn();//window
    (function(){
        "use strict"
        function sFn(){
            console.log(this);
        }
        sFn();//undefined;
    })();
</script>
```

- __严格模式中，==给只读属性赋值、给不可拓展的对象创建新成员，都会报错==；非严格模式则什么都不做__

```javascript
<script>
    var person = new Object();
    Object.defineProperty(person , "name" , {value:"旦旦boom", writable:false});//{name: "旦旦boom"}
    Object.seal(person);
    person.name = "旦旦";//什么都没做
    person.age = 18;//什么都没做
    console.log(person);//{name: "旦旦boom"}
    (function(){
        "use strict"
        person.name = "旦旦";//Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
        person.age = 18;//Uncaught TypeError: Cannot add property age, object is not extensible
    })();
</script>
```

-  __严格模式中，传入eval()中的代码不能在调用程序所在的上下文中声明变量或定义函数，即==eval()外部不能访问eval()内部声明的变量和定义的函数==。另外，传入eval()的代码遵循严格模式执行。__

```javascript
<script>
    eval("var nName = '旦旦boom'; console.log(nName);");//旦旦boom
    console.log(nName);//旦旦boom
    (function(){
        "use strict"
        eval("var sName = '旦旦boom'; console.log(sName);")//旦旦boom
        console.log(sName);//Uncaught ReferenceError: sName is not defined
    })();
</script>
```

- __严格模式中，若==delete运算符后跟随变量、函数、函数参数等非法标识符，或跟随一个不可配置的属性，则报错==；非严格模式中，delete后跟随非法标识符或不可配置的属性，则什么都不做，并返回false__

```javascript
<script>
    var person = new Object({
        name : "旦旦boom",
        age : 18
    });
    delete person;//什么都不做
    delete Object.prototype;//什么都不做
    (function(){
        "use strict"
        delete person;//Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
        delete Object.prototype;//Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
    })();
</script>
```

-  __严格模式中，==通过call()或apply()来调用函数时，传入的第一个值不会被转换==；非严格模式中，call()和apply()传入的第一个值如果是null和undefined，则会被全局对象取代，如果是原始值则转换为对应的包装对象__

```javascript
<script>
    var nObj = {
        fn : function(){
            return this;
        }
    };
    console.log(nObj.fn.call(undefined));//window
    console.log(nObj.fn.apply(null));//window
    (function(){
        "use strict"
        var sObj = {
            fn : function(){
                return this;
            }
        };
        console.log(sObj.fn.call(undefined));//undefined
        console.log(sObj.fn.apply(null));//null
    })();
</script>
```

以上，
如有错误，欢迎指正_(:τ」∠)_
