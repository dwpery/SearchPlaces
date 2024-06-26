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

        document.getElementById('propMenu').style.top = "calc(" + element.style.top + " - 3.25vh)";
        document.getElementById('propMenu').style.left = element.style.left;
        document.getElementById('propMenu').style.display = 'flex';
    })

    // Deselects element
    element.addEventListener('blur', () => element.contentEditable = 'false');
}

// Hides PropMenu when non-editable or non-propmenu element clicked
document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("editableElement") && event.target.closest('.propMenu') == null) {
      document.getElementById("propMenu").style.display = "none";
      console.log("fanum");
    }
});

// Document event listeners know an element is being dragged
let isDragging = false;
// Stores initial X + Y positions
let initialX, initialY;
// Stores selected element
let currentDraggableElement = null;
// Stores last selected ID for propMenu btns
var recentID = "";


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

        recentID = element.id;

        // Asses what element is selected and fills prop menu + functionality
        var selectedElement = userElements.find(element => element.id === recentID);

        if (selectedElement.type == "heading") {
            document.getElementById('propMenu').innerHTML = '<div id="propBold" class="propMenuButton bold">B</div><div id="propItalic" class="propMenuButton italic">i</div><div id="propUnderline" class="propMenuButton underline">u</div>';

            // Swaps elements boldness values
            document.getElementById('propBold').addEventListener('click', () => {
                selectedElement.bold = !selectedElement.bold;
                document.getElementById(recentID).classList.toggle('bold');
            });

            // Swaps elements italic values
            document.getElementById('propItalic').addEventListener('click', () => {
                selectedElement.italic = !selectedElement.italic;
                document.getElementById(recentID).classList.toggle('italic');
            });

            // Swaps elements underlined values
            document.getElementById('propUnderline').addEventListener('click', () => {
                selectedElement.underline = !selectedElement.underline;
                document.getElementById(recentID).classList.toggle('underline');
            });
        } else if (selectedElement.type == "shape") {
            document.getElementById('propMenu').innerHTML = `<label class="propLabel">Size: </label><input id="sizeInput" class="propInput" type="text"><label class="propLabel">Rotation: </label><input id="rotationInput" class="propInput" type="text">`;
        }
    })

    // Updates element position in DOM
    document.addEventListener('mousemove', (event) => {
        // Units used for conversion from 'px' to '%'
        var screenWidth = document.getElementById('userContent').offsetWidth;
        var screenHeight = document.getElementById('userContent').offsetHeight;

        var selectedElement = userElements.find(element => element.id === recentID);

        // Applys position to element
        if (isDragging) {
            currentDraggableElement.style.left = (((event.clientX - initialX) / screenWidth) * 100) + "%";
            currentDraggableElement.style.top = (((event.clientY - initialY) /  screenHeight) * 100) + "%";

            selectedElement.top = currentDraggableElement.style.top;
            selectedElement.left = currentDraggableElement.style.left;

            document.getElementById('propMenu').style.top = "calc(" + currentDraggableElement.style.top + " - 3.25vh)";
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

        // Position values
        this.left = 0;
        this.top = 0;
        
        // Exclusive to Text based Elements
        if (type == "text" || type == "heading") {
            this.bold = false;
            this.italic = false;
            this.underline = false;
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
    console.log(userElements);
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