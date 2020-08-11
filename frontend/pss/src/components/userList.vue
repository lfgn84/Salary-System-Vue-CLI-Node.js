<template>
    <li>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
        <router-link
                     :to="{name:'checkOutUser', params:{checker: checker, userCheckedId: id, userCheckedEmail: eMail}}">

        ID: {{id}} : {{name}} {{lastName}}
        </router-link>
    </li>
</template>

<script>
    export default {
        name: "user-list",
        props:{
            checker: Object,
            userListed: Object
        },
        data(){
            return{
                id: "",
                name: "",
                lastName: "",
                eMail: ""
            }
        },
        mounted() {
            this.id = this.userListed.usersId;
            this.name = this.userListed.usersName;
            this.lastName = this.userListed.usersLastName;
            this.eMail = this.userListed.usersEmail;
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>