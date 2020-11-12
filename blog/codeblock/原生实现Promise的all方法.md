---
title: 原生实现Promise.all方法
---

# 原生实现Promise.all方法

## 原版Promise.all

> 1.Promise.all(iterable) 方法返回一个 Promise 实例
>
> 2.此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）
>
> 3.如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```

## 原生实现Promsie.all

```javascript
function all(iterableArr) {
    //返回一个promise实例(符合第一条规则)
    return new Promise((resolve,reject)=>{
        //resArr用来存储所有resolve的promise的res
        let resArr = [];
        // 遍历数组中所有元素
        for(let i in iterableArr){  
            let cur = iterableArr[i];
            // 如果当前这个对象是promise类型
            if(typeof cur === 'object' && typeof cur.then ==='function'){ 
                cur.then((res)=>{
                    resArr[i] = res;
                    //如果全部resolve,存储的resArr的长度会和传入的iterableArr的长度一样,此时整个promise为resolve(符合第二条规则)
                    if(resArr.length === iterableArr.length){
                        resolve(resArr);
                    }
                // 如果当前这个promise实例的状态为reject，直接使整个promise就变为reject状态。(符合第三条规则)
                },reject) 
            }else{
                resArr[i] = cur
            }
        }
    })
}

//测试
all([
    Promise.reject(100),//Promise.resolve(100)
    123,
    new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("旦旦")
        },5000)
    })
]).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})
```

