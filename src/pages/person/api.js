/**
 * Created by li on 14/12/2017.
 */
import fetchApi from '@common/utils/fetchApi';

export default {
    blogList: function (params) {  // 注册
        return fetchApi({
            url: '/blogList',
            params: params
        });
    },
    addBlog: function (params) {  // 注册
        return fetchApi({
            url: '/addBlog',
            data: params,
            method: 'POST'
        });
    }
}
