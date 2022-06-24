/* When the user clicks on the button,
   toggle between hiding and showing the dropdown content
   Close the dropdown if the user clicks outside of it*/
let count = 1;

function myFunction() {
    if (count === 1) {
        document.getElementById("myDropdown").classList.toggle("show");
        if(document.getElementById("details"))
        document.getElementById("details").style.display = "none";
        count = 0;
    } else {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown)
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        if(document.getElementById("details"))
        document.getElementById("details").style.display = "block";
        count = 1;
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
        document.getElementById("smth").style.top = "-240px";
    }
    prevScrollpos = currentScrollPos;
}

//for driverPage
function showCommands() {
    document.getElementById('commandsList').style.display = "block";
    if (document.getElementById('defaultTitle'))
        document.getElementById('defaultTitle').remove();
}

function showCommandsMobile() {
    document.getElementById("myNav").style.height = "0%"
    document.getElementById('commandsList').style.display = "block";
    if (document.getElementById('defaultTitle'))
        document.getElementById('defaultTitle').remove();
}

//for history ride
function showCourses() {
    document.getElementById('main-div').style.display = "none";
    document.getElementById('smth').style.display = "none";
    document.getElementById('commandsList').style.display = "block";
}

let variabila = 1;

function showCoursesMobile() {
        document.getElementById("myNav").style.height = "0%"
        document.getElementById("smth").style.display = "none";
        document.getElementById("main-div").style.display = "none";
        document.getElementById('commandsList').style.display = "block";
}

//for history food
function showFoods() {
    document.getElementById('box').style.display = "none";
    document.getElementById('commandsList').style.display = "block";
}

function showFoodMobile() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById('box').style.display = "none";
    document.getElementById('commandsList').style.display = "block";
}

//back to main page in the service
function backRideS() {
    document.getElementById('commandsList').style.display = "none";
    document.getElementById('main-div').style.display = "flex";
    document.getElementById('smth').style.display = "block";
}

function backFood() {
    document.getElementById('commandsList').style.display = "none";
    document.getElementById('box').style.display = "flex";
}
function showStats(){
    var x=document.getElementsByClassName('header');
    for (var item of x){
        item.innerHTML=item.innerHTML+`<a class="statistici" id="statistici" style="display: block;" class="link" href="../admin/statistics.html">Statistici</a>`
    }
     x=document.getElementsByClassName('header_small');
    for (var item of x){
        item.innerHTML=item.innerHTML+`<a class="statistici" id="statistici" style="display: block;" class="link" href="../admin/statistics.html">Statistici</a>
`
    }
}
