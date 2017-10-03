var flightList = (function () {
    function Flight(origin, destination, departureDate, returnDate, passangers) {
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.passangers = passangers;
    }
    function FlightList() {
        this._flights = [];
        //zaqvka do json 
    }
    return new FlightList();
})();