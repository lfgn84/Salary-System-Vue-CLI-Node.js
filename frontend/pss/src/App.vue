<template>
    <div id="app">

        <users class="users" :email="accessEmail" v-show="usersON"></users>
        <login class="login" @access-granted="loginPass" v-show="loginON"></login>

    </div>
</template>

<script>
    //import slides from './components/slides.vue';

    import users from "./components/users";
    import login from "./components/login";

    export default {
        name: 'App',
        components: {
            // slides
            users,
            login
        },
        data: function () {
            return {
                helloMessage: "PSS",
                loginON: true,
                usersON: false,
                accessEmail: " "
            }
        },
        methods: {
            loginPass(value) {
                this.usersON = true
                this.loginON = false
                this.accessEmail = value
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200&family=Spartan:wght@500&display=swap');

    #app {
        background-image: url("./assets/logo.png");
        background-position: top center;
        background-repeat: no-repeat;
        display: grid;
        grid-template-columns: repeat(5, 20%);
        grid-auto-rows: 100px;
    }

    .login {
        grid-column: 2/5;
        grid-row: 3/8;
    }

    .users {
        /*background-color: cadetblue;*/
        grid-column: 2/6;
        grid-row: 3/8;
    }
</style>
