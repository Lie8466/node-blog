/**
 * Created by li on 10/12/2017.
 */

import login from '../pages/login/login';
import register from '../pages/login/register';

const routerMap = [
    {
        path: '/',
        redirect: {name: 'login'}
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '注册登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '用户注册'
        }
    }
];

export default routerMap;

