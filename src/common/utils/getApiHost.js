const apiHostMap = {
    dev: {
        host: '//localhost:3303'
    },
    prod: {
        host: '//localhost:3303'
    }
};
const env = __ENV__;

export default apiHostMap[env]
