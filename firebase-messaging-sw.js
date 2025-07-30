// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({

     apiKey: "AIzaSyAvQ5-KLbsiBY7LS2uOGUF0UR0zBke9K6I",
    authDomain: "merasmm-c89f4.firebaseapp.com",
    projectId: "merasmm-c89f4",
    storageBucket: "merasmm-c89f4.firebasestorage.app",
    messagingSenderId: "721705668276",
    appId: "1:721705668276:web:e1f5acde72b84409afd1e1",
});

const messaging = firebase.messaging();
