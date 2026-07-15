importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? "voisin";
  const body = payload.notification?.body ?? "";
  const icon = "/icons/icon-192.png";

  self.registration.showNotification(title, {
    body,
    icon,
    badge: icon,
    vibrate: [200, 100, 200],
    tag: "voisin-alert",
    renotify: true,
  });
});
