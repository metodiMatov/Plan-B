document.addEventListener("DOMContentLoaded", function() {

    function showMenu(button, containerID, isOn) {
        if (isOn) {
            document.getElementById(containerID).style.display = "inline-block";
        } else {
            document.getElementById(containerID).style.display = "none";
        }
    }

    var main = document.querySelector('main');
    main.addEventListener('click', function(event) {
        if (document.getElementById("signIn").style.display == "inline-block" ||
            document.getElementById("registration").style.display == "block") {
            $('main').unblock();
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
            user.style.display = "none";
            var userName = document.getElementById("profile");
            userName.textContent = userConfirmation.firstName + " " + userConfirmation.lastName;
            showMenu(user, "signIn", false);
            $('main').unblock();
        }
    }, false);

    var register = document.getElementById("registerButton");
    var registrationForm = document.getElementById("registration");
    register.addEventListener("click", function(event) {
        event.preventDefault();
        registrationForm.style.display = "block";
        showMenu(user, "signIn", false);
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

    document.getElementById("profile").addEventListener("click", function(event) {
        event.preventDefault();
        if (document.getElementById("userProfile").style.display == "none") {
            $("#first").hide();
            document.getElementById("userProfile").style.display = "block";
        } else {
            $("#first").show();
            document.getElementById("userProfile").style.display = "none";
        }
    })

    getOptions().then(function(destinations) {
        destinations.forEach(function(dest) {
            var opt = document.createElement("option");
            opt.value = dest.name;
            opt.textContent = dest.name;
            document.getElementById("destination-select").appendChild(opt);
        });

        var selectDestination = document.getElementById("destination-select");
        selectDestination.addEventListener("change", function(event) {
            for (var index = 0; index < 7; index++) {
                document.getElementById("departure-date").innerHTML = null;
                document.getElementById("return-date").innerHTML = '<option selected="selected">One way</option>';
                if (selectDestination.value == destinations[index].name) {
                    var depatrureDates = destinations[index].flights.map(d => d = d.date);
                    depatrureDates.forEach(function(date) {
                        var option = document.createElement("option");
                        option.value = date;
                        option.textContent = date;
                        document.getElementById("departure-date").appendChild(option);
                    });

                    var returnDates = destinations[index].returnFlights.map(d => d = d.date);
                    var selectedDepartureDate = document.querySelector('#departure-date option').value;
                    document.getElementById("departure-date").addEventListener("change", function() {
                        document.getElementById("return-date").innerHTML = '<option selected="selected">One way</option>';
                        returnDates.forEach(function(date) {

                            var retMonthDay = date.split('/');
                            var depMonthDay = selectedDepartureDate.split('/');
                            if (retMonthDay[0] == depMonthDay[0]) {
                                if (Number(retMonthDay[1]) > Number(depMonthDay[1])) {
                                    console.log(date);
                                    var op = document.createElement("option");
                                    op.value = date;
                                    op.textContent = date;
                                    document.getElementById("return-date").appendChild(op);
                                }
                            } else {
                                if (Number(retMonthDay[0]) > Number(depMonthDay[0])) {
                                    console.log(date);
                                    var opt = document.createElement("option");
                                    opt.value = date;
                                    opt.textContent = date;
                                    document.getElementById("return-date").appendChild(opt);
                                }
                            }
                        })
                    })
                    break;
                }
            }
        })
    });
    var searchbutton = document.querySelector('#search-button');
    searchbutton.addEventListener('click', function(event) {
        event.preventDefault();

    });
});