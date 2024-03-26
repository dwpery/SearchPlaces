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
    element.classList.add(type);
    element.setAttribute('contenteditable', 'true');
    element.textContent = 'Heading';
    document.getElementById('userContent').appendChild(element);

    // Stores elements as Class
    userElements[userElements.length] = new Heading(newID, type);
    console.log(userElements);
}

