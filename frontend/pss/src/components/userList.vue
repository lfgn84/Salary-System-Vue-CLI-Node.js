<template>
    <li>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
        <router-link
                     :to="{name:'checkOutUser', params:{userCheckedId: this.id}}">

        ID: {{id}} : {{name}} {{lastName}}
        </router-link>
    </li>
</template>

<script>
    export default {
        name: "user-list",
        props:{
            userListed: Object
        },
        data(){
            return{
                id: "",
                name: "",
                lastName: "",
            }
        },
        mounted() {
            this.id = this.userListed.usersId;
            this.name = this.userListed.usersName;
            this.lastName = this.userListed.usersLastName;
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>