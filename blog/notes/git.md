---
title: git
---

# git

## 本地git操作

1. 安装git命令行工具 

2. 进入文件夹 : 你要保存哪些代码就进入到这些代码的文件夹之中 

3. git全局配置 (一台电脑仅需要配置一次):  

**指令** : 

      ` git config --global user.name "[name]"`
      ` git config --global user.email "[email address]"`
      注册一个账号 :  https://gitee.com/signup 填写注册信息 ;
      
      如果想要查看设置是否生效 : C:\Users\administrator\.gitconfig

4. 建立 **git 本地仓库** 

      -分布式版本管理 : 每个人都有一个版本仓库 ;
      

**指令** : `git init` 

      -成功之后会给予提示 : Initialized empty Git repository in E:/课件/DD-2020coding/20200723/project/.git/
      - 翻译  : 在 E:xxx 路径下初始化了一个空的git仓库;

**指令** : `ls -a` 查看是否存在 .git 文件夹 

5. 认识本地版本仓库 : 
   
   1. 暂存区 : 记录要入库的文件有哪些，记录文件更新信息
   2. 仓库 : 入库存储,存储真实数据. 每一次入库都会生成一个独一无二的入库记录 ;
      1. 版本号 : 独一无二的入库记录;
      2. 版本号 : 如果想要取出数据，必须使用版本号;

6. 代码入库 : 

**指令** : 1. `git add -A` 把所有的文件放入暂存区;
**指令** : 2. `git commit -m "这是注释"` 把文件放入仓库之中, -m 必须添加注释;
       

7. 版本还原 : 

**指令** : 
      1. `git reflog` 找到所有的git版本;
      2. `git reset --hard 版本号` 还原回对应的版本号  
           - 版本回溯 : 事故级别;

8. 工作结束应该先提交代码到本地仓库 

**指令** : 使用 6 的指令即可;

9.  建立一个线上仓库 : 首页 => 右上角加号+ => 新建仓库 

10. 上传本地仓库到 线上仓库 : 

**指令** :`git remote add origin https://gitee.com/ddboom/demo.git`

给本地仓库添加一个远程仓库目标 , 所以给目标一个简写 origin (换成任何名字);
`git remote (远程端添加指令) add (远程端的别名) origin(别名) https://gitee.com/ddboom/demo.git(仓库地址)`

**指令** : 测试添加是否成功 `git remote get-url origin` 如果返回正确的地址则表示路径没有问题;

查看是否成功创建提交源 :  `git remote`  结果 : origin 

**指令** : 如果路径设置错误 `git remote set-url origin 新路径`

1.  本地仓库 推送到线上仓库 

**指令** : `git push -u origin master` 

`git push -u (推送指令) origin (路径) master (分支)`

12. 线上仓库破坏代码  ; 

- push 失败 
- pull 拉取线上最新代码; `git pull origin master`

- 有时候会让我们的 git 工具进入到奇怪的地方 : vim ;

- i 插入模式

- 退出vim  :   esc : 进入指令模式 输入 :wq 表示保存并退出;

- 如果有更改一定记得重新 add , commit 再提交;

13. 特殊问题合并处理 : 

冲突解决 : 编辑器解决;


## 多人协作

14. 组织 : 

- gitee 提供给我们的功能 ， 用户共同维护一个项目;
- 所有组织中的成员都有权限去维护我们的项目;

15. 建立组织 : 

- 右上角+ => 创建组织 

16. 下拉仓库代码 

- `git clone https://gitee.com/ddboom/demo.git`

- 进入文件夹  
- 重启gitbash工具 
- 更新代码 
- git add -A 添加所有内容到暂存区 
- git commit -m "旦旦的代码" 提交代码到本地仓库
- git push -u origin master 把本地仓库的代码提交到线上仓库 

- 提交失败 : 

- git pull origin master 别人的代码同步下来 
- 进行去重 : 手动去重
- 合并 :  重新提交 : `git add -A`  `git commit -m "合并之后的版本"`


- 极端的方案 : 
- 强制推送 : `git push -f origin master`

17. git 分支结构 

- git分支创建 : `git branch 分支名`
- 查看分支    : `git branch`
- 切换到分支  : `git checkout 分支名` 
- 切换分之后 git bash 工具里的分支名称会发生变化,注意此时如果变化到你切换的分支则表示切换成功; 
- 分支切换创建简写 : `git checkout -b dev2`

分支开发结束 : 

- 分支合并 : `git merge` 在当前分支合并其他分支;

- 分支使用结束 : 删除分支;
  - `git branch -d 分支名`

- 分支命名规范 : 
  - vip-index
  - vip-login

- 分支提交到线上 : 
  `git push -u origin 分支名`

