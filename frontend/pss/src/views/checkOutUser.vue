<template>
    <div> User {{userCheckId}}</div>
</template>

<script>
    export default {
        name: "checkOutUser",
        data(){
            return{
                userCheckId: ""
            }
        },
        created(){
            this.userCheckId = this.$route.params.userCheckedId
        }
    }
</script>

<style scoped>

</style>