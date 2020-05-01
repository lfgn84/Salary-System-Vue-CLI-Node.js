<template>
    <div class="slides">
    <div class="slides-inner">
        <div v-for="slide in slides">
            {{slides.src}}
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "slides",
        data () {
            return {
                slides:[
                    {src: 'assets/test1.webp'},
                    {src: 'assets/test2.webp'},
                    {src: 'assets/test3.webp'},
                    {src: 'assets/test4.webp'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>