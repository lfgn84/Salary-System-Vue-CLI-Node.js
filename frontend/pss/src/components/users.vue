<template>
    <div class="consultant">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />

        <h2>Consultant</h2>

        <!--            <li v-for="users in users" v-bind:key="users.usersId">{{ users.usersName }} {{ users.usersPN }}</li>-->
        <div id="user">
        <ul>
            <li><p1>PSS User Range: </p1><p2>{{user[0].usersRange}}</p2></li>
            <li><p1>Name: </p1><p2>{{user[0].usersName}} {{user.usersLastName}}</p2></li>
            <li><p1>PN: </p1><p2>{{user[0].usersPN}}</p2></li>
            <li><p1>e-mail: </p1><p2>{{user[0].usersEmail}}</p2></li>
            <li><p1>PSS id: </p1><p2>{{user[0].usersId}}</p2></li>
            <li><p1>Income Pot: </p1> <p2 id="pot">{{pot[0].pot}} kr</p2></li>
            <li>
                <button class="button is-medium" @click="logOut">Log Out</button>
            </li>
        </ul>
        </div>
        <div id="salary">
        <salary :user="user" @update="updatePot"></salary>
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
                user: [],
                pot: []

            }
        },
        created() {
            if(sessionStorage.mail) {this.email = sessionStorage.mail;}
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
        watch:{
            user: async function() {
                this.updatePot()
            }
        },
        methods:{
        updatePot: function() {
            var url = new URL('http://127.0.0.1:3000/api/salary/pot');
            var params = {
                id: this.user[0].usersId
            };
            url.search = new URLSearchParams(params).toString();
            console.log(url)
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.salary);
                    this.pot = data.salary;
                });


        },
            logOut: function(){
                location.reload()
            }
        }
    }
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

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');


    @media screen and (min-width: 1025px){
    .consultant {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-auto-rows: 100px;
    }
    #user{
        padding-left: 30px;
        grid-column: 1/2;
        grid-row: 3/5;

    }
    p1{
        font-weight: bold;
    }
    h2 {
        text-align: center;
        grid-row: 2/3;
        font-family: 'sans-serif', Arial;
        font-size: 40px;
    }
    ul {

    }
        #pot{
            border: solid thick lightblue;
            background-color: #42b983;
            color: white;
            padding-right: 15px;
            padding-left: 5px;
        }
    li {
        font-family: "sans-serif", Tahoma;
        font-size: 27px;
        text-align: left;
    }
    #salary{
        grid-column: 2/6;
        grid-row: 2/10;

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