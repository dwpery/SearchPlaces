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

export { openSettings, closeSettings};
