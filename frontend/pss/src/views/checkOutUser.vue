<template>
    <div class="checkOut">

<!--    <div> User {{userCheckId}}</div>-->
    <div id="checkAdmin">Checking as : {{checker.usersName}} {{checker.usersLastName}}  Range: {{checker.usersRange}}</div>
        <router-link  class="button is-medium"
                     :to="{name:'Home'}" @click="clearCheck"> Home
        </router-link>
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
            if(!sessionStorage.checkOutMail || !sessionStorage.checkOutId || !sessionStorage.checker){
            this.userCheckId = this.$route.params.userCheckedId;
            this.userCheckEmail = this.$route.params.userCheckedEmail;
            this.checker = this.$route.params.checker;
            sessionStorage.checkOutId = this.userCheckId;
            sessionStorage.checkOutMail = this.userCheckEmail;
            sessionStorage.setItem('checker', JSON.stringify(this.checker));
            }
            else if( sessionStorage.checkOutMail || sessionStorage.checkOutId || sessionStorage.checker){
                this.userCheckId = sessionStorage.checkOutId;
                this.userCheckEmail = sessionStorage.checkOutMail;
                this.checker = JSON.parse(sessionStorage.getItem('checker'));
            }
        },
        methods:{
            clearCheck: function(){
                sessionStorage.removeItem('checkOutMail');
                sessionStorage.removeItem('checkOutId');
                sessionStorage.removeItem('checker');
            }
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