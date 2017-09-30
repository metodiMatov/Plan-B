document.addEventListener("DOMContentLoaded", function() {
    var planButton = document.querySelector("nav .collapse  ul li > #plan");

    function showMenu(button, containerID, isOn) {
        if (isOn) {

            document.getElementById(containerID).style.display = "inline-block";
            // button.style.color = "tansperant";
            // button.style.backgroundColor = "white";
        } else {
            document.getElementById(containerID).style.display = "none";
            // button.style.color = "white";
            // button.style.backgroundColor = "tansperant";
        }
    }
    planButton.addEventListener("click", function(event) {
        $('main').block({ message: null });
        if (document.getElementById("planmenu").style.display == "inline-block") {
            showMenu(planButton, "planmenu", false);
            $('main').unblock();
        } else {
            showMenu(planButton, "planmenu", true);
            showMenu(user, "signIn", false);
            showMenu(user, "registration", false);
        }
    }, false);
    var main = document.querySelector('main');
    main.addEventListener('click', function(event) {
        if (document.getElementById("planmenu").style.display == "inline-block" ||
            document.getElementById("signIn").style.display == "inline-block" ||
            document.getElementById("registration").style.display == "block") {
            $('main').unblock();
            showMenu(planButton, "planmenu", false);
            showMenu(user, "signIn", false);
            showMenu(user, "registration", false);
        }
    });
    var user = document.querySelector("nav .collapse  ul li > #user");
    user.addEventListener("click", function(event) {
        $('main').block({ message: null });
        if (document.getElementById("signIn").style.display == "inline-block") {
            showMenu(user, "signIn", false);
            $('main').unblock();
        } else {
            showMenu(user, "signIn", true);
            showMenu(planButton, "planmenu", false);
        }
    }, false);

    document.querySelector("#cancelButton").addEventListener("click", function(event) {
        event.preventDefault();
        $('main').unblock();
        showMenu(user, "signIn", false);
    }, false);
    var mail = document.getElementById("mail");
    var pass = document.getElementById("pass");
    var signIn = document.getElementById("signInButton");
    signIn.addEventListener("click", function(event) {
        event.preventDefault();
        var userConfirmation = users.findUser(mail.value, pass.value);
        if (userConfirmation) {
            var li = document.querySelector("nav li:last-child");
            var userName = document.createElement("button");
            userName.textContent = userConfirmation.firstName + " " + userConfirmation.lastName;
            userName.setAttribute("class", "nav");
            li.appendChild(userName);
            user.parentNode.removeChild(user);
            showMenu(user, "signIn", false);
        }
    }, false);

    var register = document.getElementById("registerButton");
    var registrationForm = document.getElementById("registration");
    register.addEventListener("click", function(event) {
        event.preventDefault();
        registrationForm.style.display = "block";
        showMenu(user, "signIn", false);
        showMenu(planButton, "planmenu", false);
    }, false)

    document.getElementById("createUser").addEventListener("click", function(event) {
        event.preventDefault();
        var firstName = document.querySelector("form#registration input[placeholder='First name']").value;
        var lastName = document.querySelector("form#registration input[placeholder='Last name']").value;
        var phone = document.querySelector("form#registration input[placeholder='Mobile phone']").value;
        var email = document.querySelector("form#registration input[placeholder='E-mail']").value;
        var password = document.querySelector("form#registration input[placeholder='Password']").value;
        if (firstName && lastName && phone && email && password) {
            users.addUser(firstName, lastName, phone, email, password)
            registrationForm.style.display = "none";
            showMenu(user, "signIn", true);
        } else {
            alert("Invalid data!");
        }
    }, false);

    document.getElementById("cancelRegistration").addEventListener("click", function(event) {
        event.preventDefault();
        $('main').unblock();
        registrationForm.style.display = "none";
    }, false);

    document.querySelector("#registration .formName i.closeTab").addEventListener("click", function(event) {
        registrationForm.style.display = "none";
        $('main').unblock();
    }, false);

    document.querySelector("#signIn .formName i.closeTab").addEventListener("click", function(event) {
        showMenu(user, "signIn", false);
        $('main').unblock();
    }, false);

    getOptions().then(function(destinations) {
        // var templateText = document.getElementById('destinations-template').innerHTML;
        // var templateFunc = Handlebars.compile(templateText);
        // var container = document.getElementById("destination-select");
        // container.innerHTML = templateFunc(destinations);
        destinations.forEach(function(dest) {
            var opt = document.createElement("option");
            opt.value = dest.name;
            opt.textContent = dest.name;
            document.getElementById("destination-select").appendChild(opt);
        });

        var selectDestination = document.getElementById("destination-select");
        selectDestination.addEventListener("change", function(event) {
            console.log(selectDestination.value);
            for (var index = 0; index < 7; index++) {
                document.getElementById("departure-date").innerHTML = null;
                if (selectDestination.value == destinations[index].name) {
                    console.log(destinations[index].name);
                    destinations[index].flights.forEach(function(fl) {
                        var option = document.createElement("option");
                        option.value = fl.date;
                        option.textContent = fl.date;
                        document.getElementById("departure-date").appendChild(option);
                    })
                    break;
                }
            }
        })
    });
});