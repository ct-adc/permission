<template>
    <div class="hv-center text-muted text-center f20">
        {{permissionNote}}
        <p class="text-center mt20 f14">
            请联系相关人员进行权限申请，若已配好权限，点击 <button type="button" class="btn btn-sm btn-primary" @click="jumpToIndex">刷新试试</button>
        </p>
    </div>
</template>
<script>
    export default {
        methods: {
            jumpToIndex(){
                window.location = window.location.href.replace(/^([^#]+).*$/, '$1');
            }
        }
    };
</script>
