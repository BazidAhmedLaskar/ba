importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');

// Initialize Firebase in service worker
firebase.initializeApp({
    apiKey: "AIzaSyAvQ5-KLbsiBY7LS2uOGUF0UR0zBke9K6I",
    authDomain: "merasmm-c89f4.firebaseapp.com",
    projectId: "merasmm-c89f4",
    storageBucket: "merasmm-c89f4.firebasestorage.app",
    messagingSenderId: "721705668276",
    appId: "1:721705668276:web:e1f5acde72b84409afd1e1",
    measurementId: "G-D54S0SWG0Y"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('📥 Received background message:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
