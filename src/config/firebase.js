import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAMXtHXiXzCl_qCljzrcogk46FhMWiLa6U",
    authDomain: "family-planner-94216.firebaseapp.com",
    databaseURL: "https://family-planner-94216.firebaseio.com",
    projectId: "family-planner-94216",
    storageBucket: "family-planner-94216.appspot.com",
    messagingSenderId: "317746932808",
    appId: "1:317746932808:web:2b7bf98877af366b5cbc7d",
    measurementId: "G-17KL4QLJ44",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;