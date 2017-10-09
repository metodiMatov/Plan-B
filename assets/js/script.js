document.addEventListener("DOMContentLoaded", function () {

    function showMenu(button, containerID, isOn) {
        if (isOn) {
            document.getElementById(containerID).style.display = "inline-block";
        } else {
            document.getElementById(containerID).style.display = "none";
        }
    }

    var main = document.querySelector('main');
    main.addEventListener('click', function (event) {
        if (document.getElementById("signIn").style.display == "inline-block" ||
            document.getElementById("registration").style.display == "block") {
            $('main').unblock();
            showMenu(user, "signIn", false);
            showMenu(user, "registration", false);
        }
    });
    var user = document.querySelector("nav .collapse  ul li > #user");
    user.addEventListener("click", function (event) {
        $('main').block({ message: null });
        if (document.getElementById("signIn").style.display == "inline-block") {
            showMenu(user, "signIn", false);
            $('main').unblock();
        } else {
            showMenu(user, "signIn", true);
        }
    }, false);

    document.querySelector("#cancelButton").addEventListener("click", function (event) {
        event.preventDefault();
        $('main').unblock();
        showMenu(user, "signIn", false);
    }, false);

    function userInfo(user) {
        document.querySelector("p#ur-first-name").innerHTML = "First name: ";
        document.querySelector("p#ur-family-name").innerHTML = "Last name: ";
        document.querySelector("p#ur-email").innerHTML = "E-mail: ";
        document.querySelector("p#ur-money").innerHTML = "Money: ";
        document.querySelector("p#ur-first-name").innerHTML += user.firstName;
        document.querySelector("p#ur-family-name").innerHTML += user.lastName;
        document.querySelector("p#ur-email").innerHTML += user.mail;
        document.querySelector("p#ur-money").innerHTML += user.money;
    }
    var mail = document.getElementById("mail");
    var pass = document.getElementById("pass");
    var signIn = document.getElementById("signInButton");
    signIn.addEventListener("click", function (event) {
        event.preventDefault();
        userConfirmation = users.findUser(mail.value, pass.value);
        if (userConfirmation) {
            user.style.display = "none";
            var userName = document.getElementById("profile");
            userName.textContent = userConfirmation.firstName + " " + userConfirmation.lastName;
            userName.style.color = "rgb(219,241,251)";
            showMenu(user, "signIn", false);
            $('main').unblock();
            userInfo(userConfirmation);
        }
    }, false);

    var register = document.getElementById("registerButton");
    var registrationForm = document.getElementById("registration");
    register.addEventListener("click", function (event) {
        event.preventDefault();
        registrationForm.style.display = "block";
        showMenu(user, "signIn", false);
    }, false)

    document.getElementById("createUser").addEventListener("click", function (event) {
        event.preventDefault();
        var firstName = document.querySelector("form#registration input[placeholder='First name']").value;
        var lastName = document.querySelector("form#registration input[placeholder='Last name']").value;
        var phone = document.querySelector("form#registration input[placeholder='Mobile phone']").value;
        var email = document.querySelector("form#registration input[placeholder='E-mail']").value;
        var password = document.querySelector("form#registration input[placeholder='Password']").value;
        var money = document.querySelector("form#registration input[placeholder='Money']").value;
        if (firstName && lastName && phone && email && password && money) {
            users.addUser(firstName, lastName, phone, email, password, money)
            registrationForm.style.display = "none";
            showMenu(user, "signIn", true);
        } else {
            alert("Invalid data!");
        }
    }, false);

    document.getElementById("cancelRegistration").addEventListener("click", function (event) {
        event.preventDefault();
        $('main').unblock();
        registrationForm.style.display = "none";
    }, false);

    document.querySelector("#registration .formName i.closeTab").addEventListener("click", function (event) {
        registrationForm.style.display = "none";
        $('main').unblock();
    }, false);

    document.querySelector("#signIn .formName i.closeTab").addEventListener("click", function (event) {
        showMenu(user, "signIn", false);
        $('main').unblock();
    }, false);

    function ticketInfo() {
        var userProfile = users.findUser(mail.value, pass.value);
        var container = document.querySelector(".table-tickets");

        container.innerHTML = ' <div class="row"><div class="col-md-4"> <h2>Booked Flights: </h2></div>' +
            '</div><div class="row"> <div class="col-md-2"> <h4>Destination</h4></div>' +
            '<div class="col-md-2"> <h4>Date</h4></div><div class="col-md-2"> <h4>Hour</h4></div>' +
            '<div class="col-md-2"><h4>Passangers</h4></div><div class="col-md-2"><h4>Price</h4></div><div class="col-md-2"><h4>Delete</h4> </div></div>'
        userProfile._tickets.forEach(function (t) {
            var row = document.createElement('div');
            row.setAttribute('class', 'row ticket-info');
            var col4 = document.createElement('div');
            col4.setAttribute('class', 'col-md-2 d');
            var h4 = document.createElement('h4');
            h4.textContent = t.origin + "-->" + t.destination;
            col4.appendChild(h4);
            row.appendChild(col4);

            var col2a = document.createElement('div');
            col2a.setAttribute('class', 'col-md-2 dt');
            var h4a = document.createElement('h4');
            h4a.textContent = t.date;
            col2a.appendChild(h4a);
            row.appendChild(col2a);

            var col2b = document.createElement('div');
            col2b.setAttribute('class', 'col-md-2 h');
            var h4b = document.createElement('h4');
            h4b.textContent = t.hour;
            col2b.appendChild(h4b);
            row.appendChild(col2b);

            var col2e = document.createElement('div');
            col2e.setAttribute('class', 'col-md-2 pas');
            var h4e = document.createElement('h4');
            h4e.textContent = t.passengers;
            col2e.appendChild(h4e);
            row.appendChild(col2e);

            var col2c = document.createElement('div');
            col2c.setAttribute('class', 'col-md-2 p');
            var h4c = document.createElement('h4');
            h4c.textContent = t.price;
            col2c.appendChild(h4c);
            row.appendChild(col2c);

            var col2d = document.createElement('div');
            col2d.setAttribute('class', 'col-md-2 dl');
            var button = document.createElement('button');
            button.textContent = 'Remove';
            col2d.appendChild(button);
            row.appendChild(col2d);
            container.appendChild(row);
            button.addEventListener('click', function (event) {
                row.parentNode.removeChild(row);
                users.removeTicket(userProfile, t);
                userInfo(userProfile);
            });
        });

    }

    document.getElementById("profile").addEventListener("click", function (event) {
        event.preventDefault();
        if (document.getElementById("userProfile").style.display == "block") {
            $("#first").show();
            document.getElementById("userProfile").style.display = "none";
        } else {
            $("#first").hide();
            document.querySelector("#second-main").style.display = "none";
            document.getElementById("userProfile").style.display = "block";
            ticketInfo();
            document.querySelector('#sing-out').addEventListener('click', function (event) {
                location.reload();
            });
        }
    })

    getOptions().then(function (destinations) {
        destinations.forEach(function (dest) {
            var opt = document.createElement("option");
            opt.value = dest.name;
            opt.textContent = dest.name;
            document.getElementById("destination-select").appendChild(opt);
        });

        var selectDestination = document.getElementById("destination-select");
        selectDestination.addEventListener("change", function (event) {
            document.querySelector('div label[for="destination"]').style.color = 'gray';
            for (var index = 0; index < 7; index++) {
                document.getElementById("departure-date").innerHTML = '<option selected="selected" disabled="disabled">Select date</option>';
                document.getElementById("return-date").innerHTML = '<option selected="selected">One way</option>';
                if (selectDestination.value == destinations[index].name) {
                    var depatrureDates = destinations[index].flights.map(d => d = d.date);
                    depatrureDates.forEach(function (date) {
                        var option = document.createElement("option");
                        option.value = date;
                        option.textContent = date;
                        document.getElementById("departure-date").appendChild(option);
                    });

                    var returnDates = destinations[index].returnFlights.map(d => d = d.date);
                    var selectedDepartureDate = document.querySelector('#departure-date option').value;
                    document.getElementById("departure-date").addEventListener("change", function () {
                        document.getElementById("return-date").innerHTML = '<option selected="selected">One way</option>';
                        returnDates.forEach(function (date) {

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

    $('#departure-date').change(function (e) {

        console.log();
        var startDate = $('#departure-date').val();
        var city = $('#destination-select').val();
        var newDates = [];

        var dates = [];
        getOptions().then(function (destinations) {

            destinations.forEach(function (e) {
                if (e.name == city) {
                    dates = e.returnFlights
                }
            })
            $('#return-date option').remove();
            $('#return-date').append('<option selected=selected> One way</option>');
            dates.forEach(function (e) {
                if (new Date(e.date) > new Date(startDate)) {
                    dates.push(e.date)
                    $('#return-date').append('<option value=' + e.date + '> ' + e.date + '</option>');
                }

            })
        })
    })

    var destinationValue = document.getElementById("destination-select").value;
    var searchbutton = document.querySelector('#search-button');
    searchbutton.addEventListener('click', function (event) {
        event.preventDefault();
        if (user.style.display === "none") {
            var secondMain = document.getElementById('second-main');
            if (document.getElementById('destination-select').value != 'Select destination') {
                main.style.display = "none";
                secondMain.style.display = "block";
                var currentDestination = document.getElementById("destination-select").value;
                document.getElementById('fl-dest').textContent = 'SOFIA  --->  ' + currentDestination;
                document.getElementById('fl-date').textContent = "Flight Date: " + document.getElementById('departure-date').value;
                getOptions().then(function (destinations) {

                    var destination = destinations.find(d => d.name == currentDestination);
                    let prices = destination.flights[0].price;
                    document.querySelector("#basic-class  p").textContent = prices[0] + "lv";
                    document.querySelector("#second-class  p").textContent = prices[1] + "lv";
                    document.querySelector("#third-class  p").textContent = prices[2] + "lv";
                    let departureHour = destination.flights[0].departure;
                    let landingHour = destination.flights[0].landing;
                    document.getElementById('fl-hour').textContent = 'Departure Time: ' + departureHour + 'h';
                    document.getElementById('fl-landing').textContent = 'Landing Time: ' + landingHour + 'h';
                    document.getElementById('ticket-type-oneway').textContent = 'Ticket Type: One Way Ticket';
                    if (document.getElementById('return-date').value !== 'One way') {
                        let prices = destination.flights[1].price;
                        let departureHour = destination.flights[1].departure;
                        let landingHour = destination.flights[1].landing;
                        document.getElementById('rt-dest').textContent = currentDestination + ' ---> SOFIA';
                        document.getElementById('rt-date').textContent = "Flight Date: " + document.getElementById('return-date').value;
                        document.querySelector("#rt-basic-class  p").textContent = prices[0] + "lv";
                        document.querySelector("#rt-second-class  p").textContent = prices[1] + "lv";
                        document.querySelector("#rt-third-class  p").textContent = prices[2] + "lv";
                        document.getElementById('return-flight-ticket').style.display = 'block';
                        document.getElementById('ticket-type-oneway').textContent = 'Ticket Type: Two Way Ticket';
                        document.getElementById('rt-hour').textContent = 'Departure Time: ' + departureHour + 'h';
                        document.getElementById('rt-landing').textContent = 'Landing Time: ' + landingHour + 'h';
                        document.getElementById('ticket-type-twoway').textContent = 'Ticket Type: One Way Ticket';
                    }
                });
            } else {
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

    $(".article-city").on("click", function (event) {
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

    $("#specialCity i").on("click", function () {
        $("#specialCity").hide();
        $('main').unblock();
    })

    $(".footer a").on("click", function (event) {
        event.preventDefault();
    });
    document.getElementById('next-price').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('return-flight-ticket').style.display = 'none';
        document.getElementById('select-price').style.display = 'none';
        document.getElementById('select-baggage').style.display = 'block';
    });

    document.querySelector('#buy-ticket').addEventListener('click', function (event) {
        document.getElementById("select-baggage").style.display = "none";
        document.getElementById("userProfile").style.display = "block";
        document.getElementById('second-main').style.display = 'none';
        var currentDestination = document.getElementById("destination-select").value;
        var userProfile = users.findUser(mail.value, pass.value);
        getOptions().then(function (destinations) {
            var destination = destinations.find(d => d.name == currentDestination);
            var departureFl = destination.flights.find(fl => fl.date == document.getElementById("departure-date").value);
            var returnFl = destination.returnFlights.find(fl => fl.date == document.getElementById("return-date").value);
            var isOneWay = document.getElementById('return-date').value;
            var passengers = parseInt(document.getElementById("adults").value) + parseInt(document.getElementById("kids").value) + parseInt(document.getElementById("infants").value);
            if (isOneWay == 'One way') {
                let origin = 'Sofia ';
                let dest = destination.name;
                let date = departureFl.date;
                let hour = departureFl.departure;
                let classPrice;
                if (document.getElementById('control_01').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_01"]').textContent);
                }
                if (document.getElementById('control_02').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_02"]').textContent);
                }
                if (document.getElementById('control_03').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_03"]').textContent);
                }

                let baggagePrice;
                if (document.getElementById('control_1').checked) {
                    baggagePrice = 0;
                }
                if (document.getElementById('control_2').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_2"]').textContent);
                }
                if (document.getElementById('control_3').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_3"]').textContent);
                }
                if (document.getElementById('control_4').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_4"]').textContent);
                }

                let t = new Ticket();
                t.addProperties(origin, dest, date, hour, isOneWay, classPrice, baggagePrice,passengers);
                t.claculatedPrice();
                users.buyTicket(t, userProfile);
                ticketInfo(t);
                userInfo(userProfile);
            } else {
                var passengers = parseInt(document.getElementById("adults").value) + parseInt(document.getElementById("kids").value) + parseInt(document.getElementById("infants").value);
                console.log(passengers);
                let origin = 'Sofia';
                let dest = destination.name;
                let date = departureFl.date;
                let hour = departureFl.departure;
                let classPrice;
                if (document.getElementById('control_01').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_01"]').textContent);
                }
                if (document.getElementById('control_02').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_02"]').textContent);
                }
                if (document.getElementById('control_03').checked) {
                    classPrice = parseInt(document.querySelector('[for="control_03"]').textContent);
                }

                let baggagePrice;
                if (document.getElementById('control_1').checked) {
                    baggagePrice = 0;
                }
                if (document.getElementById('control_2').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_2"]').textContent);
                }
                if (document.getElementById('control_3').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_3"]').textContent);
                }
                if (document.getElementById('control_4').checked) {
                    baggagePrice = parseInt(document.querySelector('[for="control_4"]').textContent);
                }

                let t = new Ticket();
                
                t.addProperties(origin, dest, date, hour, isOneWay, classPrice, baggagePrice,passengers);
                t.claculatedPrice();
                users.buyTicket(t, userProfile);
                let origin2 = destination.name;
                let dest2 = 'Sofia';
                let date2 = returnFl.date;
                let hour2 = returnFl.departure;
                let classPrice2 = classPrice;
                let bagggePrice2 = baggagePrice;

                let v = new Ticket();
                v.addProperties(origin2, dest2, date2, hour2, isOneWay, classPrice2, bagggePrice2,passengers);
                v.claculatedPrice();
                users.buyTicket(v, userProfile);
                ticketInfo(v);
                userInfo(userProfile);
            }
        });
        document.querySelector('#sing-out').addEventListener('click', function (event) {
            location.reload();
        });
    });
});