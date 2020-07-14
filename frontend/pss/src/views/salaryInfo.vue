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
                            <li><button class="button is-medium" v-show="user.usersRange == 'owner' || user.usersRange == 'admin' ">Create a user</button></li>
                            <li><button class="button is-medium" v-show="user.usersRange == 'owner' || user.usersRange == 'admin'">Checkout User</button></li>
                        </ul>
                    </h2>
                </div>
            </section>
        </side>
        <div id="calc">
            <table class="table  is-narrow is-bordered">
                <thead>
                <tr>
                    <th><abbr title="user-info">User Info</abbr></th>
                    <th><abbr title="calculations">Calculations</abbr></th>
                    <th><abbr title="hours-worked">Hours Worked</abbr></th>
                    <th><abbr title="left-in-pot">Left in pot this month</abbr></th>

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
                <tr>
                    <td><strong> Hour fare: </strong>
                    </td>
                    <td>{{user.usersPriceHour}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Stair Level: </strong>
                    </td>
                    <td>{{user.usersPctLevel}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Salary /hour : </strong>
                    </td>
                    <td>{{user.usersPctLevel * user.usersPriceHour}} kr</td>
                    <td>150</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Brutto Salary: </strong>
                    </td>
                    <td>{{user.usersBruttoSalary.toLocaleString('en-US')}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Employeer Fee {{user.usersEmployeerFee}}: </strong>
                    </td>
                    <td> {{user.usersEmployeerFee * user.usersBruttoSalary}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Paid vacation: </strong>
                    </td>
                    <td>{{user.usersPaidVacation}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Extra Pension:</strong>
                    </td>
                    <td> {{user.usersExtraPension}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Extra Insurance: </strong>
                    </td>
                    <td>{{user.usersInsurance}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Salary Tax: </strong>
                    </td>
                    <td>{{user.usersSalaryTax}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Competence Cost : </strong>
                    </td>
                    <td>{{user.usersCompetenceCost}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Health Add-On: : </strong>
                    </td>
                    <td>{{user.usersHealthSupport}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Mobile Cost: </strong>
                    </td>
                    <td>{{user.usersMobile}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Laptop Cost: </strong>
                    </td>
                    <td>{{user.usersLaptop}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Hardware Cost: </strong>
                    </td>
                    <td>{{user.usersMiscHardware}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Misc Cost: </strong>
                    </td>
                    <td>{{user.usersMisc}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Total : </strong>
                    </td>
                    <td>{{user.usersBruttoSalary + (user.usersBruttoSalary * user.usersEmployeerFee)}}</td>
                    <td>{{150 * (user.usersPriceHour * user.usersPctLevel)}}</td>
                    <td></td>
                    <td></td>
                </tr>


                </tbody>
            </table>
        </div>
        <div id="tab">
        <table class="table is-bordered is-striped is-hoverable">
            <thead>
            <tr>
                <th><abbr title="date">Date</abbr></th>
                <th><abbr title="project">Project</abbr></th>
                <th><abbr title="hour-fare">Hour Fare</abbr></th>
                <th><abbr title="worked-hours">Worked Hours</abbr></th>
                <th><abbr title="day-income">Day Income</abbr></th>
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
                startDay: this.formatDate(this.user.usersHiringDate),//this.user.usersHiringDate, //'2020-03-26'
                endDay: this.formatDate(new Date())//'2020-07-12'
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
    background-color: gray;
}
#tab{
    background-color: darkolivegreen;

}
#calc{
    background-color: #2c3e50;
}
</style>