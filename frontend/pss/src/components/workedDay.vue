<template>
    <div class="workedDay">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
    <article class="message is-info" v-show="!locked">
        <div class="message-header">
            <p>DATE: {{date.salaryDate}}</p>
        </div>
        <div class="message-body">
            <div><span style=" font-weight: bold">PROJECT: </span> {{date.salaryProject}}</div>
            <div><span style=" font-weight: bold">HOUR FARE: </span> {{date.salaryHourFare}} kr</div>
            <div><span style=" font-weight: bold">HOUR SALARY: </span> {{date.salaryHour}} kr</div>
            <div><span style=" font-weight: bold">WORKED HOURS: </span> {{date.salaryWorkedHours}}</div>
            <div><span style=" font-weight: bold">TOTAL COST: </span>{{date.salaryCost.toLocaleString('en-US')}} kr</div>
            <div><span style=" font-weight: bold">INCOME: </span> {{date.salaryIncome.toLocaleString('en-US')}} kr</div>
        </div>
        <footer>
<!--            <button @click="edit">edit</button><button @click="erase">erase</button><button v-show="editing" @click="editing = false">ok</button>-->
            <button id="editButton" class="button  is-link is-dark" @click="edit()">edit</button><button class="button  is-link is-dark"  @click="erase">erase</button>
        </footer>
    </article>

        <article class="message is-danger" v-show="locked">
            <div class="message-header">
                <p>DATE: {{date.salaryDate}}</p>
            </div>
            <div class="message-body">
                <div><span style=" font-weight: bold">PROJECT: </span> {{date.salaryProject}}</div>
                <div><span style=" font-weight: bold">HOUR FARE: </span> {{date.salaryHourFare}} kr</div>
                <div><span style=" font-weight: bold">HOUR SALARY: </span> {{date.salaryHour}} kr</div>
                <div><span style=" font-weight: bold">WORKED HOURS: </span> {{date.salaryWorkedHours}}</div>
                <div><span style=" font-weight: bold">TOTAL COST: </span>{{date.salaryCost.toLocaleString('en-US')}} kr</div>
                <div><span style=" font-weight: bold">INCOME: </span> {{date.salaryIncome.toLocaleString('en-US')}} kr</div>

            </div>
            <footer style="color: red">
                LOCKED
                <!--            <button @click="edit">edit</button><button @click="erase">erase</button><button v-show="editing" @click="editing = false">ok</button>-->
<!--                <button id="editButton" class="button  is-link is-dark" @click="edit()">edit</button><button class="button  is-link is-dark"  @click="erase">erase</button>-->
            </footer>
        </article>

    </div>
</template>

<script>
    export default {
        name: "worked-day",
        props:{
            date: [Object, Array]
        },
        data(){
            return{
                dayInfo: "",
                locked:""
            }
        },
        created(){
          this.dayInfo = JSON.parse(JSON.stringify(this.date));
            this.locked = this.dayInfo.salaryUserLocked;
        },
        watch:{
            date: function(){
                this.dayInfo = JSON.parse(JSON.stringify(this.date));
                this.locked = this.dayInfo.salaryUserLocked
            }
        },
        computed:{
            daySalary(){
                return this.dayInfo.salaryHourFare * this.dayInfo.salaryWorkedHours
            }
        },
        methods:{
            erase: async function(){
                if(confirm("Do you really want to delete worked day ?")){
                fetch('http://127.0.0.1:3000/api/salary/'+this.dayInfo.salaryId,  {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: this.dayInfo.salaryId}),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                     /*   var decrease = {
                            date: this.dayInfo.salaryDate,
                            amount : this.dayInfo.salaryIncome
                        };*/
                        this.$emit('remove');

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        },
            edit: async function(){
                let data = {
                    salaryId : this.dayInfo.salaryId,
                    salaryDate: this.dayInfo.salaryDate,
                    salaryProject: this.dayInfo.salaryProject,
                    salaryHourFare: this.dayInfo.salaryHourFare,
                    salaryHour: this.dayInfo.salaryHour,
                    salaryWorkedHours: this.dayInfo.salaryWorkedHours
                   // salaryCost: this.dayInfo.salaryHourFare * this.dayInfo.salaryWorkedHours,
                  //  salaryIncome: this.dayInfo.salaryHour * this.dayInfo.salaryWorkedHours

                };
             //  let oldPotV = this.dayInfo.salaryIncome;
                this.$emit('edit', data );

            }
    }
}
</script>

<style scoped>
    .workedDay{
        margin-right: 3px;
        margin-top: 5px;
    }
    footer{

    }
    #editButton{
        margin-right: 4px;
        margin-left: 30px;
    }

</style>