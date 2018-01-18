<template>
    <div>
        <router-link class="btn btn-sm btn-primary" to="/add" v-if="permission.operate.add">新增</router-link>
        <table class="table table-bordered mt10">
            <thead>
                <tr>
                    <th>1</th>
                    <th>1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><router-link class="btn btn-sm btn-primary" to="/edit" v-if="permission.operate.edit">编辑</router-link></td>
                </tr>
            </tbody>

        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        }
    };
</script>

