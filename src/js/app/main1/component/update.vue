<template>
    <div v-if="isView">
        查看
    </div>
    <div v-else>
        <div>编辑页面</div>
        <router-link class="btn btn-sm btn-primary" to="/edit/view" v-if="permission.operate.editView">查看</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        computed: {
            isView(){
                return /add/.test(this.$route.path);
            }
        }
    };
</script>
