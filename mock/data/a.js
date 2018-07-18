/**
 * @author rubyisapm
 */
module.exports = {
    '/permission/get': {
        Code: 1,
        Data: [] // 查看 添加 编辑 查看of编辑
    },
    '/permission/get1': {
        Code: 0,
        Data: [30010, 102343, 102344, 102345] // 查看 添加 编辑 查看of编辑
    },
    '/permission/get2': {
        Code: 0,
        Data: [30010] // 查看
    },
    '/permission/get3': {
        Code: 0,
        Data: [30010, 102343] // 查看 添加
    },
    '/permission/get4': {
        Code: 0,
        Data: ['30010', '102343', '102344'] // 查看 添加 编辑
    },
    '/permission/get5': {
        Code: 0,
        Data: [30010, 102343, 102345] // 查看 添加 编辑 查看of编辑
    }
};
