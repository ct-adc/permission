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
npm install ct-adc-permission --save
```
在代码中使用

1. 首先，配置permission的相关配置信息，并初始化一个全局通用的permission,建议将以下代码写在一个单独的模块中，便于通用和维护，如：
src/common/permission.js

```
import permission from 'ct-adc-permission';

export default permission.config({
    reqErrorFree: true,
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
    axios: {
        url: '/permission/get3'
    }
});
```
2. 在页面的主入口中引入common/permission.js:

```
import permission from 'common/permission';
```
3. 如果要使用路由级别的控制，那么使用permission.route方法, 将需要控制的路由对象传给permission，以便permission为此路由对象加入钩子:
 （如果你所开发的页面没有使用路由，那么跳过该步骤)

```
import router from './router';
permission.route(router);
```
如果使用路由权限控制的话，仅调用该方法是不够的，需要在初始化router对象时添加权限配置, 见[路由对象配置](#router对象配置)

4. 在页面初始化时，保证permission先获取权限数据

```
permission.get('check-record').then(()=>{
    new Vue({
        el: '#app',
        router
    });
});
```
### router对象配置

如上所说，如果要配置路由级权限，需要使用权限控制的路由上需要配置authCode，如果没有authCode，则表示该路由没有直接的权限控制。如：
```
routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        meta: {authCode: 'page'} //指定该路由需要权限控制，且权限对应的是permission.page
    }, {
        path: '/edit',
        component: Update,
        meta: {authCode: 'operate.edit'}, //指定该路由需要权限控制，且权限对应的是permission.operate.edit
        children: [{
            path: 'view',
            component: UpdateView,
            meta: {authCode: 'operate.editView'} //指定该路由需要权限控制，且权限对应的是permission.operate.editView
        }]
    }, {
        path: '/add',
        component: Update,
        meta: {authCode: 'operate.add'} //指定该路由需要权限控制，且权限对应的是permission.operate.add
    }]
```
注意： '/no-permission'为组件占用的路由，在业务中应避免使用该路由。

最后，你的权限控制已经完成，配置像下面这样：
```
import permission from 'common/permission'; // ！此处引用项目自身的common/permission
import Vue from 'vue';
import router from './router';
permission.route(router);
permission.get('check-record').then(()=>{
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
| option | 权限配置对象 | object |  | 权限配置对象指定了权限码、权限获取等方面的配置 |
| - option.noPermission | 无权限提示 | string | '对不起，您没有该页面的权限' | 没有权限时的提示文字 |
| - option.reqErrorFree | 是否屏蔽权限获取失败提示 | boolean | false | 如果屏蔽权限获取失败的提示，则直接提示无权限，否则，提示请求失败提示 |
| - option.reqErrorMsg | 接口出错提示 | string | '获取权限出错，请联系管理员' | 当不屏蔽权限获取失败提示时，如果接口请求出错，则返回该提示 |
| - option.config | 权限码配置列表 | object | {} |  | 和后端约定的权限码字典 具体格式[见下方](#config（权限码）配置格式)
| - option.axios | axios配置 | object | [见下方](#optionaxios)|  | axios请求参数 [见下方](#optionaxios)

##### config（权限码）配置格式

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

**备注:** 上述权限码兼容数字和字符串

##### option.axios

默认值

```
{
    url: '',
    method: 'get',
    transformResponse: [(response)=>{
        const res = utility.objTransfer.lowerKey(JSON.parse(response));

        if (res.code === 0) {
            return {
                status: true, //是否正确拿到了权限数据
                msg: '', //状态为true时，不会用到msg；
                data: res.data //状态为true时，将权限数据写入到该值中返回；例如[1002,1003,1004]
            };
        }
        return {
            status: false,
            msg: '获取权限出错，请联系管理员', // 状态为false时，如果option.resErrorFree为false,那么将提示该信息
            data: []
        };
    }]
}
```
axios配置和axios官方配置除params为函数外，其他均一致。
因为组件中对于请求参数或请求数据是注入的，默认情况下:
1. 如果请求为put/post/patch请求，data默认为{pageId: pageId};
当然你可以通过responseRequest做请求主体的数据转变；

2. 如果请求为除put/post/patch外的请求，params默认为{pageId: pageId};
此时你可以通过设置axios.params为一个方法(参数为pageId)，返回一个处理过后的params；
或者设置axios.params为一个对象，那么请求时将直接使用这个对象作为axios的params对象；

注意：请不要设置多余的请求数据处理配置，如当请求为'post'时，除非你真的需要设置params，否则请不要设置。
因为post请求中params是默认不忽略的，也就是说，axios没有禁止post请求不能带query。

### route

初始化路由配置；该方法初始化路由钩子

#### 参数列表

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
| router | 对应的router对象 | vue-router对象 | 无 | 页面中的router |

返回值

undefined


## 更新日志

[更新日志](https://github.com/ct-adc/permission/blob/master/CHANGELOG.md)

