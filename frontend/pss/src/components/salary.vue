<template>
    <div>
        <ul>
            <li><input type="date" v-model="workDate"><span> {{workDate}} : DAY WORKED</span></li>
            <li><input type="text" v-model="projectCode"><span> : PROJECT CODE</span></li>
            <li><input type="number" min="0" v-model="priceHour"><span> : PRICE PER WORKED HOUR</span></li>
            <li><input type="number" min="0" v-model="workedHours"> : WORKED HOURS</li>
            <li><span>{{daySalary}}</span><span> DAY INCOME</span></li>
            <button @click="calcDay">SUBMIT DAY</button>
            <li>
                {{workedDays}}
            </li>
                SELECT SALARY PERIOD:
            <li><input type="date" v-model="startDate"> {{startDate}}</li>
            <li><input type="date" v-model="endDate"> {{endDate}}</li>
            <button @click="getPeriod">GET PERIOD</button>
            <ul>
                <li>{{selectedDays}}</li>
            </ul>
        </ul>
    </div>
</template>

<script>

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
                priceHour:"",
                workedHours:"",
                workedDays:[],
                selectedDays:[],
            }
        },
        computed:{
            daySalary(){
                return this.priceHour * this.workedHours
            }
        },
        methods:{
            calcDay: function(){
                var day = {
                    salaryUserId: this.user.usersId,
                    salaryDate: this.workDate,
                    salaryProject: this.projectCode,
                    salaryHourFare: this.priceHour,
                    salaryWorkedHours : this.workedHours,
                    salaryIncome : this.priceHour * this.workedHours
                }
                fetch('http://127.0.0.1:3000/api/salary/',{
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
                this.workedDays.push(day);
                this.workDate = "";
                this.projectCode = "";
                this.priceHour = "";
                this.workedHours = "";
            },
            getPeriod: function(){
                console.log("getPeriod called")
                var url = new URL('http://127.0.0.1:3000/api/salary/period')
                var params = {
                            id: this.user.usersId,
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
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&family=Raleway&display=swap');

    ul{ display: grid;
        text-align: left;
        font-family: 'Raleway', Tahoma;
        font-size: 20px;
    }
    button{
        max-width: 30%;
    }

</style>