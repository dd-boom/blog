---
title: vue作用域插槽
---

# vue作用域插槽

## 使用场景

数据由子组件提供, 结构和样式等由父组件决定的时候可使用

## 代码块

```html
<body>
    <!-- 父组件 -->
    <div id="app">
        <son>
            <!-- 
            `v-slot:`命令名,可简写成`#`   即有:`#slot2="scopedata"`
            `slot2`插槽名,用法与具名插槽相似
            `"scopedata"`自定义数据名,内含子组件插槽提供的数据
            -->
            <template v-slot:slot2="scopedata">
                <ul>
                    <li v-for="item in scopedata.sondata">{{item}}</li>
                </ul>
            </template>
        </son>
    </div>
    <!-- 子模板 -->
    <template id="sontpl">
        <div>
            <slot name="slot1" :sondata="usernames">
                <!-- slot1的默认结构 -->
                {{"slot1的默认结构: "+usernames.join("!")}}
            </slot>
            <br/>
            <slot name="slot2" :sondata="usernames">
                <!-- slot2的默认结构 -->
                {{"slot2的默认结构: "+usernames.join("?")}}
            </slot>
        </div>
    </template>
</body>
<script>
    //父的vue实例
    const dad = new Vue({
        el: "#app",
        components: {
            //子组件
            son: {
                template: "#sontpl",
                data() {
                    return {
                        //子组件实例的数据
                        usernames:["旦旦","旦旦boom","dandan","ddboom","dd-boom"]
                    }
                },
            }
        }
    })
</script>

```

## 显示

![vue双向绑定结合组件通讯](/assets/img/vue作用域插槽.png)