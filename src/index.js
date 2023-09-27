import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDndU1jJYP9rb87J0UixYbpzn6MpvXOLms",
    authDomain: "chromiumplaces.firebaseapp.com",
    projectId: "chromiumplaces",
    storageBucket: "chromiumplaces.appspot.com",
    messagingSenderId: "224755692272",
    appId: "1:224755692272:web:de23fa86ff4034f8a9c835",
    measurementId: "G-NR9B6SXXG6"
});

const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById("googleSignIn").addEventListener("click", () => {
    signInWithRedirect(auth, provider);
});


window.onload = getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
    });

document.getElementById("googleSignOut").addEventListener("click", () => {
    signOut(auth);
});

// Detect Auth State

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log(user);
        document.getElementById("googleSignOut").hidden = false;
        document.getElementById("googleSignIn").hidden = true;
    } else {
        console.log("No user");
        document.getElementById("googleSignOut").hidden = true;
        document.getElementById("googleSignIn").hidden = false;
    }
});
