import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut  } from 'firebase/auth';

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

// -- Authentication Code --

// Firebase Auth object
const auth = getAuth(firebaseApp);

// Functionality to oAuth icons
document.getElementById('googleAuth').addEventListener('click', async () => popupAuthLogin(auth, new GoogleAuthProvider()));
document.getElementById('githubAuth').addEventListener('click', async () => popupAuthLogin(auth, new GithubAuthProvider()));

// Popup function for oAuth
function popupAuthLogin(auth, provider) {
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

// Sign out 
document.getElementById('userIcon').addEventListener('click', () => {
    signOut(auth);
});

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

// -- Zoom Code --

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

// --- Left Side Tools --- 

// Toolbox opening / closing
document.querySelectorAll('.toolboxBtn, svg.toolboxBtn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById("toolbox").classList.toggle("openSideMenu");
        document.getElementById("properties").classList.remove("openSideMenu");
    });
});

// Hand Tool Btn
document.getElementById('handBtn').addEventListener('click', () => {
    document.getElementById('handBtn').classList.toggle('buttonSelected');
    document.getElementById('userContent').classList.toggle('grabbable');
    
    //toggleViewportDragging();
})

// Properties opening / closing
document.querySelectorAll('.propertiesBtn, svg.propertiesBtn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById("properties").classList.toggle("openSideMenu");
        document.getElementById("toolbox").classList.remove("openSideMenu");
    });
});

// Hide Editor UI
document.getElementById('hideUiBtn').addEventListener('click', () => {
    document.getElementById('leftSideTools').classList.add('lstHide');

    setTimeout(() => {
        document.getElementById('leftSideTools').style.display = 'none';
    }, 500);
})

// -- Properties buttons --

var bgType = false; // false = colour, true = Image

document.getElementById('bgTypeBtn').addEventListener('click', () => {
    if (bgType == false) {
        document.getElementById('bgTypeBtn').innerHTML = '<span inert>Image</span>';
    } else {
        document.getElementById('bgTypeBtn').innerHTML = '<span inert>Colour</span>';
    }

    document.getElementById('bgColourOptions').hidden = !document.getElementById('bgColourOptions').hidden;
    document.getElementById('bgImageOptions').hidden = !document.getElementById('bgColourOptions').hidden;

    document.getElementById('userContent').classList.toggle('bgImage');
    document.getElementById('userContent').classList.toggle('bgColour');

    bgType = !bgType;
})

// Changes bgColour var
document.getElementById('bgColourSelector').addEventListener('input', () => {
    document.documentElement.style.setProperty('--bgColour', document.getElementById('bgColourSelector').value);
})

// Shows multi-option picker with SEs
document.getElementById('searchEngineBtn').addEventListener('click', () => {
    document.getElementById('searchEngineBtn').hidden = true;
    document.getElementById('searchEngineSelect').hidden = false;
})

// Links button IDs with text for 'searchEngineBtn'
const searchEngineButtons = [
    { id: 'googleBtn', name: 'Google' },
    { id: 'bingBtn', name: 'Bing' },
    { id: 'braveBtn', name: 'Brave' },
    { id: 'duckduckgoBtn', name: 'DuckDuckGo' },
    { id: 'ecosiaBtn', name: 'Ecosia' },
    { id: 'startpageBtn', name: 'Startpage' }
];

// Value repressenting link in 'searchLinks' array
var searchEngine = 0;

// Updates selected SearchEngine
function updateSearchEngine(button) {
    // Updates text of button and variable to new SE chosen
    document.getElementById('searchEngineBtn').innerHTML = `<span inert>${button.name}</span>`;
    searchEngine = searchEngineButtons.indexOf(button);

    // Hides multi-option picker
    document.getElementById('searchEngineBtn').hidden = false;
    document.getElementById('searchEngineSelect').hidden = true;
}

// Adds event listeners to all SE buttons
searchEngineButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => updateSearchEngine(button));
});

// false = new tab, true = same tab
var searchDestination = false;

// Handles swapping Search Destination
document.getElementById('searchDestinationBtn').addEventListener('click', () => {
    if (searchDestination == false) {
        document.getElementById('searchDestinationBtn').innerHTML = '<span inert>This Tab</span>';
        searchDestination = true;
    } else {
        document.getElementById('searchDestinationBtn').innerHTML = '<span inert>New Tab</span>';
        searchDestination = false;
    }
})

// -- Search Functions --

// Stores all SE query links
var searchLinks = new Array('https://www.google.com/search?q=', 'https://www.bing.com/search?q=', 'https://search.brave.com/search?q=', 'https://duckduckgo.com/&q=', 'https://www.ecosia.org/search?q=', 'https://www.startpage.com/sp/search?q=');
// Joins search link and query
var searchQuery = "";

function search() {
    // Ensures box isn't empty
    if (document.getElementById('searchBox').value != "") {
        // Builds link + query and spaces replaced by '+'
        searchQuery = searchLinks[searchEngine] + document.getElementById('searchBox').value.replace(/\s/g, "+");
        // Directs user to their selected destination
        if (searchDestination == false) {
            window.open(searchQuery, '_blank');
        } else {
            window.location.href = searchQuery;
        }
    }
}

// Pressing SP logo will execute search()
document.getElementById('searchIcon').addEventListener('click', search);

// All uses for Enter key
document.addEventListener('keydown', (event) => {
    // Searches query
    if (event.key === "Enter" && document.activeElement === document.getElementById('searchBox')) {
        search();
    }

    // Changes bgImage var
    if (event.key === "Enter" && document.activeElement === document.getElementById('bgUrlInput')) {
        document.documentElement.style.setProperty('--bgImage', "url('" + document.getElementById('bgUrlInput').value + "')");
    }
})

// -- Toolbox --

import {createHeading, createSVG} from "./userContentHandling.js";

// Text
document.getElementById('h1Btn').addEventListener('click', () => createHeading('heading1'));
document.getElementById('h2Btn').addEventListener('click', () => createHeading('heading2'));
document.getElementById('h3Btn').addEventListener('click', () => createHeading('heading3'));

// Media
/*
document.getElementById('photoBtn').addEventListener('click', () => createMedia('photo'));
document.getElementById('gifBtn').addEventListener('click', () => createMedia('gif'));
document.getElementById('videoBtn').addEventListener('click', () => createMedia('video'));
*/

//Stickers
document.getElementById('eek1Btn').addEventListener('click', () => createSVG('eek1', 'sticker'));

//Shapes
document.getElementById('squareBtn').addEventListener('click',() => createSVG('square', 'shape'));
document.getElementById('circleBtn').addEventListener('click',() => createSVG('circle', 'shape'));
document.getElementById('triangleBtn').addEventListener('click',() => createSVG('triangle', 'shape'));
document.getElementById('rectangleBtn').addEventListener('click',() => createSVG('rectangle', 'shape'));

// -- Settings --

// Settings Opening / Closing functionality
document.querySelectorAll('.settingsBtn, svg.settingsBtn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('settings').classList.toggle('sClosed');
        document.getElementById('settings').classList.toggle('sOpen');
    });
});

// Adds functions to Settings Sub-Header buttons
document.getElementById('genSetHeader').addEventListener('click', () => setConCollapse('gsContainer'));
document.getElementById('custSetHeader').addEventListener('click', () => setConCollapse('csContainer'));
document.getElementById('bdSetHeader').addEventListener('click', () => setConCollapse('bdsContainer'));

// Toggles Settings sub-containers
function setConCollapse(name) { document.getElementById(name).hidden = !document.getElementById(name).hidden; }