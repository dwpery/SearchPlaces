import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDndU1jJYP9rb87J0UixYbpzn6MpvXOLms",
    authDomain: "chromiumplaces.firebaseapp.com",
    projectId: "chromiumplaces",
    storageBucket: "chromiumplaces.appspot.com",
    messagingSenderId: "224755692272",
    appId: "1:224755692272:web:de23fa86ff4034f8a9c835",
    measurementId: "G-NR9B6SXXG6"
});

const auth = getAuth(firebaseApp);

// Detect Auth State

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("Logged in!");
    } else {
        console.log("No user");
    }
});

