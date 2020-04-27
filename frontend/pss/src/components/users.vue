<template>
    <div>
        <h2>Consultant</h2>
        <ul>
<!--            <li v-for="users in users" v-bind:key="users.usersId">{{ users.usersName }} {{ users.usersPN }}</li>-->
            <li v-for="users in users" v-bind:key="users.usersId">{{users.usersName}}  {{users.usersLastName}} {{users.usersPN}} {{users.usersEmail}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "users",
        data: function(){
            return {
                users: []
            }
        },
        mounted(){
            fetch('http://127.0.0.1:3000/api/users/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.users);
                    this.users = data.users;
                });
        }

    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200&display=swap');
    h2{
       font-family: 'Mukta',  Arial;
    }
</style>