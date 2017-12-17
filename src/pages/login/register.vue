<template>
    <div class="login-page">
        <form class="form-horizontal" @submit.prevent="submit">
            <div class="form-group">
                <label class="col-sm-5 control-label required">用户名</label>
                <div class="col-sm-2">
                    <input type="text" v-validate="'required|alpha_num'" name="username"
                           class="form-control" v-model="username" placeholder="只支持英文和数字">
                    <span v-if="errors.has('username')" class="is-danger">请输入用户名，只支持英文和数字</span>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-5 control-label required">密码</label>
                <div class="col-sm-2">
                    <input type="password" v-validate="'required|alpha_num'" name="password"
                           class="form-control" v-model="password" placeholder="只支持英文和数字">
                    <span v-if="errors.has('password')" class="is-danger">请输入密码，只支持英文和数字</span>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-5 control-label required">确认密码</label>
                <div class="col-sm-2">
                    <input type="password" v-validate="'required|alpha_num'" name="passwordConfirm"
                           class="form-control" v-model="passwordConfirm" placeholder="只支持英文和数字">
                    <span v-if="errors.has('passwordConfirm')" class="is-danger">请确认密码，只支持英文和数字</span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-5 col-sm-2">
                    <input type="checkbox" v-model="agree"> 同意用户协议
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-5 col-sm-2">
                    <button type="submit" :disabled="!agree" class="btn btn-block btn-primary">注册</button>
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
    import { Validator } from 'vee-validate';

    export default{
        data () {
            return {
                username: '',
                password: '',
                passwordConfirm: '',
                agree: false
            };
        },
        methods: {
            submit () {
                if (this.password !== this.passwordConfirm) {
                    this.$message({
                        message: '密码不一致，请确认',
                        type: 'error'
                    });
                    return;
                }
                const params = {
                    username: this.username,
                    password: this.password,
                    date: this.formatDate(new Date())
                };

                api.register(params).then(json => {
                    this.$message({
                        message: json.message,
                        type: 'success'
                    });
                }).catch(e => {
                    this.$message({
                        message: e.message || '接口错误',
                        type: 'error'
                    });
                });
            },
            formatDate (date) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}-${month}-${day}`;
            }
        }
    };
</script>
