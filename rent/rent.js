function adForm() {
    if (document.getElementById("main-div")) {
        document.getElementById("main-div").style.display = 'none';
        document.getElementById("adDiv").style.display = 'flex';
    }
}

function showAds() {
    if (document.getElementById("adDiv")) {
        document.getElementById("adDiv").style.display = 'none';
        document.getElementById("main-div").style.display = 'flex';
    }
}