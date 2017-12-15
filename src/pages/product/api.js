/**
 * Created by li on 14/12/2017.
 */
import fetchApi from '@common/utils/fetchApi';

export default {
    list: function (query) {  // 列表
        return fetchApi({
            url: '/art/list',
            params: query
        });
    },
    detail: function (query) {  // 详情
        return fetchApi({
            url: '/art/query',
            params: query
        });
    }
}
