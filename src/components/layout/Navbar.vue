<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <!-- container: centeral column -->
        <router-link class="brand-logo left" :to="{ name: 'GMap'}">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup'}">Sign Up</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login'}">Login</router-link></li>
          <li v-if="user"><a>{{user.email}}</a></li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data(){
    return{
      user: null
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut()
      .then(() => {
        // todo: change this to login page
        this.$router.push({name: 'Login'})
      })
    }
  },
  created(){
    // let user = firebase.auth().currentUser
    // fires when user login , when user logout
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // logged in
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style scoped>

</style>