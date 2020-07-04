<template>
    <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
    <article class="message is-info">
        <div class="message-header">
            <p>DATE: {{dayInfo.salaryDate}}</p>
        </div>
        <div class="message-body">
            <div>PROJECT: {{dayInfo.salaryProject}}<input v-show="editing"/></div>
            <div>HOUR FARE: {{dayInfo.salaryHourFare}}<input v-show="editing"/></div>
            <div>WORKED HOURS: {{dayInfo.salaryWorkedHours}}<input v-show="editing"/></div>
            <div>TOTAL: {{dayInfo.salaryIncome}}<input v-show="editing"/></div>
        </div>
        <footer>
            <button @click="edit">edit</button><button @click="erase">erase</button><button v-show="editing" @click="editing = false">ok</button>
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
                dayInfo: this.date,
                editing: false
            }
        },
        methods:{
            erase: function(){
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
            edit: function(){
                this.editing = true
            }
        }
    }
</script>

<style scoped>

</style>