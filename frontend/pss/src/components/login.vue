<template>
    <div class="login">

        <h2>SALARY SYSTEM ACCESS</h2>

        <label class="first">Login with E-mail and password</label>

        <label class="labelmail">E-Mail</label><input class="mail" v-model="inputMail">
        <label class="labelpass">Password</label><input class="password" v-model="inputPass" type="password">
        <button class="logbutton" v-on:click="checkLog" v-on:keyup.enter="checkLog" v-show="!success">LOG IN</button>
<!--        <button class="accessbutton" v-show="success" v-on:click="accessSuccess" v-on:keyup.enter="accessSuccess"> IN TO PSS</button>-->
        <router-link
                :to="{name:'Home', params:{mail : inputMail } }" v-show="success" class="accessbutton" tag="button" > IN TO PSS
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function () {
            return {
                inputMail: "",
                inputPass: "",
                pass: "",
                success: false
            }
        },
        created(){
            sessionStorage.clear()
        },
       /* mounted() {

            fetch('http://127.0.0.1:3000/api/passwords/')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.passwords);
                    this.passwords = data.passwords;
                });
        },*/
        methods: {
            checkLog: function () {
                console.log("log in called");
                var url = new URL('http://127.0.0.1:3000/api/passwords');
                var params = {
                    mail: this.inputMail
                };
                url.search = new URLSearchParams(params).toString();
                fetch(url,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success: ', data.passwords);
                        this.pass = data.passwords[0].passwordsPass;
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                });
                if(this.inputPass == this.pass && this.inputPass !== "" && this.pass !==""){
                    this.success = true
                    sessionStorage.userMail = this.inputMail
                }

            },

            accessSuccess: function () {
                this.$emit('access-granted', this.inputMail)
            }
        },
    }
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css?family=Comfortaa|Fjalla+One&display=swap');
    @media screen and (min-width: 1025px){
    .login {
        display: grid;

        grid-template-columns: 33% 33% 33%;
        grid-auto-rows: 100px;

        /*
                background-color: aqua;
        */

    }

    h2 {
        padding-top: 16px;
        font-family: 'Comfortaa', Tahoma;
        font-size: 50px;
        grid-column: 1/4;
        grid-row: 1/3;
        text-align: center;
        color: white;
        background-color: green;
        border-radius: 25px;


    }

    .first {
        padding-top: 20px;
        padding-left: 15px;
        font-size: 23px;
        color: white;
        text-align: left;
        grid-column: 2/4;
        grid-row: 2/3;


    }


    label {
        /* background-color: #2c3e50;*/
        font-size: 28px;

        font-family: 'Fjalla One', Tahoma;
        text-align: center;


    }

    .labelmail {
        grid-column: 1/1;
        grid-row: 3/3;
    }

    .mail {

        grid-column: 2/3;
        grid-row: 3/3;
        height: 30px;
        font-family: 'Fjalla One', Tahoma;
        font-size: 20px;
    }

    .labelpass {

        grid-column: 1/1;
        grid-row: 4/4;
    }

    .password {
        grid-column: 2/3;
        grid-row: 4/4;
        height: 30px;
        font-family: 'Fjalla One', Tahoma;
        font-size: 20px;

    }

    .logbutton {
        grid-column: 2/2;
        background-color: darkblue;
        max-width: 90px;
        max-height: 80%;
        grid-row: 5/5;
        color: white;
        border-radius: 25px;
        font-family: 'Comfortaa', Tahoma;
        font-size: 20px;
        child-align: middle;

    }

    .accessbutton {
        grid-row: 5/5;
        grid-column: 2/3;
        max-width: 90px;
        max-height: 80%;
        background-color: forestgreen;
        font-family: 'Comfortaa', Tahoma;
        font-size: 20px;
        color: white;
        border-radius: 25px;


    }
}
    @media  screen and (min-width: 768px) and (max-width: 1024px){
        .login {
            display: grid;

            grid-template-columns: 33% 33% 33%;
            grid-auto-rows: 100px;

            /*
                    background-color: aqua;
            */

        }

        h2 {
            padding-top: 16px;
            font-family: 'Comfortaa', Tahoma;
            font-size: 50px;
            grid-column: 1/4;
            grid-row: 1/3;
            text-align: center;
            color: white;
            background-color: green;
            border-radius: 25px;


        }

        .first {
            padding-top: 20px;
            padding-left: 15px;
            font-size: 23px;
            color: white;
            text-align: center;
            grid-column: 1/4;
            grid-row: 2/3;


        }


        label {
            /* background-color: #2c3e50;*/
            font-size: 28px;

            font-family: 'Fjalla One', Tahoma;
            text-align: center;


        }

        .labelmail {
            grid-column: 1/1;
            grid-row: 3/3;
        }

        .mail {

            grid-column: 2/3;
            grid-row: 3/3;
            height: 30px;
            font-family: 'Fjalla One', Tahoma;
            font-size: 20px;
        }

        .labelpass {

            grid-column: 1/1;
            grid-row: 4/4;
        }

        .password {
            grid-column: 2/3;
            grid-row: 4/4;
            height: 30px;
            font-family: 'Fjalla One', Tahoma;
            font-size: 20px;

        }

        .logbutton {
            grid-column: 2/2;
            background-color: darkblue;
            max-width: 90px;
            max-height: 80%;
            grid-row: 5/5;
            color: white;
            border-radius: 25px;
            font-family: 'Comfortaa', Tahoma;
            font-size: 20px;
            child-align: middle;

        }

        .accessbutton {
            grid-row: 5/5;
            grid-column: 2/3;
            max-width: 90px;
            max-height: 80%;
            background-color: forestgreen;
            font-family: 'Comfortaa', Tahoma;
            font-size: 20px;
            color: white;
            border-radius: 25px;


        }
}
    @media  screen and (min-width: 365px) and (max-width: 767px){
        .login {
            display: grid;

            grid-template-columns: 33% 33% 33%;
            grid-auto-rows: 100px;

            /*
                    background-color: aqua;
            */

        }

        h2 {
            max-height: 100px;
            padding-top: 18px;
            font-family: 'Comfortaa', Tahoma;
            font-size: 50px;
            grid-column: 1/4;
            grid-row: 1/3;
            text-align: center;
            color: white;
            background-color: green;
            border-radius: 25px;


        }

        .first {
            padding-top: 20px;
            padding-right: 20px;
            font-size: 17px;
            color: white;
            padding-left: 23px;
            text-align: center;
            grid-column: 1/4;
            grid-row: 2/3;


        }


        label {
            /* background-color: #2c3e50;*/
            font-size: 28px;

            font-family: 'Fjalla One', Tahoma;
            text-align: center;


        }

        .labelmail {
            grid-column: 1/1;
            grid-row: 3/3;
        }

        .mail {

            grid-column: 2/3;
            grid-row: 3/3;
            height: 30px;
            font-family: 'Fjalla One', Tahoma;
            font-size: 20px;
        }

        .labelpass {

            grid-column: 1/1;
            grid-row: 4/4;
        }

        .password {
            grid-column: 2/3;
            grid-row: 4/4;
            height: 30px;
            font-family: 'Fjalla One', Tahoma;
            font-size: 20px;

        }

        .logbutton {
            grid-column: 2/2;
            background-color: darkblue;
            max-width: 90px;
            max-height: 80%;
            grid-row: 5/5;
            color: white;
            border-radius: 25px;
            font-family: 'Comfortaa', Tahoma;
            font-size: 20px;
            child-align: middle;

        }

        .accessbutton {
            grid-row: 5/5;
            grid-column: 2/3;
            max-width: 90px;
            max-height: 80%;
            background-color: forestgreen;
            font-family: 'Comfortaa', Tahoma;
            font-size: 20px;
            color: white;
            border-radius: 25px;


        }
    }

</style>