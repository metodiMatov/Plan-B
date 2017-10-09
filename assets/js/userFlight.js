// var ticket = (function () {

function Ticket(origin, destination, date, hour, isOneWay, classPrice, baggagePrice, passengers) {
    this.destination = destination;
    this.origin = origin;
    this.date = date;
    this.hour = hour;
    this.baggagePrice = baggagePrice;
    this.classPrice = classPrice;
    this.isOneWay = isOneWay;
    this.passengers = passengers;
    this.price = 0;
}

Ticket.prototype.claculatedPrice = function () {
    this.price = (this.classPrice + this.baggagePrice) * this.passengers;

}
Ticket.prototype.addProperties = function (origin, destination, date, hour, isOneWay, classPrice, baggagePrice, passengers) {
    this.destination = destination;
    this.origin = origin;
    this.date = date;
    this.hour = hour;
    this.baggagePrice = baggagePrice;
    this.classPrice = classPrice;
    this.isOneWay = isOneWay;
    this.passengers = passengers;
}
//     return new Ticket();
// })();