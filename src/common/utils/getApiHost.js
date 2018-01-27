const apiHostMap = {
    dev: {
        host: '//localhost:3000'
    },
    prod: {
        host: '//localhost:3000'
    }
};
const env = __ENV__;

export default apiHostMap[env]
