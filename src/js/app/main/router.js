/**
 * @author rubyisapm
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './component/app';
import Update from './component/update';
import UpdateView from './component/update-view';
Vue.use(VueRouter);
const router = new VueRouter({
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
});

export default router;
