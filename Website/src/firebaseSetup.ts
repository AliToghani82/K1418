import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

}; //this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();