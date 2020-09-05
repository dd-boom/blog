---
title: js封装链表类
---

## js封装链表类
刚开始学编程的时候，就有人对我说，数据结构算法才是程序员的核心竞争力。
然而作为一个野蛮自学的JavaScript拥护者，我至今还没对算法进攻，真是愧对csdn这么多资源。我有罪，我反省orz orz orz orz

---
我们直接来搞链表的封装。
## JavaScript中的构造函数
总所周知，js是没有class的，虽然ES6提供了class的书写方式，但本质上也是用函数模拟出来的。
关于js中构造函数的用法和优势，我在下面这篇博客中有大致的描述：
[JavaScript学习笔记——工厂模式、构造函数模式、原型模式](https://blog.csdn.net/DDboom/article/details/104743139)

 ## 链表的基本结构

和我们常用的数组结构不同，链表并没有用下标索引元素，而是使用每个node块中的next指向下一个元素。如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615095054291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0REYm9vbQ==,size_16,color_FFFFFF,t_70)
 这使得链表和数组在以下方面各有优劣：
| 数组Array | 链表LinkedList |
|--|--|
| 劣：数组的大小相对固定，在数组头部及中段插入或移除元素时，需要依次移动后续元素，成本较高 | 优：链表每次插入或移除元素时，只需要改变一个指针并增加一个指针，成本较低 |
| 优：以下标作为元素索引，可以直接访问数组中任何位置的任何元素 | 劣：每次需要访问中段某个元素，都需要从head开始遍历到相应位置才能访问 |

## 用js封装单项链表的构造函数
以下是对链表构造函数的封装，先封装一个Node辅助类（同样用构造函数模拟），再按照增删改查其他的顺序添加方法。

```javascript
function LinkedList(){
	var Node = function(ele){
        this.ele = ele;
        this.next = null
    }
    var length = 0;
    var head = null;
    //增
    Linkedlist.prototype.append = function(ele){};//在链表尾部添加元素
    Linkedlist.prototype.insert = function(ele,idx){};//在链表中特定位置添加元素
    //删
    Linkedlist.prototype.remove = function(ele){};//删除链表中的一个元素
    Linkedlist.prototype.removeAt = function(idx){};//删除链表中特定位置的元素
    //改
    Linkedlist.prototype.update = function(elEle,reEle){};//更改链表中的一个元素
    Linkedlist.prototype.updateAt = function(idx,reele){};//更改链表中特定位置的元素
    //查
    Linkedlist.prototype.indexOf = function(ele){};//查询链表中的一个元素的位置
    Linkedlist.prototype.charAt= function(idx){};//查询链表中特定位置的元素
    Linkedlist.prototype.getHead = function(){};//查询链表的头部
    //其他
    Linkedlist.prototype.join = function(sep){};//打印链表成字符串
    Linkedlist.prototype.isEmpty = function(){};//判断链表是否有元素
    Linkedlist.prototype.size = function(){};//获取链表的长度
}
```
用法:
|方法|描述|参数|返回值|
|--|--|--|--|
|**li.append(ele)**|在链表尾部加入节点|**ele**:要加入链表尾部的节点的元素|方法执行后链表的长度|
|**li.insert(idx,ele)**|在链表指定位置加入节点|**idx**:(number)要插入的位置<br/>**ele**:要插入的节点的元素|插入成功返回true<br/>插入失败返回false|
|**li.remove(ele)**|移除一个拥有ele元素的节点(从左往右遍历第一个)|**ele**:要移除的节点的元素|移除成功:返回被移除节点的位置<br/>移除失败:返回false|
|**li.removeAt(idx)**|移除一个指定位置的节点|**idx**:(number)要移除的节点的位置|移除成功: 返回被移除节点的元素<br/>移除失败:返回false|
|**li.update(elEle,reEle)**| 将拥有elEle元素的节点的元素变更为reEle(从左往右遍历的第一个)|**elEle**:要被更改的元素<br/>**reEle**:更改后的元素|更改成功:返回true<br/>更改失败:返回false|
|**li.updateAt(idx,reEle)**|将指定位置的节点的元素变更为reEle|**idx**:(number)要改变的元素的节点的位置<br/>**reEle**:更改后的元素|成功:返回true<br/>失败:返回false|
|**li.indexOf(ele)**|查询链表中ele元素所在节点的位置|**ele**:要查询的元素|成功:ele所在节点的位置<br/>失败:-1|
|**li.charAt(idx)**|查询链表中指定位置的节点的元素|**idx**:(number)要查询的位置|成功:idx位置的节点的元素<br/>失败:false|
|**li.getHead()**|查询链表头部的元素||链表不为空:链表头部的元素<br/>链表为空:null|
|**li.join(Separator)**|以Separator为分隔符,将链表用字符串返回|**Separator**:分割符,不填则默认为","|链表拼接成的字符串|
|**li.isEmpty()**|判断链表是否为空链表||空链表:true<br/>非空链表:false|
|**li.size()**|获得链表的长度||链表的长度|
方法代码:
#### 1.==append(ele)== 在链表尾部添加元素

```javascript
Linkedlist.prototype.append = function(ele){
	var node = new Node(ele);
	var current;
	if(head === null){
	    head = node;
	}else{
	    current = head;
	    while(current.next){
	        current = current.next;
	    }
	    current.next = node;
	}
	length++;
	return length;
}
```

#### 2.==insert(idx,ele)== 在链表中特定位置添加元素

```javascript
Linkedlist.prototype.insert = function(idx,ele){
	if(idx >= 0 && idx <= length){
	    var node = new Node(ele);
	    var current = head;
	    var pre;
	    if(idx === 0){
	        node.next = current;
	        head = node;
	    }else{
	        for(var i = 0 ; i < idx ; i++){
	            pre = current;
	            current = current.next;
	        }
	        node.next = current;
	        pre.next = node;
	    }
	    length++;
	    return true;
	}else{
	    return false;
	}
}
```

#### 3.==remove(ele)== 删除链表中的一个元素

```javascript
Linkedlist.prototype.remove = function(ele){
    var current = head ;
    var idx = 0;
    var pre;
    if(head.ele === ele){
        head = current.next;
        length--;
        return idx;
    }else{
        while (current.next) {
            pre = current;
            current = current.next;
            idx++;
            if(current.ele === ele){
                pre.next = current.next;
                length--;
                return idx;
            }
        }
    }
    return false;
}
```

#### 4.==removeAt(idx)== 删除链表中特定位置的元素

```javascript
Linkedlist.prototype.removeAt = function(idx){
    if(idx >=0 && idx < length){
        var current = head;
        var pre;
        if(idx === 0){
            head = current.next;
        }else{
            for(var i = 0 ; i < idx ; i++){
                pre = current;
                current = current.next;
            }
            pre.next = current.next;
        }
        length--;
        return current.ele;
    }else{
        return false;
    }
}
```
#### 5.==update(elEle,reEle)== 更改链表中的一个元素

```javascript
Linkedlist.prototype.update = function(elEle,reEle){
    var current = head;
    if(elEle === head.ele){
        head.ele = reEle;
        return true;
    }else{
        while(current.next){
            current = current.next
            if(elEle === current.ele){
                current.ele = reEle;
                return true;
            }
        }
    }
    return false;
}
```
#### 6.==updateAt(idx,reEle)== 更改链表中特定位置的元素

```javascript
Linkedlist.prototype.updateAt = function(idx,reEle){
    var current = head;
    if(idx >=0 && idx < length){
        if(idx === 0){
            head.ele = reEle;
        }else{
            for(var i = 0 ; i < idx ; i++){
                current = current.next;
            }
            current.ele = reEle;
        }
        return true;
    }
    return false;
}
```
#### 7.==indexOf(ele)== 查询链表中的一个元素的位置
```javascript
Linkedlist.prototype.indexOf = function(ele){
    var current = head;
    for(var i = 0 ; i < length ; i++){
        if(current.ele === ele){
            return i;
        }else{
            current = current.next;
        }
    }
    return -1;
}
```
#### 8.==charAt(idx)== 查询链表中特定位置的元素

```javascript
Linkedlist.prototype.charAt = function(idx){
    if(idx >= 0 && idx < length){
        var current = head;
        if(idx === 0){
            return head.ele;
        }else{
            for(var i = 0 ; i < idx ; i++){
                current = current.next;
            }
            return current.ele;
        }
    }
    return false;
}
```
#### 9.==getHead()== 查询链表的头部
```javascript
Linkedlist.prototype.getHead = function(){
    if(head){
        return head.ele;
    }else{
        return head;
    }
}
```
#### 10.==join()== 打印链表为字符串
```javascript
Linkedlist.prototype.join = function(Separator){
    var current = head;
    var sep = Separator ? `${Separator}` : ",";
    var str = '';
    while (current) { 
        if(current.next !== null){
            str += (current.ele + sep);                
        }else{
            str += current.ele;
        }
        current = current.next;
    }
    return str; 
}
```
#### 11.==isEmpty()== 判断链表是否为空
```javascript
Linkedlist.prototype.isEmpty = function(){
    return length === 0;
}
```
#### 12.==size()== 获取链表的长度
```javascript
Linkedlist.prototype.size = function(){
    return length;
}
```
