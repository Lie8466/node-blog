<template>
    <div class="login-page">
        <form class="form-horizontal" @submit.prevent="submit">
            <div class="form-group">
                <label class="col-sm-5 control-label">用户名</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" name="username" v-model="username" placeholder="请输入用户名">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-5 control-label">密码</label>
                <div class="col-sm-2">
                    <input type="password" name="password" class="form-control" v-model="password" placeholder="请输入密码">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-5 col-sm-2">
                    <button type="submit" class="btn btn-block btn-primary">登录</button>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-5 col-sm-2">
                    <div class="user-login">没有账号?
                        <router-link target="_blank"
                                     :to="{name: 'register'}"
                                     class="table-control">点此注册
                        </router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style lang="scss">
    @import '~@common/styles/common.scss';
    .login-page {
        margin: 13% auto;
        .user-login {
            text-align: center;
            color: $grey;
        }
    }

</style>
<script lang="javascript">
    import api from './api';
    import store from 'src/store';

    export default{
        data () {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            submit () {
                if (!this.username || !this.password) {
                    this.$message({
                        message: '请输入用户名和密码',
                        type: 'error'
                    });
                    return;
                }
                const params = {
                    username: this.username,
                    password: this.password
                };

                api.login(params).then(json => {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    console.log(json.data);
                    store.commit('SET_USER_INFO', json.data);
                    this.$router.push({name: 'blogList'});
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
