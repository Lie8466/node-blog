<template>
    <div class="nav-bar">
        <span class="logo">博客平台</span>
        <div class="nav-content">
                <span class="nav-control">
                    <span class="nav-item">hello <span v-if="userInfo">{{userInfo.userName}}</span></span>
                    <span class="nav-item"><a @click="logout" class="btn btn-md btn-primary">退出</a></span>
                </span>
        </div>
    </div>
</template>
<style lang="scss">
    @import '~@common/styles/common.scss';
    .nav-bar {
        display: block;
        box-sizing: content-box;
        height: 60px;
        width: 100%;
        line-height: 58px;
        background: #fff;
        position: fixed;
        z-index: 999;
        .logo {
            float: left;
            position: relative;
            height: 60px;
            width: 190px;
            text-align: center;
            line-height: 60px;
            background: $themeColor;
            color: #fff;
            font-size: 18px;
            font-weight: bolder;
        }
        .nav-content {
            border-bottom: 1px solid $lightGrey;
            margin-left: 190px;
            height: 61px;
        }
        .nav-control {
            float: right;
            font-size: 12px;
            color: $fontGrey;
            .ngui2-dropdown {
                font-size: 12px;;
            }
            .avatar {
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #cccccc;
                overflow: hidden;
                line-height: 0;
                vertical-align: middle;
            }
            .nav-item {
                padding: 0 15px;
            }
        }

    }

</style>
<script lang="javascript">
    import store from 'src/store';
    import {mapState} from 'vuex';
    import api from '@common/utils/api';

    export default{
        data () {
            return {
                username: '',
                password: ''
            };
        },
        computed: mapState({
            userInfo: state => state.userInfo
        }),
        methods: {
            logout: function () {
                api.logout().then(() => {
                    store.commit('SET_USER_INFO', null);
                    this.$router.push({name: 'login'});
                }).catch(e => {
                    this.$message({
                        message: e.message || '接口错误',
                        type: 'error'
                    });
                });
            }
        }
    };
</script>
