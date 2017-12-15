/**
 * Created by li on 10/12/2017.
 */
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@common/styles/common.scss';

import App from './pages/app';
import router from './router/router';
import store from './store/';

Vue.use(MintUI);

window.root = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
