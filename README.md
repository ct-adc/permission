## ct-adc-permission

该插件提供后台业务权限的控制辅助，针对页面级控制和页面内部UI的控制。

该插件的原理：

1. 使用VueJs的mix功能，保证每个Vue组件能调取到权限信息；
2. 路由的全局钩子进行路由级别的权限验证，在无权限时进行拦截；

## 组件示例图

无

## 在线demo

无

## 功能点

1. 路由去权限时，提示"对不起，您没有该页面的权限"
2. 页面中的操作没有权限时，可以隐藏相关的按钮

## 使用

从npm安装ct-adc-permission

```
npm install ct-adc-test --save
```
在代码中使用

1. 首先，配置permission的相关配置信息，你可以写在一个单独的模块中，便于代码维护，如：
src/common/permission-config.js

```
export default{
    config: {
        'check-record': {
            pageId: 300105,
            code: {
                page: 30010,
                operate: {
                    add: 102343,
                    edit: 102344,
                    editView: 102345
                }
            }
        }
    },
    ajax: {
        url: '/permission/get3',
        type: 'get'
    }
};
```
2. 在页面的主入口中引入ct-adc-permission:

```
import permission from 'ct-adc-permission';
```
3. 如果要使用路由级别的控制，那么需要在引入ct-adc-permission后引入router:

注意：router的引入必须在permission后

```
import router from './router';
```

4. 初始化permission

```
permission.init(permissionConfig);
```

初始化的目的是告诉permission，关于页面的控制码是怎么样的，至于permissionConfig中的具体样式，在下面会做详细介绍

5. 如果要使用路由级别的控制，那么需要初始化路由钩子用于权限控制

```
permission.initRouterHook(router, 'check-record');
```

6. 在页面初始化时，保证permission先获取权限数据

```
permission.getPermission('check-record').then(()=>{
    new Vue({
        el: '#app',
        router
    });
});
```
另外，如果要配置路由级权限，需要使用权限控制的路由上需要配置requireAuth和authCode，如：
```
routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        meta: {requireAuth: true, authCode: 'page'}
    }, {
        path: '/edit',
        component: Update,
        meta: {requireAuth: true, authCode: 'operate.edit'},
        children: [{
            path: 'view',
            component: UpdateView,
            meta: {requireAuth: true, authCode: 'operate.editView'}
        }]
    }, {
        path: '/add',
        component: Update,
        meta: {requireAuth: true, authCode: 'operate.add'}
    }, {
        path: '/no-permission',
        component: Vue.component('no-permission')
    }]

```

最后，你的权限控制已经完成，配置像下面这样：
```
import permission from 'ct-adc-permission';
import permissionConfig from 'common/permission-config';
import Vue from 'vue';
import router from './router';
permission.init(permissionConfig);
permission.initRouterHook(router, 'check-record');
permission.getPermission('check-record').then(()=>{
    new Vue({
        el: '#app',
        router
    });
});
```

至此，权限配置已经全部完成，那么你在页面中就可以使用了：
按钮的权限控制：
```
<button class="btn btn-sm btn-primary" v-if="permission.operate.add">新增</button>
```

## 方法

### init

初始化路由配置

#### 参数列表

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
option | 权限配置对象 | object |  | 权限配置对象指定了权限码、权限获取等方面的配置 |
- option.noPermission | 无权限提示 | string | '对不起，您没有该页面的权限' | 没有权限时的提示文字 |
- option.reqErrorFree | 是否屏蔽权限获取失败提示 | boolean | '对不起，您没有该页面的权限' | 如果屏蔽权限获取失败的提示，则直接提示无权限，否则，提示请求失败提示 |
- option.config | 权限码配置列表 | object | {} |  | 和后端约定的权限码字典 具体格式见下方备注1
- option.ajax | ajax配置 | object | {url: '', type: 'get', data(pageId){return {pageId: pageId};}} |  | ajax请求参数
-- option.ajax.url | ajax请求地址 | string | '' |  | ajax请求地址
-- option.ajax.type | ajax请求方法 | string | 'get' | 合法的ajax请求方法 | ajax请求方法
-- option.ajax.data | ajax请求数据 | function | function(pageId){return {pageId: pageId};}} | | 该方法接收pageId作为参数，得出接口需要的数据格式
- option.resFilter | 响应内容处理器 | function | 见下方备注2 | | 该方法接收响应内容作为参数，得出一个格式固定的对象，指定响应内容是否正确；具体定义方式见下方备注3

##### 备注1：config（权限码）配置格式

1. config中的每一项为一个页面的权限码配置，如config['check-record']; 其中check-record称为page-key；
2. 针对一个页面的配置，pageId为该页面的权限获取时用到的标识该页面的Id；如下面的配置中，该值为300105;
3. 针对一个页面的配置，code中每一项表示一个权限，一般地，使用page作为页面的权限，而operate中的每一项对应一个操作权限
```
{
    'check-record': {
        pageId: 300105,
        code: {
            page: 30010,
            operate: {
                add: 102343,
                edit: 102344,
                editView: 102345
            }
        }
    }
}
```

##### 备注2：resFilter默认值
```
function(res){
    if (res.code === 0) {
        return {
            status: true,
            msg: '',
            data: res.data
        };
    }
    return {
        status: false,
        msg: '获取权限出错，请联系管理员',
        data: []
    };
}
```

##### 备注3：resFilter方法定义

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
res | 响应对象 | object |  |  | 请求权限数据接口返回的响应对象

返回值

object

该对象必须包含status/msg/data三个key；

返回值 | 说明 | 类型 | 描述 |
--- | --- | --- | --- 
object | 处理后的权限对象 | object | 请求权限数据接口返回的响应对象
- object.status | 状态 | boolean | 是否正确拿到了权限数据
- object.msg | 提示信息 | string | 状态为true时，不会用到msg；状态为false时，如果option.resErrorFree为false,那么将提示该信息
- object.data | 权限数据 | array | 状态为true时，将权限数据写入到该值中返回；例如[1002,1003,1004]

返回值

undefined

### initRouterHook

初始化路由配置；该方法初始化路由钩子

#### 参数列表

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
router | 对应的router对象 | vue-router对象 | 无 | 页面中的router |
page | 页面的代号 | string | 无 |  | 对应config中的page-key

返回值

undefined


## 更新日志

[更新日志](https://github.com/ct-adc/permission/blob/dev/CHANGELOG.md)

## 外部资源依赖列表

- jquery（只要支持ajax方法即可）

