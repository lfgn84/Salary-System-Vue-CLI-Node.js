<template>
    <div id="salaryInfo">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
        <side>
            <section class="section">
                <div class="container">
                    <h1 class="title">{{user.usersName}} {{user.usersLastName}}</h1>
                    <h2 class="subtitle">
                        <ul>
                            <li><p1>PSS User Range: </p1><p2>{{user.usersRange}}</p2></li>
                            <li><p1>Name: </p1><p2>{{user.usersName}}</p2> <p2>{{user.usersLastName}}</p2></li>
                            <li><p1>PN: </p1><p2>{{user.usersPN}}</p2></li>
                            <li><p1>e-mail: </p1><p2>{{user.usersEmail}}</p2></li>
                            <li><p1> Tel: </p1><p2>{{user.usersPhone}}</p2></li>
                            <li><p1>PSS id: </p1><p2>{{user.usersId}}</p2></li>
                            <li><p1>Income Pot: </p1> <p2 id="pot">{{pot[0].pot.toLocaleString('en-US')}} kr</p2></li>
                            <li><p1>Hiring date: </p1><p2>{{user.usersHiringDate}}</p2></li>
                            <li><p1>First Costumer: </p1><p2>{{user.usersFirstCostumer}}</p2></li>
                            <li><p1>Last Costumer: </p1><p2>{{user.usersLastCostumer}}</p2></li>
                            <li><p1> Stair level: </p1><p2>{{user.usersPctLevel}}</p2></li>
                            <li><p1> Hour fare: </p1><p2>{{user.usersPriceHour}}</p2></li>
                            <li><p1> Brutto Salary: </p1><p2>{{user.usersBruttoSalary}}</p2></li>
                            <li><p1> Employeer Fee: </p1><p2>{{user.usersEmployeerFee}}</p2></li>
                            <li><p1> Salary Tax: </p1><p2>{{user.usersSalaryTax}}</p2></li>
                            <li><p1> Paid vacation: </p1><p2>{{user.usersPaidVacation}}</p2></li>
                            <li><p1> Health Add-on: </p1><p2>{{user.usersHealthSupport}}</p2></li>
                            <li><p1> Insurance: </p1><p2>{{user.usersInsurance}}</p2></li>
                            <li><p1> Extra Pension: </p1><p2>{{user.usersExtraPension}}</p2></li>
                            <li><p1> Mobile cost: </p1><p2>{{user.usersMobile}}</p2></li>
                            <li><p1> Laptop Cost: </p1><p2>{{user.usersLaptop}}</p2></li>
                            <li><p1> Hardware Cost: </p1><p2>{{user.usersMiscHardware}}</p2></li>
                            <li><p1> Misc. : </p1><p2>{{user.usersMisc}}</p2></li>
                            <li><p1> Competence Cost: </p1><p2>{{user.usersCompetenceCost}}</p2></li>




<!--                            usersProjectName:"PSS"-->




                            <li>
                                <router-link class="button is-medium"
                                             :to="{name:'LogIn'}"> Log Out
                                </router-link>
                                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
                            </li>
                            <li>
                                <router-link class="button is-medium"
                                             :to="{name:'Home'}"> Back
                                </router-link>
                                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
                            </li>
                            <li><button class="button is-medium" v-show="user.usersRange == 'owner'">Create a user</button></li>
                            <li><button class="button is-medium" v-show="user.usersRange == 'owner'">Checkout User</button></li>
                        </ul>
                    </h2>
                </div>
            </section>
        </side>
        <table class="table is-bordered is-striped is-narrow is-hoverable">
            <thead>
            <tr>
                <th><abbr title="Date">Date</abbr></th>
                <th><abbr title="Project">Project</abbr></th>
                <th><abbr title="Hour Fare">Hour Fare</abbr></th>
                <th><abbr title="Worked Hours">Worked Hours</abbr></th>
                <th><abbr title="Day Income">Day Income</abbr></th>
            </tr>
            </thead>
            <tfoot>
            <tr>
              <!--  <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Played">Pld</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Drawn">D</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Goals for">GF</abbr></th>
                <th><abbr title="Goals against">GA</abbr></th>
                <th><abbr title="Goal difference">GD</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                <th>Qualification or relegation</th>-->
            </tr>
            </tfoot>
            <tbody>
            <tr v-for="item in salary" v-bind:key="item">
                <td><strong>{{item.salaryDate}}</strong>
                </td>
                <td>{{item.salaryProject}}</td>
                <td>{{item.salaryHourFare}} kr</td>
                <td>{{item.salaryWorkedHours}}</td>
                <td>{{item.salaryIncome.toLocaleString('en-US')}} kr</td>

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "salaryInfo",
        props: {
            user: Object, Array,
        },
        data(){
            return{
            salary: [],
            pot:[]
            }
        },
        created(){
            this.user = this.$route.params.user;
           /* var start = this.user.usersHiringDate;
            var end = new Date();*/

    },
        mounted() {
            var url = new URL('http://127.0.0.1:3000/api/salary/period')
            var params = {
                id: this.user.usersId,
                startDay: '2020-03-26', // this.formatDate(this.user.usersHiringDate),//this.user.usersHiringDate,
                endDay: '2020-07-12'//this.formatDate(new Date())
            };
            console.log(params)
            url.search = new URLSearchParams(params).toString()

            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.salary);
                    this.salary = data.salary;

                });

        },
        watch:{
            user: function(){
                this.updatePot()
            }
        },
        methods:{
            updatePot: function() {
                var url = new URL('http://127.0.0.1:3000/api/salary/pot');
                var params = {
                    id: this.user.usersId
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
            formatDate:function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            },
        }
    }
</script>

<style scoped>
#salaryInfo {
    display: inline-flex;
}
side{
    text-align: left;
}
</style>