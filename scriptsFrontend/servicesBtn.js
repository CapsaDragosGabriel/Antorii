/* When the user clicks on the button,
   toggle between hiding and showing the dropdown content
   Close the dropdown if the user clicks outside of it*/
let count = 1;

function myFunction() {
    if (count === 1) {
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("details").style.display = "none";
        count = 0;
    } else {
        const myDropdown = document.getElementById("myDropdown");
// Close the dropdown if the user clicks outside of it
        window.onclick = function (e) {
            if (!document.getElementById("details")) return;
            if (!e.target.matches('.dropbtn')) {
                var myDropdown = document.getElementById("myDropdown");
                if (myDropdown)
                    if (myDropdown.classList.contains('show')) {
                        myDropdown.classList.remove('show');
                    }
                document.getElementById("details").style.display = "block";
                count = 1;
            }
        }
    }
}
function myFunctionSmall() {
    document.getElementById("myDropdownsmall").classList.toggle("show");
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
    if (!document.getElementById("smth")) return;
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
    if(document.getElementById('defaultTitle'))
    document.getElementById('defaultTitle').remove();
}

