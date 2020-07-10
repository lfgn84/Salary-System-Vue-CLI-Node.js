<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <users :email="email"></users>
  </div>
</template>

<script>
// @ is an alias to /src
import users from "../components/users";

export default {
  name: 'Home',
  components: {
    users,

  },
  data: function(){
    return{
      email:""
    }
  },
  created(){
    this.email = this.$route.params.mail
  },
}
</script>
