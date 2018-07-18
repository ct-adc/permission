/**
 * @author rubyisapm
 */
// 1 查看 添加 编辑 查看of编辑
// 2 查看
// 3 查看 添加
// 4 查看 添加 编辑
import permission from 'permission';

export default permission.config({
    reqErrorFree: false,
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
        url: '/permission/get1',
        method: 'get',
        params(pageId){
            return {
                page: pageId
            };
        }
    }
});
