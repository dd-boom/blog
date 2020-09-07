module.exports = {
    title: "旦旦boom!",
    description: "旦旦而学之，久而不怠焉，迄乎成",
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],
    themeConfig: {
        logo: '/favicon.ico',
        sidebar: "auto",
        nav: [{
                text: "博客",
                link: '/webblogs/',
                target: '_self'
            },
            {
                text: "笔记",
                link: '/notes/',
                target: '_self'
            },
            {
                text: "代码块",
                link: '/codeblock/',
                target: '_self'
            },
            {
                text: "CSDN",
                link: 'https://www.csdn.net/',
                target: '_blank'
            },
            {
                text: "npm",
                link: 'https://www.npmjs.com/',
                target: '_blank'
            },
            {
                text: "文档",
                items:[
                    {
                        text: "vue",
                        link: 'https://cn.vuejs.org/',
                        target: '_blank'
                    },
                    {
                        text: "node",
                        link: 'http://nodejs.cn/api/',
                        target: '_blank'
                    },
                    {
                        text:"vant",
                        link:'https://vant-contrib.gitee.io/vant/#/zh-CN/',
                        targrt: '_blank'
                    },
                    {
                        text: "jQuery",
                        link: "https://jquery.cuishifeng.cn/",
                        target: '_blank'
                    },
                    {
                        text: "runoob",
                        link: "https://www.runoob.com/",
                        target: '_blank'
                    },
                    {
                        text:'elementUI',
                        link:'https://element.eleme.cn/#/zh-CN',
                        target:'_blank'
                    }
                ]
            },
            {
                text: "仓库",
                items: [{
                        text: "GitHub",
                        link: 'https://github.com/',
                        target: '_blank'
                    },
                    {
                        text: "gitee",
                        link: 'https://gitee.com/',
                        target: '_blank'
                    }
                ]
            }
            // {
            //     text: "soul",
            //     //   ariaLabel: 'soul menu',
            //     items: [{
            //             text: '首页',
            //             link: 'https://www.soulapp.cn/'
            //         },
            //         {
            //             text: "招聘",
            //             items: [{
            //                     text: "社招",
            //                     link: "https://app.mokahr.com/apply/soul/7146#/jobs"
            //                 },
            //                 {
            //                     text: "校招",
            //                     link: "https://app.mokahr.com/campus_apply/soul/7147#/jobs?_k=tw3fhv"
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ],
        sidebar: {
            '/webblogs/': [
                //'',
                '关于JavaScript严格模式的一些笔记',
                'JavaScript 作用域 作用域链 变量的生命周期',
                '工厂模式、构造函数模式、原型模式',
                'JavaScript全局污染',
                'JavaScript的this',
                'JavaScript预编译',
                '有一个无聊的人用JavaScript封装了单向链表LinkedList构造函数',
                'js冷知识',
                'JavaScript完整原型链图解',
                '闭包的形成机制梳理'
            ],

            '/notes/': [
                //'',
                '工程化环境',
                'git',
                'nodejs',
                'node常用第三方模块',
                'database',
                'Vue',
                'Vue组件',
                'Vue-Cli',
                'Vue-Router',
                'VueX',
                'React'
            ],

            '/codeblock/':[
                //'',
                'vue双向绑定结合组件通讯',
                'vue作用域插槽',
                '函数节流和防抖',
            ]
            // // fallback
            // '/': [
            //   '',        /* / */
            //   'contact', /* /contact.html */
            //   'about'    /* /about.html */
            // ]
        }
    }
}