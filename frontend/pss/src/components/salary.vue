<template>
    <div id="salary">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />


        <div class="week">
        <div class="arrows">
            <button class="button is-medium" id="arrow1" @click="backWeek" :disabled="input || edit">Back Week</button>
            <div class="separator"></div>
            <button class="button is-medium" id="arrow2" @click="forwardWeek" :disabled="input || edit">Forward Week</button>
            <div class="separator"></div>
            <button class="button is-medium" id="arrow3" @click="todaysWeek" :disabled="input || edit">Today's Week</button>
            <div></div>
            <div>
            <span style="font-weight: bold; font-size: 15px">Project: </span>
                <select v-model="projectCode">
                <option v-for="option in projectCodes" v-bind:key="option">
                    {{ option.project }}
                </option>
            </select>
                <div>
                    <span v-show="lockedWeek && selectedWeek.length > 0" style="font-weight: bold"> Week locked </span>
                </div>
            </div>
        </div>
            <fieldset class="day" id="monday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                    <div v-for="(item, index) in dayItems(weekData.weekDates[0])"
                        :style="itemStyle(index)"
                        :key="index">
                        {{item}}
                    </div>
            </fieldset>
            <fieldset class="day" id="tuesday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[1])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
            <fieldset class="day" id="wednesday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[2])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
            <fieldset class="day" id="thursday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[3])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
            <fieldset class="day" id="friday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[4])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
            <fieldset class="day" id="saturday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[5])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
            <fieldset class="day" id="sunday" @click="pickDay($event)" :disabled="input || edit || lockedWeek">
                <div v-for="(item, index) in dayItems(weekData.weekDates[6])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </fieldset>
        </div>

                <div class="show-edit">

            <div id="worked" v-for="(item, index) in selectedWeek" v-bind:key="item.salaryDate">
                <worked-day :date="selectedWeek[index]"  @remove="erase" @edit="editing"></worked-day>

            </div>
        </div>
        <button v-bind:class="{'button is-medium': !lockedWeek, 'button is-medium is-inverted is-outlined' : lockedWeek || selectedWeek.length < 1}" :disabled="lockedWeek || selectedWeek.length < 1"  @click="lockWeek">Lock Week</button>

        <button v-bind:class="{'button is-medium': !unlockedWeek, 'button is-medium is-inverted is-outlined' : unlockedWeek || selectedWeek.length < 1 }" :disabled="unlockedWeek || selectedWeek.length < 1" @click="unlockWeek"  v-show="user[0].usersRange == 'owner' || user[0].usersRange == 'admin' || adminMode">Unlock Week</button>

        <div class="modal is-active" v-show="input">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Register new worked day</p>
                </header>
                <section class="modal-card-body">

                    <div class="card-content">
                        <div class="content">
                            <li> {{workDate}}<span style="font-weight: bold"> : DAY WORKED</span></li>
                            <li> {{projectCode}} <span style="font-weight: bold"> : PROJECT CODE</span></li>
                            <li>  {{priceHour}} kr<span style="font-weight: bold"> : PRICE PER WORKED HOUR</span></li>
                            <li>  {{salaryHour}} kr<span style="font-weight: bold"> : INCOME PER WORKED HOUR</span></li>
                            <li><input type="number" min="0" v-model="workedHours"><span style="font-weight: bold"> : WORKED HOURS</span></li>
                            <li><span>{{(dayCost).toLocaleString('en-US')}} kr</span><span style="font-weight: bold"> DAY PRICE</span></li>
                            <li><span>{{(daySalary).toLocaleString('en-US')}} kr</span><span style="font-weight: bold"> DAY INCOME</span></li>
                            <li><span>{{prevent}}</span></li>
                            <br>
                        </div>
                    </div>
                    <!-- Content ... -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="calcDay">Save changes</button>
                    <button class="button" @click="cancelInput">Cancel</button>
                </footer>
            </div>
        </div>
        <div class="modal is-active" v-show="edit">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit worked day</p>
                </header>
                <section class="modal-card-body">

                    <div class="card-content">
                        <div class="content">
                            <li> {{workDate}}<span style="font-weight: bold"> : DAY WORKED</span></li>
                            <li> {{projectCode}} <span style="font-weight: bold"> : PROJECT CODE</span></li>
                            <li>  {{priceHour}} kr<span style="font-weight: bold"> : PRICE PER WORKED HOUR</span></li>
                            <li>  {{salaryHour}} kr<span style="font-weight: bold"> : INCOME PER WORKED HOUR</span></li>
                            <li><input type="number" min="0" v-model="workedHours"><span style="font-weight: bold"> : WORKED HOURS</span></li>
                            <li><span>{{dayCost.toLocaleString('en-US')}}</span><span style="font-weight: bold"> DAY PRICE</span></li>
                            <li><span>{{daySalary.toLocaleString('en-US')}}</span><span style="font-weight: bold"> DAY INCOME</span></li>
                            <li><span>{{prevent}}</span></li>
                            <br>
                        </div>
                    </div>
                    <!-- Content ... -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="change">Save changes</button>
                    <button class="button" @click="cancelEdit">Cancel</button>
                </footer>
            </div>
        </div>


        <ul id="addDay" v-show="false">
           <!-- <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="e.g Alex Smith">
                </div>
            </div>
            <li><span> {{workDate}} : DAY WORKED</span></li>
            <li><span> {{projectCode}} : PROJECT CODE</span></li>
            <li><input type="number" min="0" v-model="priceHour"><span> : PRICE PER WORKED HOUR</span></li>
            <li><input type="number" min="0" v-model="workedHours"> : WORKED HOURS</li>
            <li><span>{{daySalary}}</span><span> DAY INCOME</span></li>
            <li><span>{{prevent}}</span></li>
            <button @click="calcDay">SUBMIT DAY</button>-->

            <li v-for="(item, index) in workedDays" v-bind:key="index">
                <div>DATE: {{item.salaryDate}}</div>
                <div>PROJECT: {{item.salaryProject}}</div>
                <div>HOUR FARE: {{item.salaryHourFare}}</div>
                <div>WORKED HOURS: {{item.salaryWorkedHours}}</div>
                <div>TOTAL: {{item.salaryIncome}}</div>
                <button>edit</button> <button>erase</button>
            </li>
            SELECT SALARY PERIOD:
            <li><input type="date" v-model="startDate"> {{startDate}}</li>
            <li><input type="date" v-model="endDate"> {{endDate}}</li>
            <button @click="getPeriod">GET PERIOD</button>
            <ul>
                <li v-for="(item, index) in selectedDays" v-bind:key="index">
                    <div>DATE: {{item.salaryDate}}</div>
                    <div>PROJECT: {{item.salaryProject}}</div>
                    <div>HOUR FARE: {{item.salaryHourFare}}</div>
                    <div>WORKED HOURS: {{item.salaryWorkedHours}}</div>
                    <div>TOTAL: {{item.salaryIncome}}</div>
                    <button>edit</button> <button>erase</button></li>
            </ul>
        </ul>
    </div>
</template>

<script>
    import{eachDayOfInterval, startOfWeek, endOfWeek, subWeeks, addWeeks, getISODay, getDate, getMonth, getYear /*,format*/} from 'date-fns'
    import workedDay from "./workedDay";

    export default {
        name: "salary",
        components: {workedDay},
        props:{
            user: [Object , Array],
            adminMode: Boolean
        },
        data(){
            return{
                startDate: null,
                endDate : null,
                workDate : null,
                projectCodes:[{project: ""},{project:'PSS'}, {project:'Stena Line'}, {project: 'Volvo'}],
                projectCode:"",
                priceHour:"",
                workedHours:"",
                pctRange:"",
                salaryHour: "",
                salaryCost: "",
                workedDays:[],
                selectedDays:[],
                selectedDay:[],
                selectedWeek:[],
                prevent:"",
                picked:"",
                input: false,
                edit: false,
                editId: "",
                beforeProject: "",
                refreshWeek: 0,
                lockedWeek: false,
                unlockedWeek: true,
                lockedWeeks: [],
               /* pot:{
                    actual: [],
                    reg:[]
                },
                editOldPot:"",*/
                weekData:{
                    today: new Date(),
                    weekDays:['monday','tuesday','wednesday', 'thursday', 'friday','saturday','sunday'],
                    rawDates:[],
                    weekDates:[],



                }
            }
        },
        mounted(){
            this.gettingWeekInfo();
            //this.getPot();
            this.priceHour = this.user[0].usersPriceHour;
            this.pctRange = this.user[0].usersPctLevel;
            this.salaryHour = this.user[0].usersSalaryHour;

        },
       /* updated(){
            this.gettingWeekInfo()
        },*/
        created(){
            var start = startOfWeek(this.weekData.today,{ weekStartsOn: 1 });
            var end = endOfWeek(this.weekData.today,{ weekStartsOn: 1 });
            this.weekData.rawDates = eachDayOfInterval({start: start, end: end });
            console.log("Raw dates" + this.weekData.rawDates);
            for(let i = 0; i <= this.weekData.rawDates.length -1 ; i ++){
                let dateObj = this.weekData.rawDates[i];
                let month = getMonth(dateObj) + 1; //months from 1-12
                let date = getDate(dateObj);
                let day = getISODay(dateObj);
                let year = getYear(dateObj);
                switch(day){
                    case 1:
                        day = 'Monday';
                        break;
                    case 2:
                        day = 'Tuesday';
                        break;
                    case 3:
                        day = 'Wednesday';
                        break;
                    case 4:
                        day = 'Thursday';
                        break;
                    case 5:
                        day = 'Friday';
                        break;
                    case 6:
                        day = 'Saturday';
                        break;
                    case 7:
                        day = 'Sunday';
                        break;
                }
                switch (month) {
                    case 1:
                        month = 'January';
                        break;
                    case 2:
                        month = 'February';
                        break;
                    case 3:
                        month = 'March';
                        break;
                    case 4:
                        month = 'April';
                        break;
                    case 5:
                        month = 'May';
                        break;
                    case 6:
                        month = 'June';
                        break;
                    case 7:
                        month = 'July';
                        break;
                    case 8:
                        month = 'August';
                        break;
                    case 9:
                        month = 'September';
                        break;
                    case 10:
                        month = 'October';
                        break;
                    case 11:
                        month = 'November';
                        break;
                    case 12:
                        month = 'December';
                        break;
                }
                let trimmedDate = day + "/" + date + "/" + month  +  "/" + year ;
                this.weekData.weekDates[i] = trimmedDate;

                console.log(this.weekData.weekDates)
                console.log('pushing clean date');
            }
            this.getLockedWeeks()
        },
        computed:{
            daySalary(){
                return this.salaryHour * this.workedHours
            },
            dayCost(){
                return this.priceHour * this.workedHours
            }

        },
        watch: {
            input: function () {
                this.gettingWeekInfo()
            },
            edit: function () {
                this.gettingWeekInfo()
            },
            lockedWeek: function(){
                if(this.lockedWeek === true){
                    this.unlockedWeek = false;
                }else if(this.lockedWeek === false){
                    this.unlockedWeek = true;
                }
            },
            refreshWeek: function () {
                this.gettingWeekInfo();
                this.getLockedWeeks();
                if(this.refreshWeek > 6){
                    this.refreshWeek = 0
                }
            },
            selectedWeek:{
                handler: function(val, oldVal){
                    let oldNew = {
                        old : oldVal,
                        new : val
                    };
                    let compare = {
                        lockedWeeksUserId: this.user[0].usersId,
                        lockedWeeksStartDate: this.formatDate(this.weekData.rawDates[0]),
                        lockedWeeksEndDate: this.formatDate(this.weekData.rawDates[6])
                    };
                    console.log('comparing '+compare+ '');
                    if(this.selectedWeek.length !== 0){
                    for(let i = 0; i <= this.lockedWeeks.length; i++){
                        console.log('looping selected days index '+ i +'')
                        if(this.lockedWeeks[i].lockedWeeksUserId === compare.lockedWeeksUserId && this.lockedWeeks[i].lockedWeeksStartDate === compare.lockedWeeksStartDate && this.lockedWeeks[i].lockedWeeksEndDate === compare.lockedWeeksEndDate){
                        this.lockedWeek = true;
                        console.log('Locked Week: '+this.lockedWeek+'')
                            break;
                        }else{
                         this.lockedWeek = false;
                            console.log('Locked Week: '+this.lockedWeek+'')

                        }
                    }
                } else {
                        this.lockedWeek = false;

                    }
                    console.log(oldNew)
                },
                deep:true
            }


           /*
            select: function(){
                this.gettingWeekInfo()

        }*/
    },
        methods:{
            calcDay: function() {

                if(this.workDate == "" && this.projectCode == "" && this.priceHour == "" && this.workedHours == "" ){
                    alert( "Please enter working day information")
                }

               else if (this.workDate == "" || this.workDate == null) {
                    alert("Please enter a schedualed worked date")
                }
                else if (this.projectCode == "" || this.projectCode == null) {
                    alert("Please enter working date project code")
                }
                 else if ( this.priceHour == 0 || this.priceHour == null) {
                    alert("Please enter correct hour fare")
                }
                else if (this.workedHours == "" || this.workedHours == 0 || this.workedHours == null) {
                    alert("Please enter an amount of hours worked")
                } else {
                    var day = {
                        salaryUserId: this.user[0].usersId,
                        salaryDate: this.workDate,
                        salaryProject: this.projectCode,
                        salaryHourFare: this.priceHour,
                        salaryHour: this.salaryHour,
                        salaryWorkedHours: this.workedHours,
                        salaryCost: this.priceHour * this.workedHours,
                        salaryIncome: this.salaryHour * this.workedHours,
                        salaryUserLocked: false,
                        salaryAdminLocked: false
                    }
                    fetch('http://127.0.0.1:3000/api/salary/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(day)
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success:', data, day);
                            this.gettingWeekInfo();
                            /*var old = 0;
                            var income = day.salaryIncome;
                            if(this.pot.actual.length === 0 || this.pot.actual[0].potWatchNewPot === null){
                                 old = 0;
                            }else if (this.pot.actual.length > 0 || this.pot.actual[0].potWatchNewPot !== null){
                                 old = this.pot.actual[0].potWatchNewPot;
                            }
                            var increase = {
                                potWatchUserId: this.user[0].usersId,
                                potWatchDate: day.salaryDate,
                                potWatchType: 'input',
                                potWatchAmount: income,
                                potWatchOldPot: old,
                                potWatchNewPot: old + income
                            };
                            console.log(increase);
                            this.inputPot(increase);
*/
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    /* .then((response) => {
                     return response.json();
                 })
                 .then((data) => {
                     console.log(data.passwords);
                     this.passwords = data.passwords;
                 });*/
                    this.gettingDayInfo(this.picked);
                   // this.gettingWeekInfo();
                    this.workedDays.push(day);
                    this.workDate = "";
                    // this.projectCode = "";
                    this.workedHours = "";
                    this.input = false;
                    this.refreshWeek++
                }
            },
            editing: function(data){
                this.beforeProject = JSON.parse(JSON.stringify(this.projectCode));
                this.editId = data.salaryId;
                this.workDate = data.salaryDate;
                this.projectCode = data.salaryProject;
                this.priceHour = data.salaryHourFare;
                this.salaryHour = data.salaryHour;
                this.workedHours = data.salaryWorkedHours;
               // this.editOldPot = oldPotV;
                this.edit = true;

            },
            change: function() {
                if(this.workDate == "" && this.projectCode == "" && this.priceHour =="" && this.workedHours == "" ){
                    alert( "Please enter working day information")
                }

                else if (this.workDate == "" || this.workDate == null) {
                    alert("Please enter a schedualed worked date")
                }
                else if (this.projectCode == "" || this.projectCode == null) {
                    alert("Please enter working date project code")
                }
                else if ( this.priceHour == 0 || this.priceHour == null) {
                    alert("Please enter correct hour fare")
                }
                else if (this.workedHours == "" || this.workedHours == 0 || this.workedHours == null) {
                    alert("Please enter an amount of hours worked")
                } else {
                 //   var inc = JSON.parse(JSON.stringify(this.salaryHour * this.workedHours));
                //    console.log('inc = '+inc+'')
                    let editDay = {
                        salaryUserId: this.user[0].usersId,
                        salaryDate: this.workDate,
                        salaryProject: this.projectCode,
                        salaryHourFare: this.priceHour,
                        salaryHour: this.salaryHour,
                        salaryWorkedHours: this.workedHours,
                        salaryCost: this.priceHour * this.workedHours,
                        salaryIncome: this.salaryHour * this.workedHours
                    };
                    console.log(editDay);
                    fetch('http://127.0.0.1:3000/api/salary/' + this.editId +"", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editDay),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success PUT:', data);
                        this.gettingWeekInfo();
                       // this.editPot(inc);

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.workDate = "";
                this.projectCode = JSON.parse(JSON.stringify(this.beforeProject));
                this.workedHours = "";
                this.edit = false;
                this.beforeProject = "";
                this.refreshWeek++

            }
        },
            erase: function(){
                //this.outputPot(decrease);
                this.gettingWeekInfo();
                this.refreshWeek++;
            },
            lockWeek: function(){
                this.refreshWeek++;
                if(confirm(" Are you sure you want to lock registered week ? Once you have locked a week you cannot make new changes on that week.")){
                fetch('http://127.0.0.1:3000/api/salary/lock', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        salaryUserLocked: true,
                        startDate: this.formatDate(this.weekData.rawDates[0]),
                        endDate: this.formatDate(this.weekData.rawDates[6]),
                        salaryUserId: this.user[0].usersId
                    }),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success PATCH:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    let url = new URL('http://127.0.0.1:3000/api/lockedWeeks')
                    var lockedWeek = {
                        lockedWeeksUserId: this.user[0].usersId,
                        lockedWeeksStartDate: this.formatDate(this.weekData.rawDates[0]),
                        lockedWeeksEndDate: this.formatDate(this.weekData.rawDates[6])
                    }
                    fetch(url, {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(lockedWeek)
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            this.gettingWeekInfo();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    this.gettingWeekInfo();
                    this.refreshWeek++;
                    this.getLockedWeeks();


                }
            },
            unlockWeek: function(){
                this.refreshWeek++;
                if(confirm(" Are you sure you want to unlock registered  locked week ? ")){
                    fetch('http://127.0.0.1:3000/api/salary/lock', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            salaryUserLocked: false,
                            startDate: this.formatDate(this.weekData.rawDates[0]),
                            endDate: this.formatDate(this.weekData.rawDates[6]),
                            salaryUserId: this.user[0].usersId
                        }),
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success PUT:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    let unlockWeek = {
                        lockedWeeksUserId: this.user[0].usersId,
                        lockedWeeksStartDate: this.formatDate(this.weekData.rawDates[0]),
                        lockedWeeksEndDate: this.formatDate(this.weekData.rawDates[6])
                    };
                    fetch('http://127.0.0.1:3000/api/lockedWeeks',  {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(unlockWeek)
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            this.gettingWeekInfo();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    this.gettingWeekInfo();
                    this.refreshWeek++;
                    this.getLockedWeeks();

                }
            },
            getLockedWeeks: function(){
                /*let url = new URL('http://127.0.0.1:3000/api/lockedWeeks'+this.user[0].usersId)
                let params = {
                    id: this.user[0].usersId
                }
                url.search = new URLSearchParams(params).toString()*/

                fetch('http://127.0.0.1:3000/api/lockedWeeks/'+this.user[0].usersId+'')//+this.user[0].usersId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.lockedWeeks);
                        this.lockedWeeks = data.lockedWeeks;

                    });
            },
            getPeriod: function(){
                console.log("getPeriod called")
                var url = new URL('http://127.0.0.1:3000/api/salary/period')
                var params = {
                    id: this.user[0].usersId,
                    startDay: this.startDate,
                    endDay: this.endDate
                }
                url.search = new URLSearchParams(params).toString()

                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.salary);
                        this.selectedDays = data.salary;

                    })
            },
            backWeek: function(){
                this.weekData.rawDates = []
                this.weekData.weekDates = []
                this.weekData.today = subWeeks(this.weekData.today, 1)
                var start = startOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                var end = endOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                this.weekData.rawDates = eachDayOfInterval({start: start, end: end })
                for(let i = 0; i <= this.weekData.rawDates.length -1; i ++){
                    let dateObj = this.weekData.rawDates[i];
                    let month = getMonth(dateObj) + 1; //months from 1-12
                    let date = getDate(dateObj);
                    let day = getISODay(dateObj);
                    let year = getYear(dateObj);
                    switch(day){
                        case 1:
                            day = 'Monday';
                            break;
                        case 2:
                            day = 'Tuesday';
                            break;
                        case 3:
                            day = 'Wednesday';
                            break;
                        case 4:
                            day = 'Thursday';
                            break;
                        case 5:
                            day = 'Friday';
                            break;
                        case 6:
                            day = 'Saturday';
                            break;
                        case 7:
                            day = 'Sunday';
                            break;
                    }
                    switch (month) {
                        case 1:
                            month = 'January';
                            break;
                        case 2:
                            month = 'February';
                            break;
                        case 3:
                            month = 'March';
                            break;
                        case 4:
                            month = 'April';
                            break;
                        case 5:
                            month = 'May';
                            break;
                        case 6:
                            month = 'June';
                            break;
                        case 7:
                            month = 'July';
                            break;
                        case 8:
                            month = 'August';
                            break;
                        case 9:
                            month = 'September';
                            break;
                        case 10:
                            month = 'October';
                            break;
                        case 11:
                            month = 'November';
                            break;
                        case 12:
                            month = 'December';
                            break;
                    }
                    let trimmedDate = day + "/" + date + "/" + month  +  "/" + year ;
                    this.weekData.weekDates[i] = trimmedDate;
                    this.gettingWeekInfo()

                    console.log(trimmedDate)
                    console.log('pushing clean date');
                }


            },
            forwardWeek: function(){
                this.weekData.rawDates = []
                this.weekData.weekDates = []
                this.weekData.today = addWeeks(this.weekData.today, 1)
                var start = startOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                var end = endOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                this.weekData.rawDates = eachDayOfInterval({start: start, end: end })
                for(let i = 0; i <= this.weekData.rawDates.length -1; i ++){
                    let dateObj = this.weekData.rawDates[i];
                    let month = getMonth(dateObj) + 1; //months from 1-12
                    let date = getDate(dateObj);
                    let day = getISODay(dateObj);
                    let year = getYear(dateObj);
                    switch(day){
                        case 1:
                            day = 'Monday';
                            break;
                        case 2:
                            day = 'Tuesday';
                            break;
                        case 3:
                            day = 'Wednesday';
                            break;
                        case 4:
                            day = 'Thursday';
                            break;
                        case 5:
                            day = 'Friday';
                            break;
                        case 6:
                            day = 'Saturday';
                            break;
                        case 7:
                            day = 'Sunday';
                            break;
                    }
                    switch (month) {
                        case 1:
                            month = 'January';
                            break;
                        case 2:
                            month = 'February';
                            break;
                        case 3:
                            month = 'March';
                            break;
                        case 4:
                            month = 'April';
                            break;
                        case 5:
                            month = 'May';
                            break;
                        case 6:
                            month = 'June';
                            break;
                        case 7:
                            month = 'July';
                            break;
                        case 8:
                            month = 'August';
                            break;
                        case 9:
                            month = 'September';
                            break;
                        case 10:
                            month = 'October';
                            break;
                        case 11:
                            month = 'November';
                            break;
                        case 12:
                            month = 'December';
                            break;
                    }
                    let trimmedDate = day + "/" + date + "/" + month  +  "/" + year ;
                    this.weekData.weekDates[i] = trimmedDate;
                    this.gettingWeekInfo();

                    console.log(trimmedDate)
                    console.log('pushing clean date');
                }
            },
            todaysWeek: function(){
                this.weekData.rawDates = [],
                    this.weekData.weekDates = [],
                    this.weekData.today = new Date()
                var start = startOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                var end = endOfWeek(this.weekData.today,{ weekStartsOn: 1 })
                this.weekData.rawDates = eachDayOfInterval({start: start, end: end })
                for(let i = 0; i <= this.weekData.rawDates.length -1; i ++){
                    let dateObj = this.weekData.rawDates[i];
                    let month = getMonth(dateObj) + 1; //months from 1-12
                    let date = getDate(dateObj);
                    let day = getISODay(dateObj);
                    let year = getYear(dateObj);
                    switch(day){
                        case 1:
                            day = 'Monday';
                            break;
                        case 2:
                            day = 'Tuesday';
                            break;
                        case 3:
                            day = 'Wednesday';
                            break;
                        case 4:
                            day = 'Thursday';
                            break;
                        case 5:
                            day = 'Friday';
                            break;
                        case 6:
                            day = 'Saturday';
                            break;
                        case 7:
                            day = 'Sunday';
                            break;
                    }
                    switch (month) {
                        case 1:
                            month = 'January';
                            break;
                        case 2:
                            month = 'February';
                            break;
                        case 3:
                            month = 'March';
                            break;
                        case 4:
                            month = 'April';
                            break;
                        case 5:
                            month = 'May';
                            break;
                        case 6:
                            month = 'June';
                            break;
                        case 7:
                            month = 'July';
                            break;
                        case 8:
                            month = 'August';
                            break;
                        case 9:
                            month = 'September';
                            break;
                        case 10:
                            month = 'October';
                            break;
                        case 11:
                            month = 'November';
                            break;
                        case 12:
                            month = 'December';
                            break;
                    }
                    let trimmedDate = day + "/" + date + "/" + month  +  "/" + year ;
                    this.weekData.weekDates[i] = trimmedDate;
                    this.gettingWeekInfo()

                    console.log(trimmedDate)
                    console.log('pushing clean date');
                }

            },
            pickDay:function(event) {
                if (this.projectCode != ""){
                    var targetId = event.currentTarget.id;
                console.log("clicked day: " + targetId);
                this.input = true;
                switch (event.currentTarget.id) {
                    case "monday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[0]);
                        this.gettingDayInfo(0);
                        this.gettingWeekInfo();
                        this.picked = 0;
                        break;
                    case "tuesday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[1]);
                        this.gettingDayInfo(1);
                        this.gettingWeekInfo();
                        this.picked = 1;
                        break;
                    case "wednesday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[2]);
                        this.gettingDayInfo(2);
                        this.gettingWeekInfo();
                        this.picked = 2;
                        break;
                    case "thursday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[3]);
                        this.gettingDayInfo(3);
                        this.gettingWeekInfo();
                        this.picked = 3;
                        break;
                    case "friday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[4]);
                        this.gettingDayInfo(4);
                        this.gettingWeekInfo();
                        this.picked = 4;
                        break;
                    case "saturday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[5]);
                        this.gettingDayInfo(5);
                        this.gettingWeekInfo();
                        this.picked = 5;
                        break;
                    case "sunday" :
                        this.workDate = this.formatDate(this.weekData.rawDates[6]);
                        this.gettingDayInfo(6);
                        this.gettingWeekInfo();
                        this.picked = 6;
                        break;
                }
            } else if (this.projectCode == ""){
                    alert("Please enter a Project Code")
                }
        },
            cancelInput: function(){
                this.input = false;
                this.workDate = null;
                this.workedHours = "";

            },
            cancelEdit: function(){
                this.edit = false;
                this.workDate = null;
                this.priceHour = 479;
                this.workedHours = "";
                this.projectCode = this.beforeProject;
                this.beforeProject = "";

            },
            gettingDayInfo: function(n){
                let url = new URL('http://127.0.0.1:3000/api/salary/day');
              //  let dateObject = format(this.weekData.rawDates[n], 'YYYY-MM-DD');
                /*let dateObject = this.weekData.rawDates[n];
                console.log(dateObject);
                let day = getDate(dateObject) ;
                let month = getMonth(dateObject)+1;
                let year = getYear(dateObject);
                let formatedDate = ""+year+"-"+month+"-"+day+"";*/

                //console.log(formatedD

                console.log(this.formatDate(this.weekData.rawDates[n]))
                let params = {
                    id: this.user[0].usersId,
                    day: this.formatDate(this.weekData.rawDates[n])

            };
                url.search = new URLSearchParams(params).toString();
                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.salary);
                        this.selectedDay = data.salary;
                    })

            },
            gettingWeekInfo: function(){
                let url = new URL('http://127.0.0.1:3000/api/salary/period')
                let params = {
                    id: this.user[0].usersId,
                    startDay: this.formatDate(this.weekData.rawDates[0]),
                    endDay: this.formatDate(this.weekData.rawDates[6])
                }
                url.search = new URLSearchParams(params).toString()

                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.salary);
                        this.selectedWeek = data.salary;

                    });
                this.$emit('update');

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
            dayItems: function(data){
                var x = data.split("/");
                return x;
            },
            itemStyle: function (i){
                var style = {};
                if(i == 0){
                   style.fontWeight = 'bold';
                   style.fontSize = "23px";
                } else if (i == 1){
                  style.fontSize = "60px";

                } else if(i == 2){
                    style.fontSize = "30px";
                }
                else if(i == 3){
                    style.fontSize = "15px";

                }
                return style
            }
            /*getPot: function(){
                let url = new URL('http://127.0.0.1:3000/api/potWatch')
                let params = {
                    id: this.user[0].usersId,
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
                    id: this.user[0].usersId,
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
            },*/
         /*   inputPot: function(increase){
                fetch('http://127.0.0.1:3000/api/potWatch/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(increase)
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.$emit('update')
                        this.getPot();

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                console.log(increase)
            },*/
           /* outputPot: function(decrease){
                var old = 0;
                var income = decrease.amount * -1;
                if(this.pot.actual.length === 0 || this.pot.actual[0].potWatchNewPot === null){
                    old = 0;
                }else if (this.pot.actual.length > 0 || this.pot.actual[0].potWatchNewPot !== null){
                    old = this.pot.actual[0].potWatchNewPot;
                }
                var rest = {
                    potWatchType: 'output',
                    potWatchAmount: income,
                    potWatchOldPot: old,
                    potWatchNewPot: old + income
                };
                fetch('http://127.0.0.1:3000/api/potWatch/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rest)
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.$emit('update')
                        this.getPot();

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            },*/
      /*      editPot: function(inc){
                var dif = (inc) - (this.editOldPot);
                var editType = "";
                if(dif > 0){
                    editType = "edit/input";
                }
                if(dif < 0){
                    editType = "edit/output";
                }else if (dif === 0){
                    editType = "edit/zero"
                }
                console.log( dif, editType);
                var old = 0;
                if(this.pot.actual.length === 0 || this.pot.actual[0].potWatchNewPot === null){
                    old = 0;
                }else if (this.pot.actual.length > 0 || this.pot.actual[0].potWatchNewPot !== null){
                    old = this.pot.actual[0].potWatchNewPot;
                }
                var edited ={
                    potWatchUserId: this.user[0].usersId,
                    potWatchDate: this.workDate,
                    potWatchType: editType,
                    potWatchAmount: dif,
                    potWatchOldPot: old,
                    potWatchNewPot: old + dif
                };
                fetch('http://127.0.0.1:3000/api/potWatch/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(edited)
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.$emit('update')
                        this.getPot();
                        this.editOldPot = "";

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });



            }*/

        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&family=Raleway&display=swap');

    ul{ padding-left: 200px;
        display: grid;
        text-align: left;
        font-family: 'Raleway', Tahoma;
        font-size: 20px;
        background-color: aqua;
    }
    .content{
        list-style-type: none;
        padding-left: 30px;
        font-size: 30px;
    }
    li{
        text-align: left;
    }
    .show-edit{
        display: inline-flex;
        width: 100%;
        text-align: left;
        justify-content: flex-start;
    }
    article{
        margin-right: 5px;

    }
    footer{
box-sizing: border-box
    }
    button{
        max-width: 30%;
        cursor: pointer;
    }
    #arrow1{
        max-width: 100%;
        font-size: 18px;
        font-family: sans-serif;
    }
    #arrow2{
        max-width: 100%;
        font-size: 18px;
        font-family: sans-serif;
    }
    #arrow3{
        max-width: 100%;
        font-size: 18px;
        font-family: sans-serif;
    }
    .separator{
        width: 30px;
        height: 15px;
    }
    .week{
        display: inline-flex;
    }
    .day{
        height: 200px;
        width: 150px;
        border-right:thick solid black;
        border-bottom: thick solid black;
    }
    .arrows{
        width: 150px;
        display: flex;
        flex-direction: column;
    }
    #monday{
        color: black;
        cursor: pointer;
    }
    #tuesday{
        color: black;
        cursor: pointer;
    }
    #wednesday{
        color: black;
        cursor: pointer;
    }
    #thursday{
        color: black;
        cursor: pointer;
    }
    #friday{
        color: black;
        cursor: pointer;
    }
    #saturday{
        color: black;
        cursor: pointer;
    }
    #sunday{
        color: black;
        cursor: pointer;
    }
    .centered-element {
        height: 100px;
        width: 800px;
        position: absolute;
        left: 20%;
        margin-left: 50px;
        top: 50%;
        margin-top: 50px;
    }
</style>