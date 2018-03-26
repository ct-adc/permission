/**
 * @author rubyisapm
 */
// 1 查看 添加 编辑 查看of编辑
// 2 查看
// 3 查看 添加
// 4 查看 添加 编辑
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
        url: '/permission/get4',
        type: 'get'
    }
};
