function Seat() {
    this.id = ++Seat.prototype.num;
    this.isBooked = false;
}
Seat.prototype.num = 0;
Seat.prototype.bookSeat = function () {
    this.isBooked = true;
}
function Ticket(origin,destination,price,seat) {
    this.origin = origin;
    this.destination = destination;
    this.price = price;
    this.seat = seat;
    this.isOneWay= false;
}
Ticket.prototype.calculatePrice = function () {
    
}
Ticket.prototype.
function Flight() {
    this.departureDate = '';
    this.departureHour = '';
    this.landingHour = '';
    this._seats = [
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
        new Seat(), new Seat(), new Seat(),
    ];
    this._tickets = [
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
        new Ticket(),new Ticket(),new Ticket(),
    ]
}
function Destination() {
    this.name = '';
    this._flights = [
        new Flight(),new Flight,
        new Flight(),new Flight
    ];
}
