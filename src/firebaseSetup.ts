import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYq-OcMmsJBx5CMYVASBBJNZE9bBrwqLA",
    authDomain: "kingdom1418-rok.firebaseapp.com",
    projectId: "kingdom1418-rok",
    storageBucket: "kingdom1418-rok.appspot.com",
    messagingSenderId: "52859370206",
    appId: "1:52859370206:web:95983696b1f350397fa04f",
    measurementId: "G-5QTEHKEFNL"
}; //this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();