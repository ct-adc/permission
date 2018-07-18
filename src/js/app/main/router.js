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
        meta: {authCode: 'page'}
    }, {
        path: '/edit',
        component: Update,
        meta: {authCode: 'operate.edit'},
        children: [{
            path: 'view',
            component: UpdateView,
            meta: {authCode: 'operate.editView'}
        }]
    }, {
        path: '/add',
        component: Update,
        meta: {authCode: 'operate.add'}
    }]
});

export default router;
