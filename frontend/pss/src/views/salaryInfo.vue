<template>
    <div id="salaryInfo">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
        <side>
            <div id="h">{{monthYear}}</div>
            <button class="button is-normal  is-dark" @click="previous">Previous Month</button><div class="separator"></div><button class="button is-normal  is-dark" @click="actual">This Month</button>
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
                            <li><p1>Income Pot: </p1> <p2 id="pot" v-bind:class="{'potPlus': pot.actual[0].potWatchNewPot > 0, 'potMinus': pot.actual[0].potWatchNewPot < 0}" v-if=" pot.actual.length > 0">{{pot.actual[0].potWatchNewPot.toLocaleString('en-US')}} kr</p2>
                                <p2 id="pot" v-else-if=" pot.actual.length === 0">0</p2>
                            </li>
                            <li><p1>Hiring date: </p1><p2>{{user.usersHiringDate}}</p2></li>
                            <li><p1>First Costumer: </p1><p2>{{user.usersFirstCostumer}}</p2></li>
                            <li><p1>Last Costumer: </p1><p2>{{user.usersLastCostumer}}</p2></li>
                            <!--<li><p1> Stair level: </p1><p2>{{user.usersPctLevel}}</p2></li>
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
                            <li><p1> Competence Cost: </p1><p2>{{user.usersCompetenceCost}}</p2></li>-->




<!--                            usersProjectName:"PSS"-->



                           <!-- <li>
                                <button class="button is-medium">Edit</button>
                            </li>-->
                            <li>
                                <button class="button is-medium" v-show="!editing" @click="editAndLock">Edit and Lock Month</button>
                                <button class="button is-medium is-warning" v-show="editing" @click="lockMonth">Lock month</button>
                                <button class="button is-medium is-info" v-show="editing" @click="cancelEditLock">Cancel</button>

                            </li>
                            <li>
                                <router-link class="button is-medium"
                                             :to="{name:'LogIn'}"> Log Out
                                </router-link>
                                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
                            </li>

                            <li v-if="!adminCheck">
                                <router-link class="button is-medium"
                                             :to="{name:'Home'}"> Back
                                </router-link>
                                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
                            </li>
                            <li v-else-if="adminCheck">
                                <router-link class="button is-medium"
                                             :to="{name:'checkOutUser'}"> Back
                                </router-link>
                                <!--                <button class="button is-medium" @click="logOut">Log Out</button>-->
                            </li>

                            <!--<li><button class="button is-medium" v-show="user.usersRange == 'owner' || user.usersRange == 'admin' || adminMode ">Create a user</button></li>
                            <li><button class="button is-medium" v-show="user.usersRange == 'owner' || user.usersRange == 'admin' || adminMode " @click="checkUser = true">Checkout User</button></li>
-->                        </ul>
                     <!--   <div class="modal is-active" v-show="checkUser && (user.usersRange == 'owner' || user.usersRange == 'admin')">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                &lt;!&ndash; Any other Bulma elements you want &ndash;&gt;
                                <ul class="menu-list" id="users">
                                    <li>
                                        <a class="is-active">Manage Your Team</a>
                                        <ul v-for="(index, item) in usersList" v-bind:key="index">
                                            <user-list :userListed="usersList[item]" :checker="user"></user-list>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <button class="modal-close is-large" aria-label="close"  @click="checkUser = false"></button>
                        </div>-->
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
                    <th><abbr title="left-in-pot">Left in Pot this Month</abbr></th>
                    <th><abbr title="preliminary-income-pot">Preliminary Income Pot</abbr></th>

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
                    <td><strong> Hour fare </strong>
                    </td>
                    <td>{{user.usersPriceHour}} kr/h</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Stair Level </strong>
                    </td>
                    <td>{{user.usersPctLevel * 100}}%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Salary / hour  </strong>
                    </td>
                    <td>{{infoParams.totalSalaryHour.toLocaleString('en-US')}} kr</td>
                    <td v-if="month.workedHours[0].workedHours !== null">{{month.workedHours[0].workedHours}}</td>
                    <td v-else>0</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Brutto Salary </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.bruttoSalary.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.bruttoSalary"> kr</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Employeer Fee {{(user.usersEmployeerFee * 100).toLocaleString('en-US')}}% </strong>
                    </td>
                    <td> {{infoParams.employerFeeCalc.toLocaleString('en-US')}} kr</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Paid vacation {{user.usersPaidVacation * 100}} % </strong>
                    </td>
                    <td>{{infoParams.vacation.toLocaleString('en-US')}} kr </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Extra Pension:</strong>
                    </td>
                    <td v-if="!editing">{{infoParams.extraPension.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.extraPension"> kr</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Extra Insurance </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.extraInsurance.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.extraInsurance"> kr</td>                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Salary Tax </strong>
                    </td>
                    <td> {{infoParams.sTax.toLocaleString('en-US')}} kr</td>
<!--                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.sTax"> kr</td>                      <td></td>-->
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Competence Cost  </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.competence.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input  type="number" v-model.number="infoParams.competence"> kr</td>                      <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Health Add-On </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.healthAdd.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.healthAdd"> kr</td>                      <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Mobile Cost </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.mobile.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.mobile"> kr</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Laptop Cost </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.laptop.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.laptop"> kr</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Hardware Cost </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.hardware.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.hardware"> kr</td>                      <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Misc Cost </strong>
                    </td>
                    <td v-if="!editing">{{infoParams.misc.toLocaleString('en-US')}} kr</td>
                    <td v-else-if="editing"> <input type="number" v-model.number="infoParams.misc"> kr</td>                      <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong> Total  </strong>
                    </td>
                    <td>{{infoParams.totalExpenseCalc.toLocaleString('en-US')}} kr</td>
                    <td>{{infoParams.totalIncomeCalc.toLocaleString('en-US')}} kr</td>
                    <td v-if="pot.actual.length > 0">{{(pot.actual[0].potWatchNewPot).toLocaleString('en-US') }} kr</td>
                    <td v-else>0 </td>
                    <td v-if="pot.actual.length > 0">{{ (pot.actual[0].potWatchNewPot + infoParams.totalIncomeCalc ).toLocaleString('en-US')  }} kr</td>
                    <td v-else> {{infoParams.totalIncomeCalc.toLocaleString('en-US')}} </td>
                </tr>


                </tbody>
            </table>

        </div>
        <div></div>

        <div id="tab" v-show="salary.length > 0">
            <table class="table is-bordered is-striped is-hoverable">
            <thead>
            <tr>
                <th><abbr title="date">Date</abbr></th>
                <th><abbr title="project">Project</abbr></th>
                <th><abbr title="hour-fare">Hour Fare</abbr></th>
                <th><abbr title="worked-hours">Worked Hours</abbr></th>
                <th><abbr title="day-income">Day Income</abbr></th>
                <th><abbr title="user-locked">User Locked</abbr></th>

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
                <td v-if="item.salaryUserLocked == 1">true</td>
                <td v-else-if="item.salaryUserLocked == 0">false</td>


            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
    // import{eachDayOfInterval, startOfMonth, endOfWeek, subWeeks, addWeeks, getISODay, getDate, getMonth, getYear /*,format*/} from 'date-fns'
    import{ startOfMonth, endOfMonth , subMonths /*,format*/} from 'date-fns'
    //import userList from "../components/userList";

    export default {
        name: "salaryInfo",
        //components: {userList},
        props: {
            user: [Object, Array],
           adminCheck: Boolean
        },
        data(){
            return {
            salary: [],
            pot:{
                actual: [],
                reg: []
            },
            editing: false,
            today: new Date(),
        infoParams:{
            pctLevel: 0,
            priceHour:0,
            bruttoSalary: 0,
            employerFee: 0,
            vacation: 0,
            extraPension: 0,
            extraInsurance: 0,
            sTax: 0,
            competence: 0,
            healthAdd: 0,
            mobile: 0,
            laptop: 0,
            hardware: 0,
            misc: 0,
            employerFeeCalc: 0,
            totalExpenseCalc:0,
            totalIncomeCalc:0,
            totalSalaryHour:0
                },
                mock:{},
            month:{
                start: "",
                end: "",
                workedHours: ""
            }
           // checkUser: false
           // usersList: []
            }
        },
        created(){
            if(sessionStorage.user){
                this.user = JSON.parse(sessionStorage.user);
            }
            else{
                this.user = this.$route.params.user;
            }
            this.adminCheck = this.$route.params.adminCheck;
            this.getStartEnd();
            this.getPot();

            this.getUsersList();
           /* var start = this.user.usersHiringDate;
            var end = new Date();*/

    },
        mounted() {
            if(sessionStorage.user){this.user = JSON.parse(sessionStorage.user)}
            var url = new URL('http://127.0.0.1:3000/api/salary/period')
            var params = {
                id: this.user.usersId,
                startDay: this.formatDate(this.month.start),//this.user.usersHiringDate, //'2020-03-26'
                endDay: this.formatDate(this.month.end)//'2020-07-12'
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
                    this.workedHours();
                   // this.getIncomePot();



                });

        },
        watch:{
            user: function(){
                this.updatePot()
            },
            month:{
                handler: function(val, oldVal){
                    console.log(val, oldVal);
                    this.infoParams.pctLevel = this.user.usersPctLevel;
                    this.infoParams.priceHour = this.user.usersPriceHour;
                    this.infoParams.employerFee = this.user.usersEmployeerFee;
                    this.infoParams.bruttoSalary = this.user.usersBruttoSalary;
                    this.infoParams.vacation = this.user.usersPaidVacation * this.infoParams.bruttoSalary;
                    this.infoParams.extraPension = this.user.usersExtraPension;
                    this.infoParams.extraInsurance = this.user.usersInsurance;
                    this.infoParams.competence = this.user.usersCompetenceCost;
                    this.infoParams.healthAdd = this.user.usersHealthSupport;
                    this.infoParams.mobile = this.user.usersMobile;
                    this.infoParams.laptop = this.user.usersLaptop;
                    this.infoParams.hardware = this.user.usersMiscHardware;
                    this.infoParams.misc = this.user.usersMisc;



                  /*this.infoParams.sTax = (this.infoParams.extraPension + this.infoParams.extraInsurance) * 0.24;
                  this.infoParams.totalSalaryHour = this.infoParams.pctLevel * this.infoParams.priceHour;
                  this.infoParams.employerFeeCalc = this.infoParams.employerFee * this.infoParams.bruttoSalary;*/

                  this.calcExpense();

                  this.infoParams.totalIncomeCalc = this.month.workedHours[0].workedHours * this.infoParams.totalSalaryHour;
                },
                deep: true

            },
            editing: function(){
                if(this.editing){
                  this.calcExpense();
                }
            },
            infoParams: {
                handler: function(val, oldVal){
                    console.log(val, oldVal);
                    this.calcExpense();
                },
                deep:true
            }

        },
        computed:{
            monthYear: function(){
                let month = this.month.start.split('-');
                let actualM = month[1];
                let actualY = month[0];
                switch (actualM) {
                    case '01':
                        actualM = 'January';
                        break;
                    case '02':
                        actualM = 'February';
                        break;
                    case '03':
                        actualM = 'March';
                        break;
                    case '04':
                        actualM = 'April';
                        break;
                    case '05':
                        actualM = 'May';
                        break;
                    case '06':
                        actualM = 'June';
                        break;
                    case '07':
                        actualM = 'July';
                        break;
                    case '08':
                        actualM = 'August';
                        break;
                    case '09':
                        actualM = 'September';
                        break;
                    case '10':
                        actualM = 'October';
                        break;
                    case '11':
                        actualM = 'November';
                        break;
                    case '12':
                        actualM = 'December';
                        break;
                }

                return [actualM, actualY].join(' ');
            }
        },
        methods:{
         /*   updatePot: function() {
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


            },*/
            lockMonth: function(){
                if(confirm('Do you want to lock selected month ? ')){
                this.calcExpense();
                this.editing = false;
                }else{
                    this.cancelEditLock();
                }
            },
            getStartEnd:function(){
                let oldStart = startOfMonth(new Date());
                let oldEnd = endOfMonth(new Date());

                let dateObjS = oldStart;
                let monthS = '' + (dateObjS.getMonth() + 1);
                let dayS = '' + dateObjS.getDate();
                let yearS = dateObjS.getFullYear();

                if (monthS.length < 2)
                    monthS = '0' + monthS;
                if (dayS.length < 2)
                    dayS = '0' + dayS;



                let dateObjE = oldEnd;
                let monthE = '' + (dateObjE.getMonth() + 1);
                let dayE = '' + dateObjE.getDate();
                let yearE = dateObjE.getFullYear();

                if (monthE.length < 2)
                    monthE = '0' + monthE;
                if (dayE.length < 2)
                    dayE = '0' + dayE;

                let newStart =[yearS, monthS, dayS].join('-');
                let newEnd =[yearE, monthE, dayE].join('-');

                this.month.start = newStart;
                this.month.end = newEnd;

            },
            getMonth: function(){
                var url = new URL('http://127.0.0.1:3000/api/salary/period')
                var params = {
                    id: this.user.usersId,
                    startDay: this.formatDate(this.month.start),//this.user.usersHiringDate, //'2020-03-26'
                    endDay: this.formatDate(this.month.end)//'2020-07-12'
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
                        this.workedHours();
                       // this.getIncomePot();


                    });

            },
            previous: function(){
                this.month.start = this.formatDate(subMonths(new Date(this.month.start), 1));
                this.month.end = this.formatDate(subMonths(new Date(this.month.end), 1));
                this.getMonth();
               this.workedHours();
              // this.getIncomePot();


            },
            actual: function(){
               /* this.month.start = startOfMonth(new Date());
                this.month.end = endOfMonth(new Date());*/
               this.getStartEnd();
                this.getMonth();
               this.workedHours();
              // this.getIncomePot();
            },
            workedHours: function(){
                var url = new URL('http://127.0.0.1:3000/api/salary/workedHours')
                var params = {
                    id: this.user.usersId,
                    startDay: this.formatDate(this.month.start),//this.user.usersHiringDate, //'2020-03-26'
                    endDay: this.formatDate(this.month.end),//'2020-07-12'
                    locked: "1"
                };
                console.log(params)
                url.search = new URLSearchParams(params).toString()

                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.salary);
                        this.month.workedHours = data.salary;

                    });
            },
            calcExpense: function(){
                this.infoParams.vacation = this.user.usersPaidVacation * this.infoParams.bruttoSalary;

                this.infoParams.sTax = (this.infoParams.extraPension + this.infoParams.extraInsurance) * 0.24;
                this.infoParams.totalSalaryHour = this.infoParams.pctLevel * this.infoParams.priceHour;
                this.infoParams.employerFeeCalc = this.infoParams.employerFee * this.infoParams.bruttoSalary;

                    this. infoParams.totalExpenseCalc = this.infoParams.employerFeeCalc + this.infoParams.bruttoSalary + this.infoParams.vacation +
                    this.infoParams.extraPension + this.infoParams.extraInsurance + this.infoParams.competence +
                    this.infoParams.healthAdd + this.infoParams.mobile + this.infoParams.laptop + this.infoParams.hardware + this.infoParams.misc;

            },
            getPot: function(){
                let url = new URL('http://127.0.0.1:3000/api/potWatch')
                let params = {
                    id: this.user.usersId,
                };
                url.search = new URLSearchParams(params).toString()

                fetch(url)//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.potWatch);
                        this.pot.reg = data.potWatch;

                    });
                let url2 = new URL('http://127.0.0.1:3000/api/potWatch/actual')
                let params2 = {
                    id: this.user.usersId,
                };
                url2.search = new URLSearchParams(params2).toString()
                fetch(url2)//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.potWatch);
                        this.pot.actual = data.potWatch;

                    });
            },
            editAndLock: function(){
              this.editing = true;
              this.mock = JSON.parse(JSON.stringify(this.infoParams));
            },
            cancelEditLock: function(){
                this.infoParams = JSON.parse(JSON.stringify(this.mock));
                this.editing = false;
                this.mock = {};
            },
          /*  getIncomePot: function(){
                let url = new URL('http://127.0.0.1:3000/api/salary/monthIncome');
                let params = {
                    id: this.user.usersId,
                    uLocked: 1,
                    startDay: this.month.start,
                    endDay: this.month.end,
                };
                url.search = new URLSearchParams(params).toString()
                fetch(url)//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.salary);
                        this.incomePot = data.salary;

                    });
            },*/

       /*     getUsersList: function(){
                let url = new URL('http://127.0.0.1:3000/api/users/list')
                fetch(url)//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.users);
                        this.usersList = data.users;
                    });
            },*/
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
            }
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
input[type=number] {
    -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.potPLus{
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
#h{
    font-weight: bold;
    font-size: 35px;
    text-align: center;
}
#tab{
    background-color: darkolivegreen;

}
#calc{
    background-color: #2c3e50;
    text-align: left
}
.separator{
    width: 5px;
    height: 10px;
}
#users{
    background-color: white;
}

</style>