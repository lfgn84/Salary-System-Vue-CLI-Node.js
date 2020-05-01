<template>
    <div class="consultant">
        <h2>Consultant</h2>

        <!--            <li v-for="users in users" v-bind:key="users.usersId">{{ users.usersName }} {{ users.usersPN }}</li>-->

        <ul>
            <li>PSS user range : {{user.usersRange}}</li>
            <li>name: {{user.usersName}} {{user.usersLastName}}</li>
            <li>personal number: {{user.usersPN}}</li>
            <li>e-mail: {{user.usersEmail}}</li>
            <li>PSS id: {{user.usersId}}</li>
        </ul>


    </div>
</template>

<script>
    export default {
        name: "users",
        props: {
            email: String

        },
        data: function () {
            return {
                users: [],
                user: []

            }
        },
        mounted() {
            fetch('http://127.0.0.1:3000/api/users/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.users);
                    this.users = data.users;
                })
        },
        watch: {
            email: function () {
                for (var i = 0; i <= this.users.length; i++) {
                    if (this.users[i].usersEmail == this.email) {
                        console.log("Object id " + i);
                        this.user = this.users[i];
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&family=Raleway&display=swap');

    .consultant {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-auto-rows: 100px;
    }

    h2 {
        text-align: center;
        grid-row: 2/3;
        font-family: 'Montserrat Alternates', Arial;
        font-size: 30px;
    }

    ul {
        grid-row: 3/5;
    }

    li {
        font-family: "Raleway", Tahoma;
        font-size: 20px;
        text-align: left;
    }
</style>