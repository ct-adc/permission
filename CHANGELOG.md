## 更新日志

### 1.1.0

*2018-07-18*

- 优化 无权限页面添加刷新按钮

- 优化 删除requireAuth配置，只保留authCode配置

- 优化 自动加入路由no-permission，用户无需手动加入

- 优化 鉴于第3点，用户无需再保证permission和router的引入顺序

### 1.0.0-beta.3

*2018-06-07*

- 修复 兼容数字和字符串类型的权限码

### 1.0.0-beta.2

*2018-05-22*

- 修复 判断router钩子中的path为/no-permission时直接放行

- 修复 将no-permission组件中的template换成render函数

### 1.0.0-beta.1

*2018-05-06*

- 优化 简化组件使用

- 优化 使用axios代替$.ajax

### 1.0.0-alpha.7

*2018-04-13*

- 修复 ajax加上cache：false 

### 1.0.0-alpha.6

*2018-04-10*

- 修复 请求权限接口出错时，catch中需判断error是否为错误信息，不是错误信息时需使用reqErrorMsg

- 优化 no-permission路由中的信息，读取mix中的permissionNote，不通过query的方式

### 1.0.0-alpha.5

*2018-04-02*

- 修复 将vuejs从dependencied移动到devDependencies,因为有些情况下该组件会安装一个vuejs，并不会使用项目中安装的vuejs（即使项目中的vuejs版本符合该package.json中的需求）

package.json中 vue: '~2.5.0',项目中的安装版本为2.5.13,而安装该组件时会在该组件文件夹中安装一个vue v2.5.16

### 1.0.0-alpha.4

*2018-03-30*

压缩到index.js

### 1.0.0-alpha.3

- 修复 删除路由跳转前的权限请求，直接使用页面初始化时的权限，因为需要让路由跳转能直接跳过去，避免多次请求权限接口

### 1.0.0-alpha.2

**2018-03-01**

- 修复 resFilter默认值中将响应数据的key全部转为小写，以便统一

### 1.0.0-alpha.1

**2018-01-18**

发布1.0.0-alpha.1