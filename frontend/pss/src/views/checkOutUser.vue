<template>
    <div class="checkOut">

    <div> User {{userCheckId}}</div>
    <div id="checkAdmin">Checking as : {{checker.usersName}} {{checker.usersLastName}}  Range: {{checker.usersRange}}</div>
    <users :email="userCheckEmail" :user-mode="false" :check-out-mode="true" ></users>
    </div>
</template>

<script>
    import users from "../components/users";

    export default {
        name: "checkOutUser",
        components:{users},
        data(){
            return{
                userCheckId: "",
                userCheckEmail: "",
                checker: ""
            }
        },
        created(){
            this.userCheckId = this.$route.params.userCheckedId;
            this.userCheckEmail = this.$route.params.userCheckedEmail;
            this.checker = this.$route.params.checker;
        },
        mounted(){
            sessionStorage.checkOutMail = this.userCheckEmail;
        }
    }
</script>

<style scoped>
.checkOut{
    background-color: lightgray;
}
#checkAdmin{
    background-color: green;
    color: white;
}
</style>