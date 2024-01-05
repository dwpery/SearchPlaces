function openSettings() {
    document.getElementById("settingsContainer").classList.remove("closeSettings");
    document.getElementById("settingsContainer").classList.add("openSettings");
}

function closeSettings() {
    document.getElementById("settingsContainer").classList.add("closeSettings");
    document.getElementById("settingsContainer").classList.remove("openSettings");
}

export { openSettings, closeSettings};
