<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'GMap',
  data(){
    return{
      lat: 53,
      lng: -2
    }
  },
  methods: {
    renderMap(){
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false //the small yellow man haha
      })

      // grab those users and get data of those with valid geolocation~

      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()
          if(data.geolocation){
            // create marker
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              }, 
              map: map
            })
            // set map
            marker.addListener('click', () => {
              // fired when clicked
              this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
            })
          }
        })
      })
    }
  },
  mounted(){
    // get current user
    let user = firebase.auth().currentUser

    // check if geolocation api works and get geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        //find user record and update geo coords
        db.collection('users').where('user_id', '==', user.uid).get()
        .then( snapshot => {
          snapshot.forEach((doc) => {
            db.collection('users').doc(doc.id).update({
              geolocation: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              }
            })
          })
        }).then(() => {
          this.renderMap()
        })
      }, (err) => {
        console.log(err)
        this.renderMap()
      }, {maximumAge: 60000, timeout: 5000}) // geolocation within an hour, if fail to find in 5 seconds we just render it to center)
    } else {
      // position center by default values
      this.renderMap()
    }
  }
}
</script>

<style scoped>
.google-map{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>