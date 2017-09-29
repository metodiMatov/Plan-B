function Flight(destination, departure) {
    this.origin = "Sofia";
    this.destination = destination;
    this.departure = departure;
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