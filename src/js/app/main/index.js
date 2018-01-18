import permission from 'permission';
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
