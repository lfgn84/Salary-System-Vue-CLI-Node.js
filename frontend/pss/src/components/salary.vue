<template>
    <div id="salary">
        <button @click="todaysWeek">GO TO TODAYS WEEK</button>
        <div class="week">
            <button @click="backWeek">GO BACK A WEEK</button>
            <div class="day" id="monday" @click="pickDay($event)" >{{weekData.weekDates[0]}}</div>
            <div class="day" id="tuesday" @click="pickDay($event)">{{weekData.weekDates[1]}}</div>
            <div class="day" id="wednesday" @click="pickDay($event)">{{weekData.weekDates[2]}}</div>
            <div class="day" id="thursday" @click="pickDay($event)">{{weekData.weekDates[3]}}</div>
            <div class="day" id="friday" @click="pickDay($event)">{{weekData.weekDates[4]}}</div>
            <div class="day" id="saturday" @click="pickDay($event)">{{weekData.weekDates[5]}}</div>
            <div class="day" id="sunday" @click="pickDay($event)">{{weekData.weekDates[6]}}</div>
            <button @click="forwardWeek">GO FORWARD A WEEK</button>
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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
               <div v-for="item in selectedWeek" v-bind:key="item.salaryDate">
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
        <ul id="addDay"> ADD A NEW WORKED SHIFT
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="e.g Alex Smith">
                </div>
            </div>
            <li><span> {{workDate}} : DAY WORKED</span></li>
            <li><input type="text" v-model="projectCode"><span> : PROJECT CODE</span></li>
            <li><input type="number" min="0" v-model="priceHour"><span> : PRICE PER WORKED HOUR</span></li>
            <li><input type="number" min="0" v-model="workedHours"> : WORKED HOURS</li>
            <li><span>{{daySalary}}</span><span> DAY INCOME</span></li>
            <li><span>{{prevent}}</span></li>
            <button @click="calcDay">SUBMIT DAY</button>
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

    export default {
        name: "salary",
        props:{
            user: [Object , Array]
        },
        data(){
            return{
                startDate: null,
                endDate : null,
                workDate : null,
                projectCode:"",
                priceHour:479,
                workedHours:"",
                workedDays:[],
                selectedDays:[],
                selectedDay:[],
                selectedWeek:[],
                prevent:"",
                picked:"",
                weekData:{
                    today: new Date(),
                    weekDays:['monday','tuesday','wednesday', 'thursday', 'friday','saturday','sunday'],
                    rawDates:[],
                    weekDates:[]


                }
            }
        },mounted(){
            this.gettingWeekInfo()
        },
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
        methods:{
            calcDay: function() {
                if(this.workDate == "" && this.projectCode == "" && this.priceHour != 479 && this.workedHours == "" ){
                    this.prevent = "Please enter working day information"
                }

               else if (this.workDate == "" || this.workDate == null) {
                    this.prevent = "Please enter a schedualed worked date"
                }
                else if (this.projectCode == "" || this.projectCode == null) {
                    this.prevent = "Please enter working date project code"
                }
                 else if (this.priceHour != 479 || this.priceHour == 0 || this.priceHour == null) {
                    this.prevent = "Please enter correct hour fare"
                }
                else if (this.workedHours == "" || this.workedHours == 0 || this.workedHours == null) {
                    this.prevent = "Please enter an amount of hours worked"
                } else {
                    var day = {
                        salaryUserId: this.user[0].usersId,
                        salaryDate: this.workDate,
                        salaryProject: this.projectCode,
                        salaryHourFare: this.priceHour,
                        salaryWorkedHours: this.workedHours,
                        salaryIncome: this.priceHour * this.workedHours
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
                    this.projectCode = "";
                    this.priceHour = 479;
                    this.workedHours = "";
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
                    let trimmedDate = day + "/" + date + "/" + month  +  "/" + year ;
                    this.weekData.weekDates[i] = trimmedDate;
                    this.gettingWeekInfo()

                    console.log(trimmedDate)
                    console.log('pushing clean date');
                }

            },
            pickDay:function(event){
                var targetId = event.currentTarget.id;
                console.log("clicked day: "+ targetId);
                switch(event.currentTarget.id ){
                    case "monday" : this.workDate = this.formatDate(this.weekData.rawDates[0]);
                        this.gettingDayInfo(0);
                        this.gettingWeekInfo();
                        this.picked = 0;
                        break;
                    case "tuesday" : this.workDate = this.formatDate(this.weekData.rawDates[1]);
                        this.gettingDayInfo(1);
                        this.gettingWeekInfo();
                        this.picked = 1;
                        break;
                    case "wednesday" : this.workDate = this.formatDate(this.weekData.rawDates[2]);
                        this.gettingDayInfo(2);
                        this.gettingWeekInfo();
                        this.picked = 2;
                        break;
                    case "thursday" : this.workDate = this.formatDate(this.weekData.rawDates[3]);
                        this.gettingDayInfo(3);
                        this.gettingWeekInfo();
                        this.picked = 3;
                        break;
                    case "friday" : this.workDate = this.formatDate(this.weekData.rawDates[4]);
                        this.gettingDayInfo(4);
                        this.gettingWeekInfo();
                        this.picked = 4;
                        break;
                    case "saturday" : this.workDate = this.formatDate(this.weekData.rawDates[5]);
                        this.gettingDayInfo(5);
                        this.gettingWeekInfo();
                        this.picked = 5;
                        break;
                    case "sunday" : this.workDate = this.formatDate(this.weekData.rawDates[6]);
                        this.gettingDayInfo(6);
                        this.gettingWeekInfo();
                        this.picked = 6;
                        break;
                }

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

                    })
            }
            ,
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
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&family=Raleway&display=swap');

    ul{ padding-left: 200px;
        display: grid;
        text-align: left;
        font-family: 'Raleway', Tahoma;
        font-size: 20px;
        background-color: aqua;
    }
    li{
        text-align: left;
    }
    .show-edit{
        display: inline-flex;
        width: 100%;
        text-align: left;
        align-items: flex-start;
    }
    article{
        margin-right: 5px;

    }
    footer{
box-sizing: border-box
    }
    button{
        max-width: 30%;
    }
    .week{
        display: inline-flex;
    }
    .day{
        height: 200px;
        width: 150px;
        border:thick solid #0000FF;
    }

    #monday{
        background-color: darkblue;
    }
    #tuesday{
        background-color: green;
    }
    #wednesday{
        background-color: yellow;
    }
    #thursday{
        background-color: rebeccapurple;
    }
    #friday{
        background-color: lightseagreen;
    }
    #saturday{
        background-color: chartreuse;
    }
    #sunday{
        background-color: coral;
    }
</style>