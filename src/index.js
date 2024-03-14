import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, GithubAuthProvider, signOut  } from 'firebase/auth';

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
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

document.getElementById('googleAuth').addEventListener('click', () => {
    signInWithRedirect(auth, googleProvider)
});

document.getElementById('githubAuth').addEventListener('click', () => {
    signInWithRedirect(auth, githubProvider)
});

document.getElementById('userIcon').addEventListener('click', () => {
    signOut(auth);
});

getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode + " " + errorMessage);
})

// Detects auth state change

onAuthStateChanged(auth, user => {
    document.getElementById('loader').hidden = true;
    document.getElementById('loader').style.display = 'none';
    document.getElementById('app').hidden = false;
    if (user != null) {
        console.log("Logged In!");

        if (user.photoURL != null) {
            document.getElementById("userIcon").src = user.photoURL;
        } else {
            document.getElementById("userIcon").src = 'media/icons/userIcon.svg';
        }
        
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
            resetAuthPage();
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            checkErorr(errorCode);
        });
});

document.getElementById("logIn").addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            resetAuthPage();
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            checkErorr(errorCode);
        });
});

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

function resetAuthPage() {
    document.getElementById("errorLabel").innerHTML = '';
    var inputLabelElements = document.getElementsByClassName("loginInput");

    for (var i = 0; i < inputLabelElements.length; i++) {
        inputLabelElements[i].value = "";
    }
}

// Zoom Code

var zoom = 1;

document.getElementById('zoomIn').addEventListener('click', () => {
    if (zoom > 2) {
        // Catches
    } else {
        zoom += 0.1;
        document.getElementById('userContent').style.transform = 'scale(' + zoom + ')';
        document.getElementById('zoomValue').innerHTML = Math.round(zoom * 100);
    }
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (zoom < 0.2) {
        // Catches
    } else {
        zoom -= 0.1;
        document.getElementById('userContent').style.transform = 'scale(' + zoom + ')';
        document.getElementById('zoomValue').innerHTML = Math.round(zoom * 100);
    }
});

// Toolbox opening

document.getElementById('toolboxBtn').addEventListener('click', () => {
    document.getElementById("toolbox").classList.add("openSideMenu");
    document.getElementById("properties").classList.remove("openSideMenu");
})

document.getElementById('closeToolbox').addEventListener('click', () => {
    document.getElementById("toolbox").classList.remove("openSideMenu");
})

document.getElementById('propertiesBtn').addEventListener('click', () => {
    document.getElementById("properties").classList.add("openSideMenu");
    document.getElementById("toolbox").classList.remove("openSideMenu");
})

document.getElementById('closeProperties').addEventListener('click', () => {
    document.getElementById("properties").classList.remove("openSideMenu");
})

// Properties buttons

var bgType = false; // false = colour, true = Image

document.getElementById('bgTypeBtn').addEventListener('click', () => {
    if (bgType == false) {
        document.getElementById('bgTypeBtn').innerHTML = '<span inert>Image</span>';
        document.getElementById('bgColourOptions').hidden = true;
        document.getElementById('bgImageOptions').hidden = false;

        document.getElementById('userContent').classList.add('bgImage');
        document.getElementById('userContent').classList.remove('bgColour');

        bgType = true;
    } else {
        document.getElementById('bgTypeBtn').innerHTML = '<span inert>Colour</span>';
        document.getElementById('bgColourOptions').hidden = false;
        document.getElementById('bgImageOptions').hidden = true;

        document.getElementById('userContent').classList.remove('bgImage');
        document.getElementById('userContent').classList.add('bgColour');

        bgType = false;
    }
})

document.getElementById('bgColourSelector').addEventListener('input', () => {
    document.documentElement.style.setProperty('--bgColour', document.getElementById('bgColourSelector').value);
})

// Search Function

var searchEngine = 0;

document.getElementById('searchEngineBtn').addEventListener('click', () => {
    document.getElementById('searchEngineBtn').hidden = true;
    document.getElementById('searchEngineSelect').hidden = false;
})

const searchEngineButtons = [
    { id: 'googleBtn', name: 'Google' },
    { id: 'bingBtn', name: 'Bing' },
    { id: 'braveBtn', name: 'Brave' },
    { id: 'duckduckgoBtn', name: 'DuckDuckGo' },
    { id: 'ecosiaBtn', name: 'Ecosia' },
];
  
function updateSearchEngine(button) {
    document.getElementById('searchEngineBtn').innerHTML = `<span inert>${button.name}</span>`;
    searchEngine = searchEngineButtons.indexOf(button);

    document.getElementById('searchEngineBtn').hidden = false;
    document.getElementById('searchEngineSelect').hidden = true;
}
  
searchEngineButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => updateSearchEngine(button));
});

var searchDestination = false; // false = new tab, true = same tab

document.getElementById('searchDestinationBtn').addEventListener('click', () => {
    if (searchDestination == false) {
        document.getElementById('searchDestinationBtn').innerHTML = '<span inert>This Tab</span>';
        searchDestination = true;
    } else {
        document.getElementById('searchDestinationBtn').innerHTML = '<span inert>New Tab</span>';
        searchDestination = false;
    }
})

var searchLinks = new Array('https://www.google.com/search?q=', 'https://www.bing.com/search?q=', 'https://search.brave.com/search?q=', 'https://duckduckgo.com/&q=', 'https://www.ecosia.org/search?q=');
var searchQuery = "";

function search() {
    if (document.getElementById('searchBox').value != "") {
        searchQuery = searchLinks[searchEngine] + document.getElementById('searchBox').value.replace(/\s/g, "+");
        if (searchDestination == false) {
            window.open(searchQuery, '_blank');
        } else {
            window.location.href = searchQuery;
        }
    }
}

document.getElementById('searchIcon').addEventListener('click', () => {
    search()
})

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && document.activeElement === document.getElementById('searchBox')) {
        search();
    }
})

// User Content Creation

import {createHeading} from "./userContentHandling.js";

document.getElementById('h1Btn').addEventListener('click', () => {
    createHeading('heading1');
})

document.getElementById('h2Btn').addEventListener('click', () => {
    createHeading('heading2');
})

document.getElementById('h3Btn').addEventListener('click', () => {
    createHeading('heading3');
})