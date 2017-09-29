function Flight() {
    this.origin = "Sofia";
    this._destination = null;
    this.departureDate = '';
    this.returnDate = '';
    this._tickets = [];
}
Flight.prototype.setDestiantion = function (destination) {
    if (destination instanceof Destination) {
        this._destination = destination;
    }
}
Flight.prototype.setDepartureDate = function (departureDate) {
    this.departureDate = departureDate;
}
Flight.prototype.setReturnDate = function (returnDate) {
    this.returnDate = returnDate;
}
Flight.prototype.setReturnDate = function (ticket) {
    if (ticket instanceof Ticket) {
        this._tickets.push(ticket);
    }
}

function FlightPicker() {
    if (localStorage.getItem('flights') != null)
        this._flights = JSON.parse(localStorage.getItem('flights'));
    else {
        this._flights = [];
        localStorage.setItem('flights', JSON.stringify(this._flights));
    }
}

FlightPicker.prototype.addFlight = function(returnDate, passengers) {

}