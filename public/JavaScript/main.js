// Variable Bank



// Firebase setup

document.addEventListener('DOMContentLoaded', function() {
    const loadEl = document.querySelector('#load');

    try {
      let app = firebase.app();
      let features = [
        'auth', 
        'firestore',
      ].filter(feature => typeof app[feature] === 'function');
      loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
    }
});