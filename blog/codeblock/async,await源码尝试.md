---
title: async/await源码尝试
---

# async/await源码尝试

## 代码块

```js
function yieldPromise(generator){
    //调用传入的generator生成一个迭代器
    let interator = generator();
    //迭代器不直接next,而是作为this使用
    interatorNext.call(interator);
}

function interatorNext(value){
    let interator = this,
    //自动先执行一次next，第一次next是没有参数的
    //第二次之后，next有参数，作为上一次yield的返回值
        result = interator.next(value);
    if(result.done) return;
    //若yield后是一个promise，则此时val还是一个等待状态的promise
        //[[PromiseStatus]]: "fulfilled"
        //[[PromiseValue]]: value
    //这个val会传入resolve中
    let val = result.value;
    Promise.resolve(val).then(val =>{
        //此时val不是promise，而是[[PromiseValue]]了
        //then中递归,利用微任务机制实现类似同步的效果
        interatorNext.call(interator,val);
    })
}

yieldPromise(function* (){
    let v1 = yield Promise.resolve(100);
    console.log(v1);
    let v2 = yield Promise.resolve(200);
    console.log(v2);
})
//100
//200


async function fn(){
    let v1 = await Promise.resolve(100);
    console.log(v1);
    let v2 = await Promise.resolve(200);
    console.log(v2);
}
fn();
//100
//200
```