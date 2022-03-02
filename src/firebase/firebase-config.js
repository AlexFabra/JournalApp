import 'firebase/firestore';
import 'firebase/auth';

import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAxjTzIk7GI-tQV6JqhkdL0LZEclw3G7KU",
    authDomain: "react-apps-journal-ec020.firebaseapp.com",
    projectId: "react-apps-journal-ec020",
    storageBucket: "react-apps-journal-ec020.appspot.com",
    messagingSenderId: "829941229099",
    appId: "1:829941229099:web:a0ec623fe5858e307f6c6e"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}