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
            document.querySelector('div label[for="destination"]').style.color = 'gray';
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
                                    var op = document.createElement("option");
                                    op.value = date;
                                    op.textContent = date;
                                    document.getElementById("return-date").appendChild(op);
                                }
                            } else {
                                if (Number(retMonthDay[0]) > Number(depMonthDay[0])) {
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

    $('#departure-date').change(function(e) {

        console.log();
        var startDate = $('#departure-date').val();
        var city = $('#destination-select').val();
        var newDates = [];

        var dates = [];
        //var d = new Date("03/25/2015");
        getOptions().then(function(destinations) {

            destinations.forEach(function(e) {
                if (e.name == city) {
                    dates = e.returnFlights
                }
            })
            $('#return-date option').remove();
            $('#return-date').append('<option selected=selected> One way</option>');
            dates.forEach(function(e) {
                if (new Date(e.date) > new Date(startDate)) {
                    dates.push(e.date)
                    $('#return-date').append('<option value=' + e.date + '> ' + e.date + '</option>');
                }

            })
        })
    })

    var destinationValue = document.getElementById("destination-select").value;
    var searchbutton = document.querySelector('#search-button');
    searchbutton.addEventListener('click', function(event) {
        event.preventDefault();
        if (user.style.display === "none") {
            var secondMain = document.getElementById('second-main');
            if (document.getElementById('destination-select').value != 'Select destination') {
                main.style.display = "none";
                secondMain.style.display = "block";
                document.getElementById('fl-dest').textContent = 'SOFIA  --->  ' + document.getElementById("destination-select").value;
                document.getElementById('fl-date').textContent = "Flight Date: " + document.getElementById('departure-date').value;
                getOptions().then(function(destinations) {
                    var currentDestination = document.getElementById("destination-select").value;
                    var destination = destinations.find(d => d.name == currentDestination);
                    var prices = destination.flights[0].price;
                    document.querySelector("#basic-class > p").textContent = prices[0] + "lv";
                    document.querySelector("#second-class > p").textContent = prices[1] + "lv";
                    document.querySelector("#third-class > p").textContent = prices[2] + "lv";
                    var departureHour = destination.flights[0].departure;
                    var landingHour = destination.flights[0].landing;
                    document.getElementById('fl-hour').textContent = 'Departure Time: ' + departureHour + 'h';
                    document.getElementById('fl-landing').textContent = 'Landing Time: ' + landingHour + 'h';
                    if (document.getElementById('return-date')) {

                    }
                });
            } else {
                // var form = document.getElementById('div-search-btn');
                var p = document.querySelector("#error");
                p.textContent = 'Invalid search input !';
                document.querySelector('div label[for="destination"]').style.color = 'red';
            }
        } else {
            var p = document.querySelector("#error");
            p.textContent = "Please sign in your profile to continue";
        }

    });

    function fillUp(city) {
        document.querySelector("div#specialCity img").src = "assets/images/" + city.name.toLowerCase() + ".jpg";
        document.querySelector("div#specialCity h1").innerHTML = city.name;
        document.querySelector("div#specialCity p").innerHTML = city.bio;
        $("#specialCity").show();
    }

    $(".article-city").on("click", function(event) {
        $('main').block({ message: null });
        var city = this.id.toLowerCase();
        if (city == "milan") {
            fillUp(milan);
        }
        if (city == "paris") {
            fillUp(paris);
        }
        if (city == "frankfurt") {
            fillUp(frankfurt);
        }
        if (city == "budapest") {
            fillUp(budapest);
        }
    })

    $("#specialCity i").on("click", function() {
        $("#specialCity").hide();
        $('main').unblock();
    })

    $(".footer a").on("click", function(event) {
        event.preventDefault();
    });
    document.getElementById('next-price').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('select-price').style.display = 'none';
        document.getElementById('select-baggage').style.display = 'block';
    });
});