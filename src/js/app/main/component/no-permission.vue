<template>
    <div class="hv-center text-muted f20">{{note}}</div>
</template>
<script>
    export default{
        computed: {
            note(){
                return this.$route.query.note;
            }
        }
    };
</script>
