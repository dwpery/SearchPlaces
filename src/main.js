function showAddMenu() {
    const bg = document.getElementsByClassName("ABbackground");

    if (bg != '20vh') {
        bg.style.height = '20vh';
    } else {
        bg.style.height = '0';
    }
}