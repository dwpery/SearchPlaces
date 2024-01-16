function openSettings() {
    document.getElementById("settingsContainer").classList.remove("closeSettings");
    document.getElementById("settingsContainer").classList.add("openSettings");

    setTimeout(function() {
        document.getElementById("settingsContent").style.display = 'flex';
    }, 1500)
}

function closeSettings() {
    document.getElementById("settingsContainer").classList.add("closeSettings");
    document.getElementById("settingsContainer").classList.remove("openSettings");

    document.getElementById("settingsContent").style.display = 'none';
}

function openToolbox() {
    document.getElementById("toolbox").classList.add("openSideMenu");
}

function closeToolbox() {
    document.getElementById("toolbox").classList.remove("openSideMenu");
}

function openProperties() {
    document.getElementById("properties").classList.add("openSideMenu");
}

function closeProperties() {
    document.getElementById("properties").classList.remove("openSideMenu");
}

export { openSettings, closeSettings, openToolbox, closeToolbox, openProperties, closeProperties};
