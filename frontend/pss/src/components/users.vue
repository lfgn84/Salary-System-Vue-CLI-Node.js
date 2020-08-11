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
            <li><p1>Income Pot: </p1> <p2 id="pot" v-if="pot.actual.length > 0"  v-bind:class="{'potPlus': pot.actual[0].potWatchNewPot > 0, 'potMinus': pot.actual[0].potWatchNewPot < 0}">{{pot.actual[0].potWatchNewPot.toLocaleString('en-US')}} kr</p2>
                <p2 id="pot" v-else-if="pot.actual.length === 0">0</p2>

            </li>
            <li>
                <router-link class="button is-medium"
                        :to="{name:'LogIn'}" @click="logOut"> Log Out
                </router-link>
<!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
            </li>
            <li>
                <router-link class="button is-medium"
                             :to="{name:'salaryInfo', params:{user: this.user[0], adminCheck: this.checkOutMode}}" > User's salary information
                </router-link>
                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
            </li>
            <li>

            <div v-show="!checkOutMode">
                <div div v-bind:class="{ 'dropdown': !adminDrop , 'dropdown is-active': adminDrop }" class="" v-show="this.user[0].usersRange === 'admin' || this.user[0].usersRange === 'owner'">
                    <div class="dropdown-trigger">
                        <button class="button is-medium" aria-haspopup="true" aria-controls="dropdown-menu" @click="adDrop">
                            <span>Admin Features</span>
                            <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">
                                Create a user
                            </a>
                            <a class="dropdown-item"  @click="checkUser = true">
                                Checkout user
                            </a>
                            <!--<a href="#" class="dropdown-item">
                                Other dropdown item
                            </a>-->
                        </div>
                    </div>
                </div>
            </div>
                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
            </li>
        </ul>

            <div class="modal is-active" v-show="checkUser && (user[0].usersRange == 'owner' || user[0].usersRange == 'admin')">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <!-- Any other Bulma elements you want -->
                    <ul class="menu-list" id="users">
                        <li>
                            <a class="is-active">Manage Your Team</a>
                            <ul v-for="(index, item) in usersToCheck" v-bind:key="index">
                                <user-list :userListed="usersToCheck[item]" :checker="user[0]"></user-list>
                            </ul>
                        </li>
                    </ul>
                </div>
                <button class="modal-close is-large" aria-label="close"  @click="checkUser = false"></button>
            </div>

        </div>
        <div id="salary">
        <salary :user="user" :admin-mode="checkOutMode" @update="updatePot"></salary>
        </div>
    </div>
</template>

<script>

    import salary from "./salary";
    import userList from "./userList";


    export default {
        name: "users",
        components: {
            salary,
            userList
        },
        props: {
            email: String,
            userMode: Boolean,
            checkOutMode: Boolean

        },
        data: function () {
            return {
                user: [],
                usersToCheck: [],
                adminDrop: false,
                pot:{
                    actual: [],
                    reg:[]
                },
                checkUser: false

            }
        },
        created() {
            if(sessionStorage.userMail && this.userMode) {
                this.email = sessionStorage.userMail;
            }else if (sessionStorage.checkOutMail && this.checkOutMode){
                this.email = sessionStorage.checkOutMail
            }
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
                    sessionStorage.setItem('user', JSON.stringify(this.user[0]))
                });

        },
        mounted() {
        this.getUsersList();
            },
        watch:{
            user: async function() {
                this.updatePot()
            }
        },
        methods:{
        updatePot: function() {
            var url = new URL('http://127.0.0.1:3000/api/potWatch/actual/');
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
                    console.log(data.potWatch);
                    this.pot.actual = data.potWatch;

                });
            var url2 = new URL('http://127.0.0.1:3000/api/potWatch/');
            var params2 = {
                id: this.user[0].usersId
            };
            url2.search = new URLSearchParams(params2).toString();
            console.log(url2)
            fetch(url2)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.potWatch);
                    this.pot.reg = data.potWatch;
                });

        },
            getUsersList: function(){
                let url = new URL('http://127.0.0.1:3000/api/users/list')
                fetch(url)//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.users);
                        this.usersToCheck = data.users;
                    });
            },
            adDrop: function(){
            if(!this.adminDrop){
                this.adminDrop = true;
            }else if(this.adminDrop){
                this.adminDrop = false;
            }
        },
            logOut: function(){
                sessionStorage.clear();
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
        #users{

            background-color: white;
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
        .potPlus{
            border: solid thick lightblue;
            background-color: #42b983;
            color: white;
            padding-right: 15px;
            padding-left: 5px;
        }
        .potMinus{
            border: solid thick lightcoral;
            background-color: lightpink;
            color: red;
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