<template>
    <div class="workedDay">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
    <article class="message is-info">
        <div class="message-header">
            <p>DATE: {{date.salaryDate}}</p>
        </div>
        <div class="message-body">
            <div>PROJECT: {{date.salaryProject}}<input v-show="editing" v-model="dayInfo.salaryProject"/></div>
            <div>HOUR FARE: {{date.salaryHourFare}}<input v-show="editing" v-model="dayInfo.salaryHourFare"/></div>
            <div>WORKED HOURS: {{date.salaryWorkedHours}}<input v-show="editing" v-model="dayInfo.salaryWorkedHours"/></div>
            <div>TOTAL: {{date.salaryIncome}}<p v-show="editing"> NEW TOTAL: {{daySalary}}</p></div>
        </div>
        <footer>
<!--            <button @click="edit">edit</button><button @click="erase">erase</button><button v-show="editing" @click="editing = false">ok</button>-->
            <button v-show="!editing" @click="edit()">edit</button><button v-show="!editing" @click="erase()">erase</button><button v-show="editing" @click="change()">save</button><button v-show="editing" @click="cancelEdit">cancel</button>
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
                editing: false
            }
        },
        created(){
          this.dayInfo = JSON.parse(JSON.stringify(this.date));
        },
        computed:{
            daySalary(){
                return this.dayInfo.salaryHourFare * this.dayInfo.salaryWorkedHours
            }
        },
        methods:{
            erase: async function(){
                fetch('http://127.0.0.1:3000/api/salary/'+this.dayInfo.salaryId,  {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: this.dayInfo.salaryId}),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.$emit('remove');
            },
            edit: async function(){
                this.editing = true
            },
            cancelEdit: function(){
                this.dayInfo = JSON.parse(JSON.stringify(this.date));
                this.editing = false

            },
            change: function(){
                fetch('http://127.0.0.1:3000/api/salary/'+this.dayInfo.salaryId,  {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        salaryUserId : this.dayInfo.salaryUserId,
                        salaryDate: this.dayInfo.salaryDate,
                        salaryProject: this.dayInfo.salaryProject,
                        salaryHourFare: this.dayInfo.salaryHourFare,
                        salaryWorkedHours: this.dayInfo.salaryWorkedHours,
                        salaryIncome: this.dayInfo.salaryHourFare * this.dayInfo.salaryWorkedHours
                    }),
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.editing = false;
                this.$emit('refresh');

            }
        }
    }
</script>

<style scoped>
    .workedDay{
        margin-right: 3px;
    }
    footer{
        display: inline-flex;

    }
    button{
        max-width: 100px;
    }

</style>