/**
 * @author rubyisapm
 * permission的原理：使用后端返回的权限信息进行vue全局混合，以便在vm中进行按钮控制
 */
import utility from 'ct-utility';
import Vue from 'vue';

const permission = {
    _option: {
        noPermission: '对不起，您没有该页面的权限',
        reqErrorFree: false,
        config: {},
        ajax: {
            url: '',
            type: 'get',
            data(pageId){
                return {
                    pageId: pageId
                };
            }
        },
        resFilter(res){
            res = utility.objTransfer.lowerKey(res);
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
    },
    /**
     * 解析权限数据，得出属性值为Boolean值的权限对象
     * @param {string} page _option.config中的page-key,用于指出是哪个页面
     * @param {array} permisson 权限码组成的数组
     * @private
     * @returns {object} 权限说明对象，形如{'page-key': {pageId: 3904340, page: true, operate: {edit: false}}}
     */
    _parser(page, permisson = []){
        const pageConfig = this._option.config[page].code;
        const pagePermissionStr = JSON.stringify(pageConfig).replace(/pageId:\d+/g, '').replace(/\d{1,20}/g, (match)=> {
            match = match * 1;
            return (permisson.indexOf(match) > -1).toString();
        });

        return JSON.parse(pagePermissionStr);
    },
    /**
     * 将permission对象混合到vue全局
     * @param {object} permission 权限对象
     * @private
     */
    _mix(permission){
        Vue.mixin({
            data(){
                return {
                    permission: permission
                };
            }
        });
    },
    _registerComponent(){
        Vue.component('no-permission', {
            template: '<div class="hv-center text-muted f20">{{note}}</div>',
            computed: {
                note(){
                    return this.$route.query.note;
                }
            }
        });
    },
    /**
     *
     * @param router
     * @param page
     * @private
     */
    initRouterHook(router, page){
        router.beforeEach((to, from, next) => {
            const requireAuth = to.matched.some(record => record.meta.requireAuth);

            if (requireAuth) {
                this.getPermission(page).then(({permission, note}) => {
                    const hasPermission = to.matched.every(record => {
                        if (record.meta.requireAuth && typeof record.meta.authCode !== 'undefined') {
                            return utility.base.getObjValByKey(permission, record.meta.authCode);
                        } else if (record.meta.requiredAuth) {
                            return permission.page;
                        }
                        return true;
                    });

                    if (!hasPermission) {
                        next({
                            path: '/no-permission',
                            query: {
                                note: note
                            }
                        });
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        });
    },
    /**
     * 注入权限配置
     * @param {object} option 权限配置
     * @param {string} option.noPermission 没有权限时的提示文字
     * @param {object} option.config 权限码字典 形如{'page-key': {pageId: 3904340, page: 39043401, operate: {edit: 39043402}}}
     * @param {object} option.ajax ajax配置 同Jquery.ajax配置，其中data为参数是pageId的方法
     * @param {object} option.resFilter 对请求结果的处理函数 参数为响应内容 结果为{status: Boolean, msg: String, data: Object}
     */
    init(option){
        this._option = utility.base.extend(true, {}, this._option, option);
    },
    /**
     * 请求用户在某个页面的权限
     * @param {string} page page-key 对应option.config中的page-key
     * @returns {Promise.<TResult>} 返回请求permission的promise对象
     */
    getPermission(page){
        const pageId = this._option.config[page].pageId;
        const ajaxConfig = JSON.parse(JSON.stringify(this._option.ajax));

        ajaxConfig.data = this._option.ajax.data(pageId);
        return Promise.resolve($.ajax(ajaxConfig)).then(res=> {
            // res = {
            //     code: 0,
            //     data: [30010]
            // };
            res = this._option.resFilter(res);
            if (res.status) {
                //当权限被正常返回时，解析出可读的permission对象
                const permission = this._parser(page, res.data);

                //进行Vue全局混合
                this._mix(permission);
                //返回permission对象 & 无权限时的提示信息
                return Promise.resolve({
                    permission: permission,
                    note: this._option.noPermission
                });
            }
            //当权限没有被正常返回时（即没有拿到权限），返回请求的失败提示
            return Promise.reject(res.msg);
        }).catch(msg=> {
            const permission = this._parser(page);

            //将permission对象中的权限设置为无，并进行Vue全局混合
            this._mix(permission);
            //返回permission对象 & 无权限时的提示信息 注意: 此时提示的是请求错误的提示信息
            return Promise.resolve({
                permission: permission,
                note: this._option.reqErrorFree ? this._option.noPermission : msg
            });
        });
    }
};

permission._registerComponent();
export default permission;
