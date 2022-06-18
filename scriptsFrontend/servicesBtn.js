/* When the user clicks on the button,
   toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    if( document.getElementById("details"))
    document.getElementById("details").style.left = "-300px";
}

function myFunctionSmall() {
    document.getElementById("myDropdownsmall").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if(!document.getElementById("details")) return;
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
        document.getElementById("details").style.left = "0";
    }
}

//menu for mobile
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

//for "Incotro?" text
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if(!document.getElementById("smth")) return;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("smth").style.top = "0";
    } else {
        document.getElementById("smth").style.top = "-140px";
    }
    prevScrollpos = currentScrollPos;
}

//for driverPage
function showCommands() {
    document.getElementById('commandsList').style.display = "block";
    document.getElementById('defaultTitle').remove();
}

