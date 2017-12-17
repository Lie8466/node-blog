/**
 * Created by li on 14/12/2017.
 */
import fetchApi from '@common/utils/fetchApi';

export default {
    login: function (params) {  // 登录
        return fetchApi({
            url: '/login',
            data: params,
            method: 'POST'
        });
    },
    register: function (params) {  // 注册
        return fetchApi({
            url: '/register',
            data: params,
            method: 'POST'
        });
    }
}
