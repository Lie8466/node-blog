/**
 * Created by li on 10/12/2017.
 */

import login from '../pages/login/login';
import register from '../pages/login/register';
import blogList from '../pages/person/blog-list';

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
            title: '注册登录',
            noAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '用户注册',
            noAuth: true
        }
    },
    {
        path: '/blog-list',
        name: 'blogList',
        component: blogList,
        meta: {
            title: '博客列表',
            noAuth: false
        }
    }
];

export default routerMap;

