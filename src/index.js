import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDndU1jJYP9rb87J0UixYbpzn6MpvXOLms",
    authDomain: "chromiumplaces.firebaseapp.com",
    projectId: "chromiumplaces",
    storageBucket: "chromiumplaces.appspot.com",
    messagingSenderId: "224755692272",
    appId: "1:224755692272:web:de23fa86ff4034f8a9c835",
    measurementId: "G-NR9B6SXXG6"
})

const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

// Detects auth state change

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("Logged In!");
    } else {
        console.log("Logged out!")
    }
});