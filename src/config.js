// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDBSpCQBJPxlJaxfjiEVWEssDDH25ZLBcM",
    authDomain: "ss-mid-912fd.firebaseapp.com",
    databaseURL: "https://ss-mid-912fd-default-rtdb.firebaseio.com",
    projectId: "ss-mid-912fd",
    storageBucket: "ss-mid-912fd.firebasestorage.app",
    messagingSenderId: "802971383559",
    appId: "1:802971383559:web:306745a6b21913830cf7a2",
    measurementId: "G-PEHEXCX8CP"
};
  
  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} 
else {
    firebase.app();
}

export default firebase;