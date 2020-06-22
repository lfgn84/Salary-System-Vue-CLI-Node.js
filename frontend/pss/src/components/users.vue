<template>
    <div class="consultant">
        <h2>Consultant</h2>

        <!--            <li v-for="users in users" v-bind:key="users.usersId">{{ users.usersName }} {{ users.usersPN }}</li>-->
        <div id="user">
        <ul>
            <li><p1>PSS user range: </p1><p2>{{user[0].usersRange}}</p2></li>
            <li><p1>name: </p1><p2>{{user[0].usersName}} {{user.usersLastName}}</p2></li>
            <li><p1>personal number: </p1><p2>{{user[0].usersPN}}</p2></li>
            <li><p1>e-mail: </p1><p2>{{user[0].usersEmail}}</p2></li>
            <li><p1>PSS id: </p1><p2>{{user[0].usersId}}</p2></li>
        </ul>
            <button @click="logOut">LOG OUT</button>
        </div>
        <div id="salary">
        <salary :user="user"></salary>
        </div>
    </div>
</template>

<script>

    import salary from "./salary";


    export default {
        name: "users",
        components: {
            salary
        },
        props: {
            email: String

        },
        data: function () {
            return {
                user: []

            }
        },
        created() {
            var url = new URL('http://127.0.0.1:3000/api/users/user');
            var params = {
                mail: this.email
            };
            url.search = new URLSearchParams(params).toString();
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.users);
                    this.user = data.users;
                });
        },
/*        watch: {
            email: function () {
                for (var i = 0; i <= this.users.length; i++) {
                    if (this.users[i].usersEmail == this.email) {
                        console.log("Object id " + i);
                        this.user = this.users[i];
                        break;
                    }
                }
            }
        },*/
        methods:{
            logOut: function(){
                location.reload()
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&family=Raleway&display=swap');



    @media screen and (min-width: 1025px){
    .consultant {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-auto-rows: 100px;
    }
    #user{
        grid-column: 1/2;
        grid-row: 3/5;

    }
    h2 {
        text-align: center;
        grid-row: 2/3;
        font-family: 'Montserrat Alternates', Arial;
        font-size: 30px;
    }
    ul {

    }
    li {
        font-family: "Raleway", Tahoma;
        font-size: 20px;
        text-align: left;
    }
    #salary{
        grid-column: 2/6;
        grid-row: 2;

    }
}
@media  screen and (min-width: 768px) and (max-width: 1024px){

    .consultant {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-auto-rows: 100px;
    }
    #user{
        grid-column: 1/2;
        grid-row: 3/5;

    }

    h2 {
        text-align: center;
        grid-row: 2/3;
        font-family: 'Montserrat Alternates', Arial;
        font-size: 30px;
    }

    ul {

    }
    li {
        font-family: "Raleway", Tahoma;
        font-size: 20px;
        text-align: left;
    }
    #salary{
        grid-column: 3/6;
        grid-row: 2;

    }
}
@media  screen and (min-width: 365px) and (max-width: 767px){

    .consultant {
        text-align: center;
        display: grid;
        grid-auto-rows: 100px;
    }
    #user{
        grid-row: 2/4;

    }

    h2 {
        padding-left: 100px;
        text-align: right;
        grid-row: 1/1;
        font-family: 'Montserrat Alternates', Arial;
        font-size: 30px;
    }

    ul {

    }
    li {
        font-family: "Raleway", Tahoma;
        font-size: 20px;
        text-align: center;
    }
    #salary{
        grid-row: 4;
        text-align: center;

    }
}


</style>