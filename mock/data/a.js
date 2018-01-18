/**
 * @author rubyisapm
 */
module.exports = {
    '/permission/get': {
        code: 1,
        data: [] // 查看 添加 编辑 查看of编辑
    },
    '/permission/get1': {
        code: 0,
        data: [30010, 102343, 102344, 102345] // 查看 添加 编辑 查看of编辑
    },
    '/permission/get2': {
        code: 0,
        data: [30010] // 查看
    },
    '/permission/get3': {
        code: 0,
        data: [30010, 102343] // 查看 添加
    },
    '/permission/get4': {
        code: 0,
        data: [30010, 102343, 102344] // 查看 添加 编辑
    }
};