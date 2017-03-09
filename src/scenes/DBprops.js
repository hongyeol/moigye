
import React from 'react';
import * as firebase from 'firebase';



export const firebaseConfig = {
  apiKey: "AIzaSyBowRFaxlpbjtalfevCE_EUMkthHZtHsC4",
  authDomain: "moigye-f893e.firebaseapp.com",
  databaseURL: "https://moigye-f893e.firebaseio.com",
  storageBucket: "moigye-f893e.appspot.com",
};

export const Connect = firebase.initializeApp(firebaseConfig,'moigye').database().ref();