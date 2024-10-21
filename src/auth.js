import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup  } from 'firebase/auth';

// Popup function for oAuth
export function popupAuthLogin(auth, provider) {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = provider.credentialFromResult(result);
            const token = credential.accessToken;
            // User info.
            const user = result.user;
        }).catch ((error) => {
            console.log(error.code + " " + error.message);
        });
}

export function emailSignUp(email, password, auth) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            checkErorr(errorCode);
        });
}

export function emailLogIn(email, password, auth) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            checkErorr(errorCode);
        });
}

function checkErorr(errorCode) {
    if (errorCode == "auth/missing-email" || errorCode == "auth/invalid-email") {
        document.getElementById("errorLabel").innerHTML = 'Invalid or missing email! Please check and try again';
    } else if (errorCode == 'auth/missing-password') {
        document.getElementById("errorLabel").innerHTML = 'Missing password! Please input one and try again';
    } else if (errorCode == 'auth/invalid-credential') {
        document.getElementById("errorLabel").innerHTML = 'Email or Password is incorrect! Please check and try again';
    } else if (errorCode == 'auth/email-already-in-use') {
        document.getElementById("errorLabel").innerHTML = 'Email already in use! Please try a new one';
    } else if (errorCode == 'auth/weak-password') {
        document.getElementById("errorLabel").innerHTML = 'Password should be 6+ letters!';
    }
}