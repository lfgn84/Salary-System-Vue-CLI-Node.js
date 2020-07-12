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
            <span style="font-weight: bold; font-size: 15px">Project: </span> <select v-model="projectCode">
                <option v-for="option in projectCodes" v-bind:key="option">
                    {{ option.project }}
                </option>
            </select>
                <div>
                    <label for="checkbox"><span style="font-weight: bold"> Week locked : </span>{{ lockedWeek }}</label>
                    <input type="checkbox" id="checkbox" v-model="lockedWeek">
                </div>

            </div>
        </div>
            <div class="day" id="monday" @click="pickDay($event)" :disabled="input || edit">
               <!-- <div v-for="index in (weekData.weekDates[0].split('/'))" v-bind:key="index">
                <div>{{index}}</div>
                </div>-->
                    <div v-for="(item, index) in dayItems(weekData.weekDates[0])"
                        :style="itemStyle(index)"
                        :key="index">
                        {{item}}
                    </div>

            </div>
            <div class="day" id="tuesday" @click="pickDay($event)" :disabled="input || edit">
               <!-- <div v-for="item in (weekData.weekDates[1].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[1])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
            <div class="day" id="wednesday" @click="pickDay($event)" :disabled="input || edit">
               <!-- <div v-for="item in (weekData.weekDates[2].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[2])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
            <div class="day" id="thursday" @click="pickDay($event)" :disabled="input || edit">
                <!--<div v-for="item in (weekData.weekDates[3].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[3])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
            <div class="day" id="friday" @click="pickDay($event)" :disabled="input || edit">
               <!-- <div v-for="item in (weekData.weekDates[4].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[4])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
            <div class="day" id="saturday" @click="pickDay($event)" :disabled="input || edit">
                <!--<div v-for="item in (weekData.weekDates[5].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[5])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
            <div class="day" id="sunday" @click="pickDay($event)" :disabled="input || edit">
                <!--<div v-for="item in (weekData.weekDates[6].split('/'))" v-bind:key="item">
                    <div>{{item}}</div>
                </div>-->
                <div v-for="(item, index) in dayItems(weekData.weekDates[6])"
                     :style="itemStyle(index)"
                     :key="index">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="show-edit">
   <!--         <div>
                HOLA DAY !

                <li v-for="(item, index) in selectedDay" v-bind:key="index">
                <div>DATE: {{item.salaryDate}}</div>
                <div>PROJECT: {{item.salaryProject}}</div>
                <div>HOUR FARE: {{item.salaryHourFare}}</div>
                <div>WORKED HOURS: {{item.salaryWorkedHours}}</div>
                <div>TOTAL: {{item.salaryIncome}}</div>
                <button>edit</button> <button>erase</button></li>
            </div>-->
              <!-- <div v-for="item in selectedWeek" v-bind:key="item.salaryDate">
                <article class="message is-info">
                    <div class="message-header">
                        <p>DATE: {{item.salaryDate}}</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        <div>PROJECT: {{item.salaryProject}}</div>
                        <div>HOUR FARE: {{item.salaryHourFare}}</div>
                        <div>WORKED HOURS: {{item.salaryWorkedHours}}</div>
                        <div>TOTAL: {{item.salaryIncome}}</div>
                    </div>
                    <footer>
                        <button>edit</button><button>erase</button>
                    </footer>
                </article>
                </div>
-->

            <div id="worked" v-for="(item, index) in selectedWeek" v-bind:key="item.salaryDate">
                <worked-day :date="selectedWeek[index]"  @remove="erase" @edit="editing"></worked-day>

            </div>


                <!--<li><div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Component
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Save</a>
                        <a href="#" class="card-footer-item">Edit</a>
                        <a href="#" class="card-footer-item">Delete</a>
                    </footer>
                </div></li>-->
              <!--  <li v-for="(item, index) in selectedWeek" v-bind:key="index">
                <div>DATE: {{item.salaryDate}}</div>
                <div>PROJECT: {{item.salaryProject}}</div>
                <div>HOUR FARE: {{item.salaryHourFare}}</div>
                <div>WORKED HOURS: {{item.salaryWorkedHours}}</div>
                <div>TOTAL: {{item.salaryIncome}}</div>
                <button>edit</button> <button>erase</button></li>-->
        </div>
        <button v-bind:class="{'button is-medium': !lockedWeek, 'button is-medium is-inverted is-outlined' : lockedWeek}" :disabled="lockedWeek"  @click="lockWeek">Lock Week</button>
        <button class="button is-medium" @click="unlockWeek">Unlock Week</button>

        <!--  <div class="centered-element" v-show="inputEdit">
          <div class="card">
              <header class="card-header">
                  <p class="card-header-title">
                      Register worked day
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
                  </a>
              </header>
              <div class="card-content">
                  <div class="content">
                      <li><span> {{workDate}} : DAY WORKED</span></li>
                      <li><span> {{projectCode}} : PROJECT CODE</span></li>
                      <li><input type="number" min="0" v-model="priceHour"><span> : PRICE PER WORKED HOUR</span></li>
                      <li><input type="number" min="0" v-model="workedHours"> : WORKED HOURS</li>
                      <li><span>{{daySalary}}</span><span> DAY INCOME</span></li>
                      <li><span>{{prevent}}</span></li>
                      <br>
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item" @click="calcDay">Save</a>
                  <a class="card-footer-item" @click="cancelInputEdit">Cancel</a>
              </footer>
          </div>
          </div>-->

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
                            <li><input type="number" min="0" v-model="priceHour"><span style="font-weight: bold"> : PRICE PER WORKED HOUR</span></li>
                            <li><input type="number" min="0" v-model="workedHours"><span style="font-weight: bold"> : WORKED HOURS</span></li>
                            <li><span>{{daySalary}}</span><span style="font-weight: bold"> DAY INCOME</span></li>
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
                            <li><input type="number" min="0" v-model="priceHour"><span style="font-weight: bold"> : PRICE PER WORKED HOUR</span></li>
                            <li><input type="number" min="0" v-model="workedHours"><span style="font-weight: bold"> : WORKED HOURS</span></li>
                            <li><span>{{daySalary}}</span><span style="font-weight: bold"> DAY INCOME</span></li>
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
            user: [Object , Array]
        },
        data(){
            return{
                startDate: null,
                endDate : null,
                workDate : null,
                projectCodes:[{project: ""},{project:'PSS'}, {project:'Stena Line'}, {project: 'Volvo'}],
                projectCode:"",
                priceHour:479,
                workedHours:"",
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
                weekData:{
                    today: new Date(),
                    weekDays:['monday','tuesday','wednesday', 'thursday', 'friday','saturday','sunday'],
                    rawDates:[],
                    weekDates:[],



                }
            }
        },
        mounted(){
            this.gettingWeekInfo()
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

        },
        computed:{
            daySalary(){
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
            refreshWeek: function () {
                this.gettingWeekInfo()
                if(this.refreshWeek > 6){
                    this.refreshWeek = 0
                }
            }


           /*
            select: function(){
                this.gettingWeekInfo()

        }*/
    },
        methods:{
            calcDay: function() {

                if(this.workDate == "" && this.projectCode == "" && this.priceHour != 479 && this.workedHours == "" ){
                    alert( "Please enter working day information")
                }

               else if (this.workDate == "" || this.workDate == null) {
                    alert("Please enter a schedualed worked date")
                }
                else if (this.projectCode == "" || this.projectCode == null) {
                    alert("Please enter working date project code")
                }
                 else if (this.priceHour != 479 || this.priceHour == 0 || this.priceHour == null) {
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
                        salaryWorkedHours: this.workedHours,
                        salaryIncome: this.priceHour * this.workedHours,
                        salaryUserLocked: false,
                        salaryAdminLocked: false
                    }
                    fetch('http://127.0.0.1:3000/api/salary/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(day),
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
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
                    this.gettingWeekInfo();
                    this.workedDays.push(day);
                    this.workDate = "";
                    // this.projectCode = "";
                    this.priceHour = 479;
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
                this.workedHours = data.salaryWorkedHours;
                this.edit = true;

            },
            change: function() {
                if(this.workDate == "" && this.projectCode == "" && this.priceHour != 479 && this.workedHours == "" ){
                    alert( "Please enter working day information")
                }

                else if (this.workDate == "" || this.workDate == null) {
                    alert("Please enter a schedualed worked date")
                }
                else if (this.projectCode == "" || this.projectCode == null) {
                    alert("Please enter working date project code")
                }
                else if (this.priceHour != 479 || this.priceHour == 0 || this.priceHour == null) {
                    alert("Please enter correct hour fare")
                }
                else if (this.workedHours == "" || this.workedHours == 0 || this.workedHours == null) {
                    alert("Please enter an amount of hours worked")
                } else {

                fetch('http://127.0.0.1:3000/api/salary/' + this.editId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        salaryUserId: this.user[0].usersId,
                        salaryDate: this.workDate,
                        salaryProject: this.projectCode,
                        salaryHourFare: this.priceHour,
                        salaryWorkedHours: this.workedHours,
                        salaryIncome: this.priceHour * this.workedHours
                    }),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success PUT:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.gettingWeekInfo();
                this.workDate = "";
                this.projectCode = JSON.parse(JSON.stringify(this.beforeProject));
                this.priceHour = 479;
                this.workedHours = "";
                this.edit = false;
                this.beforeProject = "";
                this.refreshWeek++

            }
            },
            erase: function(){
                this.gettingWeekInfo()
                this.refreshWeek++
            },
            lockWeek: function(){
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
                        console.log('Success PUT:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.gettingWeekInfo();
                this.refreshWeek++;
                }
            },
            unlockWeek: function(){
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
                    this.gettingWeekInfo();
                    this.refreshWeek++;
                }
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