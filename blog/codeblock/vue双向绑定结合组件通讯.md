---
title: vue双向绑定结合组件通讯
---

# vue双向绑定结合组件通讯

## 代码块

```html
<body>
    <!-- 父组件 -->
    <div id="app">
        <div style="float: left;">
            父的input<input type="text" :value="dadinput" @input="dadinput=$event.target.value">
            子传父:{{sonToDadData}}
        </div>
        <!-- 使用子组件 -->
        <son :dadtoson="dadinput" @sonemitdad="sontodad"></son>
    </div>
    <!-- 子模板 -->
    <template id="sontem">
        <div  style="float: right;">
            子的input<input type="text" v-model="soninput" @input="soninputchange(soninput)">
            父传子:{{dadtoson}}
        </div>
    </template>
</body>
<script>
    //父的vue实例
    const dad = new Vue({
        el: "#app",
        data: {
            dadinput: "父的input",//与父的input双向绑定
            sonToDadData:"",//接受子传过来的数据
        },
        methods:{
            //监听子自定义事件,子自定义事件发生后,触发该事件
            sontodad(data){
                this.sonToDadData = data;
            }
        },
        components: {
            //子组件
            son: {
                template: "#sontem",//绑定子模板
                data() {
                    return {
                        soninput: "子的inpupt"//与子的input双向绑定
                    }
                },
                props:{
                    dadtoson:{//接受父传过来的数据
                        type: String
                    }
                },
                methods: {
                    //自定义事件,子的input改变时触发,向父发射通讯
                    soninputchange(data){
                        this.$emit('sonemitdad',data);
                    }
                },
            }
        }
    })
</script>
```

---------------

## 显示

![vue双向绑定结合组件通讯](/assets/img/vue双向绑定结合组件通讯.png)

