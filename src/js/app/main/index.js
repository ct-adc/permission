import permission from 'common/permission';
import Vue from 'vue';
import router from './router';
// permission.route(router);
permission.get('check-record').then(()=>{
    new Vue({
        el: '#app',
        router
    });
});
