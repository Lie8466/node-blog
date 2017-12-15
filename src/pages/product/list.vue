<template>
    <div class="product-list">
        <div class="header">
            发现
        </div>
        <mt-navbar v-model="channelEnId">
            <mt-tab-item id="">今日推荐</mt-tab-item>
            <mt-tab-item id="2916181129">古镇风采</mt-tab-item>
            <mt-tab-item id="387217385">欢乐亲子</mt-tab-item>
            <mt-tab-item id="374810364">周边玩乐</mt-tab-item>
            <mt-tab-item id="2757800659">海滩度假</mt-tab-item>
            <mt-tab-item id="3726960176">美食吃货</mt-tab-item>
        </mt-navbar>
        <div v-for="item in list" class="item">
            <div class="item-head">
                <span class="category-name" v-if="item.article.category.name">
                    {{item.article.category.name}}
                </span>
                <span>{{item.article.title}}</span>
            </div>
            <div class="item-body">
                <img v-for="img in item.article.imgs" :src="img.url"/>
            </div>
            <div class="item-user">
                <img :src="item.article.user.img"/>
                <span>{{item.article.user.nickName}}</span>
                <span>{{item.nums.browseCount}}浏览</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import '~@common/styles/common.scss';
    .product-list {
        .header {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: inherit;
            font-weight: 400;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            height: 40px;
            text-align: center;
            padding: 10px;
            background-color: $themeColor;
            color: #fff;
        }
        .item {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-bottom: solid 1px $infoBorder;
            padding: 5px;
            .item-head {
                padding: 5px 0;
                .category-name {
                    display: inline-block;
                    border: solid 1px $dangerColor;
                    background-color: #f9e9e2;
                }
            }
            .item-body {
                padding: 5px 0;
                img {
                    float: left;
                    width: 30%;
                    margin-left: 1.5%;
                    margin-right: 1.5%;
                    height: 80px;
                }
            }
            .item-user {
                padding: 5px 0;
                color: $grey;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border-color: $infoBorder;
                }
            }
        }
        a:focus, a:hover {
            text-decoration: none;
        }
    }

</style>
<script lang="javascript">
    import api from './api';
    import { Indicator, MessageBox } from 'mint-ui';

    export default{
        data () {
            return {
                page: 1,
                list: [],
                totalRows: 0,
                channelEnId: ''
            };
        },
        created () {
            this.getList();
        },
        watch: {
            channelEnId: function (val) {
                if (val) {
                    this.getList ();
                }
            }
        },
        methods: {
            getList () {
                Indicator.open('Loading...');
                const query = {
                    page: this.page,
                    channelEnId: this.channelEnId
                }
                api.list(query).then(json => {
                    this.list = json.data.content;
                    this.totalRows = json.data.totalRows;
                    Indicator.close();
                }).catch(e => {
                    MessageBox.alert(e.message || '接口错误', '错误');
                    Indicator.close();
                });
            }
        }
    };
</script>
