import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD0-EwryEB3tm97pam5b3g4D-bDB7WmRmc",
  authDomain: "udemy-geo-ninjas-mj.firebaseapp.com",
  databaseURL: "https://udemy-geo-ninjas-mj.firebaseio.com",
  projectId: "udemy-geo-ninjas-mj",
  storageBucket: "udemy-geo-ninjas-mj.appspot.com",
  messagingSenderId: "1018429736747",
  appId: "1:1018429736747:web:9080ee3258febcb11ea76e",
  measurementId: "G-LY31Q1FC4Y"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()

// firebase.analytics();