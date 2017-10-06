var ticket = (function () {
    var number = 1;
    function TicketList() {
        this._tickets = [];
    }
    TicketList.prototype.addTicket = function (t1,t2) {
        if (t1) {
            
        }
        this._tickets.push(ticket);
    }
    function Ticket(origin, destination, clasa, baggage, calculatedPrice,isOneWay) {
        this.id = number++;
        this.isOneWay = isOneWay;
        this.destination = destination;
        this.origin = origin;
        this.class = clasa;
        this.baggage = baggage;
        this.isOneWay = isOneWay;
    }
    Ticket.prototype.claculatedPrice = function (basicPrice, baggagePrice) {
        if (this.isOneWay) {
            this.totalPrice = basicPrice * baggagePrice;
        } else {
            this.totalPrice = 2 * (basicPrice * baggagePrice);
        }
    }
    function DepartureTicket(origin, destination, clasa, baggage, calculatedPrice,isOneWay) {
        Ticket.call(this,origin, destination, clasa, baggage, calculatedPrice,isOneWay);
    }
    DepartureTicket.prototype = Object.create(Ticket.prototype);
    DepartureTicket.prototype.constructor = DepartureTicket;

    function ReturnTicket(origin, destination, clasa, baggage, calculatedPrice,isOneWay) {
        Ticket.call(this,origin, destination, clasa, baggage, calculatedPrice,isOneWay);
    }
    ReturnTicket.prototype = Object.create(Ticket.prototype);
    ReturnTicket.prototype.constructor = ReturnTicket;

    return new TicketList();
})();