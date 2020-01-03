  
  import firebase from "firebase"
  
  const firebaseConfig = {
    apiKey           : "AIzaSyCTTVlNH32_ANbnug1mFKv053ax7FZCzyk",
    authDomain       : "tenedores-bdaa8.firebaseapp.com",
    databaseURL      : "https://tenedores-bdaa8.firebaseio.com",
    projectId        : "tenedores-bdaa8",
    storageBucket    : "tenedores-bdaa8.appspot.com",
    messagingSenderId: "1033475030590",
    appId            : "1:1033475030590:web:186a97dc67040de5661b6f"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)