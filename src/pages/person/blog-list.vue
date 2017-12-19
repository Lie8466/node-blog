<template>
    <div class="blog-list">
        <navbar></navbar>
        <div class="page-content">
            <span>test</span>
        </div>
    </div>
</template>
<style lang="scss">
    @import '~@common/styles/common.scss';
    .blog-list {

    }

</style>
<script lang="javascript">
    import navbar from '@common/components/nav-bar';

    export default{
        data () {
            return {
                username: '',
                password: ''
            };
        },
        components: {
            navbar
        },
        methods: {}
    };
</script>
