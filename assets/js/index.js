document.addEventListener("DOMContentLoaded", function() {
    var planButton = document.querySelector("nav ul li button");

    function showMenu(button, containerID, isOn) {
        if (isOn) {
            document.getElementById(containerID).style.display = "inline-block";
            button.style.color = "navy";
            button.style.backgroundColor = "white";
        } else {
            document.getElementById(containerID).style.display = "none";
            button.style.color = "white";
            button.style.backgroundColor = "navy";
        }
    }

    planButton.addEventListener("click", function(event) {
        if (document.getElementById("planMenu").style.display == "inline-block") {
            showMenu(planButton, "planMenu", false);
        } else {
            showMenu(planButton, "planMenu", true);
        }
    }, false)

    var user = document.querySelector("#user");
    user.addEventListener("click", function(event) {
        if (document.getElementById("signIn").style.display == "inline-block") {
            showMenu(user, "signIn", false);
        } else {
            showMenu(user, "signIn", true);
        }
    }, false);

    document.getElementById("cancelButton").addEventListener("click", function(event) {
        event.preventDefault();
        showMenu(user, "signIn", false);
    }, false)
})