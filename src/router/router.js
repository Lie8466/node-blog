/**
 * Created by li on 10/12/2017.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router.config';

import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

function getCookie (key) {
    const cookie = document.cookie.split(';');
    let value = '';
    cookie.forEach(item => {
        if (item.split('=')[0].trim() === key) {
            value = item.split('=')[1];
        }
    })
    return value;
}


// 登录时将userId，userName，createDate 放入cookie，跳转页面前判断是否已经登录
router.beforeEach((to, from, next) => {
    const userInfo = {
        userId: getCookie('userId'),
        userName: getCookie('userName'),
        createDate: getCookie('createDate')
    }
    if (userInfo.userName && !to.meta.noAuth) {
        store.commit('SET_USER_INFO', userInfo);
        next();
    } else if (userInfo.userName && to.meta.noAuth){
        router.replace({name: 'blogList'});
    } else if (!to.meta.noAuth){
        router.replace({name: 'login'});
    } else {
        next();
    }
});

export default router;

