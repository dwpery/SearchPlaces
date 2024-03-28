// Generates Base 64 ID
function generateBase64Id() {
    // Generate a UUID (Universally Unique Identifier)
    const uuid = generateUUID();
    // Convert UUID to base64
    const base64 = btoa(uuid).replace(/\W/g, '').substring(0, 5);
    return base64;
}

// Function to generate UUID
function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Allows text content to be changed
function makeEditable(element) {
    // Enables element editing
    element.addEventListener('click', () => {
        element.contentEditable = 'true';
        element.focus();
    })

    // Deselects element
    element.addEventListener('blur', () => {
        element.contentEditable = 'false';
    })
}

// So document event listeners know an element is being dragged
let isDragging = false;
// Stores initial X + Y positions
let initialX, initialY;
// Stores selected element
let currentDraggableElement = null;

var updateWidthHeight = setInterval(function() {
    console.log("This message appears every 2 seconds!");
}, 50);
  

// Draggable Elements Handler
function makeDraggable(element) {
    // Enables dragging elements
    element.addEventListener('mousedown', (event) => {
        event.preventDefault();
        currentDraggableElement = event.target;
        isDragging = true;
        initialX = event.clientX - element.offsetLeft;
        initialY = event.clientY - element.offsetTop;
    })

    // Updates element position in DOM
    document.addEventListener('mousemove', (event) => {
        // Units used for conversion from 'px' to '%'
        var screenWidth = document.getElementById('userContent').offsetWidth;
        var screenHeight = document.getElementById('userContent').offsetHeight;
        console.log(screenHeight, screenWidth)
        if (isDragging) {
            currentDraggableElement.style.left = (((event.clientX - initialX) / screenWidth) * 100) + "%";
            currentDraggableElement.style.top = (((event.clientY - initialY) /  screenHeight) * 100) + "%";
        }
    })

    // Resets dragging vars
    document.addEventListener('mouseup', () => {
        isDragging = false;
        currentDraggableElement = null;
    })
}

// Stores Classes for User Generated content
var userElements = [];

class Heading {
    constructor(id, style) {
        this.id = id;
        this.style = style;
        this.fontColour = '#000';
        this.bold = false;
    }
}

export function createHeading(type) {
    // Generates unique ID used to refer to user created elements
    const newID = generateBase64Id();

    // Creates elments and appends to DOM
    const element = document.createElement('div');
    element.id = newID;
    element.classList.add(type, 'editableElement');
    element.textContent = 'Heading';
    document.getElementById('userContent').appendChild(element);

    // Adds draggable EventListeners
    makeEditable(element);
    makeDraggable(element);
    
    // Stores elements as Class
    userElements[userElements.length] = new Heading(newID, type);
    console.log(userElements);
}

