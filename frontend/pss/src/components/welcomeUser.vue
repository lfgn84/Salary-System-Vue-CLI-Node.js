<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{helloMessage}}</h1>

    <users></users>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import users from "./components/users";

    export default {
        name: 'welcomeUser',
        components: {
            //   HelloWorld,
            users
        },
        data: function () {
            return {
                helloMessage: "Consultant Information"
            }

        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200&family=Spartan:wght@500&display=swap');

    #app {
        font-family: 'Spartan', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
