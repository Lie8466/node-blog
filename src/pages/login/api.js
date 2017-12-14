/**
 * Created by li on 14/12/2017.
 */
import fetchApi from '@common/utils/fetchApi';

export default {
    register: function (params) {  // 注册
        return fetchApi({
            url: '/register',
            data: params,
            method: 'POST'
        });
    }
}
