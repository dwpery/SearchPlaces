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

// Hides PropMenu when non-editable OR non-propmenu element clicked
document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("editableElement") && event.target.closest('.propMenu') == null) {
      document.getElementById("propMenu").style.display = "none";
    }
});

// Functions to populate PropMenu when diff elements clicked

// Delete Element btn + EventListeners
function binBtn(selectedElement) {
    document.getElementById('propMenu').innerHTML += `<img id="delElementBtn" class="propMenuButton" src="media/icons/bin.svg">`;
    
    document.getElementById('delElementBtn').addEventListener('click', () => {
        // Removes element from DOM + hides PropMenu
        document.getElementById(selectedElement.id).parentNode.removeChild(document.getElementById(selectedElement.id));
        document.getElementById("propMenu").style.display = "none";
        // Removes element from backend
        const deletedElement = userElements.indexOf(selectedElement);
        userElements.splice(deletedElement, 1);
    })
}

// Text Manipulation btns + EventListeners
function textBtns(selectedElement, recentID) {
    document.getElementById('propMenu').insertAdjacentHTML('beforeend', `<div id="propBold" class="propMenuButton bold ` + (selectedElement.bold ? 'buttonSelected' : '') + `">B</div>
        <div id="propItalic" class="propMenuButton italic ` + (selectedElement.italic ? 'buttonSelected' : '') + `">i</div>
        <div id="propUnderline" class="propMenuButton underline ` + (selectedElement.underline ? 'buttonSelected' : '') + `">u</div>`);
    
    // Swaps elements boldness values
    document.getElementById('propBold').addEventListener('click', () => {
        selectedElement.bold = !selectedElement.bold;
        document.getElementById(recentID).classList.toggle('bold');
        document.getElementById('propBold').classList.toggle('buttonSelected');
    });

    // Swaps elements italic values
    document.getElementById('propItalic').addEventListener('click', () => {
        selectedElement.italic = !selectedElement.italic;
        document.getElementById(recentID).classList.toggle('italic');
        document.getElementById('propItalic').classList.toggle('buttonSelected');
    });

    // Swaps elements underlined values
    document.getElementById('propUnderline').addEventListener('click', () => {
        selectedElement.underline = !selectedElement.underline;
        document.getElementById(recentID).classList.toggle('underline');
        document.getElementById('propUnderline').classList.toggle('buttonSelected');
    });
}

// Size and rotation btns + EventListeners
function sizeAndRotationBtns(selectedElement, recentID) {
    document.getElementById('propMenu').insertAdjacentHTML('beforeend', `<label class="propLabel">Size: </label><input id="sizeInput" class="propInput" value="` + Number(selectedElement.size) + `" step="0.1" min="0.1" type="number">
        <label class="propLabel">Rotation: </label><input id="rotationInput" class="propInput" value="` + Number(selectedElement.rotation) + `" min="-360" max="360" step="5" type="number">`);

    // Updates Rotation and Size properties
    document.getElementById('rotationInput').addEventListener('input', () => updateShape(selectedElement, recentID));
    document.getElementById('sizeInput').addEventListener('input', () => updateShape(selectedElement, recentID));
}

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
        document.getElementById('propMenu').innerHTML = '';
        binBtn(selectedElement);

        // Fills PropMenu Btns when different elements are selected 
        if (selectedElement.type == "heading") {
            textBtns(selectedElement, recentID);
            sizeAndRotationBtns(selectedElement, recentID);

        } else if (selectedElement.type == "shape") {
            sizeAndRotationBtns(selectedElement, recentID);
        } else if (selectedElement.type == "sticker") {
            sizeAndRotationBtns(selectedElement, recentID);
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

function updateShape(selectedElement, recentID) {
    selectedElement.rotation = document.getElementById('rotationInput').value;
    selectedElement.size = document.getElementById('sizeInput').value;
    document.getElementById(recentID).style.transform = 'rotate(' + selectedElement.rotation + 'deg) scale(' + selectedElement.size + ')';
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
        this.rotation = 0;
        this.size = 1.0;
        
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