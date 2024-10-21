import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDndU1jJYP9rb87J0UixYbpzn6MpvXOLms",
    authDomain: "chromiumplaces.firebaseapp.com",
    projectId: "chromiumplaces",
    storageBucket: "chromiumplaces.appspot.com",
    messagingSenderId: "224755692272",
    appId: "1:224755692272:web:de23fa86ff4034f8a9c835",
    measurementId: "G-NR9B6SXXG6"
})

// Funtions for Authentication
import { getAuth, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, signOut  } from 'firebase/auth';
import {emailLogIn, emailSignUp } from "./auth.js";

// Firebase Auth object
const auth = getAuth(firebaseApp);

// Directs to Editor / Auth page and sets up nescessary EventListeners
onAuthStateChanged(auth, user => {
    if (user != null) {
        if (location.href != 'https://chromiumplaces.web.app/your-place/') {
            location.href='https://chromiumplaces.web.app/your-place/'
        }

        console.log(user);

    } else {
        if (location.href != 'https://chromiumplaces.web.app/auth/') {
            location.href='https://chromiumplaces.web.app/auth/'
        }

        // Email + Password auth functions
        document.getElementById("logIn").addEventListener('click', async () => emailLogIn(document.getElementById('emailInput').value, document.getElementById('passwordInput').value, auth));
        document.getElementById("signUp").addEventListener('click', async () => emailSignUp(document.getElementById('emailInput').value, document.getElementById('passwordInput').value, auth));
        // Functionality to oAuth icons
        document.getElementById('googleAuth').addEventListener('click', async () => popupAuthLogin(auth, new GoogleAuthProvider()));
        document.getElementById('githubAuth').addEventListener('click', async () => popupAuthLogin(auth, new GithubAuthProvider()));
    }
});
