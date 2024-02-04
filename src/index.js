import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
    document.getElementById('loader').hidden = true;
    document.getElementById('app').hidden = false;
    if (user != null) {
        console.log("Logged In!");
        document.getElementById('signedOut').hidden = true;
        document.getElementById('signedIn').hidden = false;
    } else {
        console.log("Logged out!");
        document.getElementById('signedOut').hidden = false;
        document.getElementById('signedIn').hidden = true;
    }
});

document.getElementById("signUp").addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        });
});

document.getElementById("logIn").addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        });
});