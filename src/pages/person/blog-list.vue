<template>
    <div class="blog-list">
        <navbar></navbar>
        <div class="page-content">
            <div class="blog" v-for="blog in blogList">
                 <div class="blog-title">
                     {{blog.blogTitle}}
                 </div>
                <div class="create-date">
                    创建时间:{{blog.createDate}}
                </div>
                <div class="blog-content">
                    {{blog.blogContent}}
                </div>
            </div>
            <button type="button" class="btn btn-md btn-primary" @click="showNew = true">新增博客文章</button>
            <div v-if="showNew">
                <form class="form-horizontal" @submit.prevent="submit">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">标题</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="blogTitle" v-model="blogTitle"
                                   placeholder="请输入博客标题">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">内容</label>
                        <div class="col-sm-6">
                            <textarea name="blogContent" rows="10" class="form-control" v-model="blogContent"
                                   placeholder="请输入博客内容" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-4 col-sm-2">
                            <button type="submit" class="btn btn-block btn-primary">新增</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import '~@common/styles/common.scss';
    .blog-list {
        .page-content {
            margin: auto 10%;
            .blog {
                padding: 10px 5px;
                border-bottom: solid 1px $grey;
                margin: 10px auto;
                background-color: $infoBg;
                &-title {
                    font-size: 20px;
                    text-align: center;
                    margin: 5px auto;
                }
                .create-date {
                    color: $grey;
                    text-align: center;
                    margin: 5px auto;
                }
                &-content {
                    width: 50%;
                    margin: 5px auto;
                }
            }
        }
    }

</style>
<script lang="javascript">
    import navbar from '@common/components/nav-bar';
    import {mapState} from 'vuex';
    import api from './api';
    import utils from '@common/utils/utils';

    export default{
        data () {
            return {
                blogList: [],
                blogTitle: '',
                blogContent: '',
                showNew: false
            };
        },
        components: {
            navbar
        },
        created () {
            this.getBlogList();
        },
        computed: mapState({
            userInfo: state => state.userInfo
        }),
        methods: {
            getBlogList () {
                const params = {
                    userId: this.userInfo.userId
                };
                api.blogList(params).then(json => {
                    this.blogList = json.data;
                }).catch(e => {
                    this.$message({
                        message: e.message || '查询博客列表接口错误',
                        type: 'error'
                    });
                });
            },
            submit () {
                const params = {
                    blogTitle: this.blogTitle,
                    blogContent: this.blogContent,
                    createDate: utils.formatDate(new Date()),
                    userId: this.userInfo.userId

                };
                api.addBlog(params).then(() => {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.blogTitle = '';
                    this.blogContent = '';
                    this.getBlogList();
                }).catch(e => {
                    this.$message({
                        message: e.message || '查询博客列表接口错误',
                        type: 'error'
                    });
                });
            }
        }
    };
</script>
