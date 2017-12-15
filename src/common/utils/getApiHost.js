const apiHostMap = {
    dev: {
        // host: 'https://ugc.dujia.qunar.com'
        host: '//l-dapp1.m.vc.cn6.qunar.com'
    },
    prod: {
        host: 'https://ugc.dujia.qunar.com'
    }
};
const env = __ENV__;

export default apiHostMap[env]
