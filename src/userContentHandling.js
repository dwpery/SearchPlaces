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

        document.getElementById('propMenu').style.top = "calc(" + element.style.top + " - 2.5vh)";
        document.getElementById('propMenu').style.left = element.style.left;
        document.getElementById('propMenu').style.display = 'block';
    })

    // Deselects element
    element.addEventListener('blur', () => {
        element.contentEditable = 'false';
        document.getElementById('propMenu').style.display = 'none';
    })
}

// So document event listeners know an element is being dragged
let isDragging = false;
// Stores initial X + Y positions
let initialX, initialY;
// Stores selected element
let currentDraggableElement = null;

// Draggable Elements Handler
function makeDraggable(element) {
    // Enables dragging elements
    element.addEventListener('mousedown', (event) => {
        // Sets up Dragging variables
        event.preventDefault();
        currentDraggableElement = event.target;
        isDragging = true;
        initialX = event.clientX - element.offsetLeft;
        initialY = event.clientY - element.offsetTop;

        // Asses what element is selected and fills prop menu
        for (var i = 0; i <= userElements.length - 1; i++) {
            if (element.id == userElements[i].id) {
                if (userElements[i].type == "heading") {
                    document.getElementById('propMenu').innerHTML = 'Heading';
                } else if (userElements[i].type == "sticker") {
                    document.getElementById('propMenu').innerHTML = 'Sticker';
                } else if (userElements[i].type == "shape") {
                    document.getElementById('propMenu').innerHTML = 'Shape';
                }
            }
        }
    })

    // Updates element position in DOM
    document.addEventListener('mousemove', (event) => {
        // Units used for conversion from 'px' to '%'
        var screenWidth = document.getElementById('userContent').offsetWidth;
        var screenHeight = document.getElementById('userContent').offsetHeight;

        // Applys position to element
        if (isDragging) {
            currentDraggableElement.style.left = (((event.clientX - initialX) / screenWidth) * 100) + "%";
            currentDraggableElement.style.top = (((event.clientY - initialY) /  screenHeight) * 100) + "%";

            document.getElementById('propMenu').style.top = "calc(" + currentDraggableElement.style.top + " - 2.5vh)";
            document.getElementById('propMenu').style.left = currentDraggableElement.style.left;
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

// Class for User Elements
class Element {
    constructor(id, css, type) {
        // Standard values used by all Elements
        this.id = id;
        this.css = css;
        this.type = type;
        
        // Exclusive to Text based Elements
        if (type == "text" || type == "heading") {
            this.bold = false;
            this.italic = false;
        } else if (type == "shape") {
            this.fill = '#000000';
        }
    }
}

export function createHeading(css) {
    // Generates unique ID used to refer to user created elements
    const newID = generateBase64Id();

    // Creates elment and appends to DOM
    const element = document.createElement('div');
    element.id = newID;
    element.classList.add(css, 'editableElement');
    element.textContent = 'Heading';
    document.getElementById('userContent').appendChild(element);

    // Adds EventListeners
    makeEditable(element);
    makeDraggable(element);
    
    // Stores elements as Class
    userElements[userElements.length] = new Element(newID, css, "heading");
    console.log(userElements[0]);
}

export function createSVG(css, type) {
    // Generates unique ID used to refer to user created elements
    const newID = generateBase64Id();

    // Creates elment and appends to DOM
    const element = document.createElement('img');
    element.id = newID;
    element.classList.add('editableElement');
    element.src = 'media/stickers/' + css + '.svg';
    document.getElementById('userContent').appendChild(element);

    // Adds EventListeners
    makeEditable(element);
    makeDraggable(element);

    // Stores elements as Class
    userElements[userElements.length] = new Element(newID, css, type);
    console.log(userElements);
}