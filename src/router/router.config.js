/**
 * Created by li on 10/12/2017.
 */

import list from '../pages/product/list';
import detail from '../pages/product/detail';

const routerMap = [
    {
        path: '/',
        redirect: {name: 'list'}
    },
    {
        path: '/list',
        name: 'list',
        component: list,
        meta: {
            title: '产品列表'
        }
    },
    {
        path: '/register/:id',
        name: 'detail',
        component: detail,
        meta: {
            title: '产品详情'
        }
    }
];

export default routerMap;

