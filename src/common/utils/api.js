/**
 * Created by li on 19/12/2017.
 */
import fetchApi from '@common/utils/fetchApi';

export default {
    logout: function (query) {  // 登出
        return fetchApi({
            url: '/logout',
            params: query
        });
    }
}
