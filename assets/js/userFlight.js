var ticket = (function () {
    var number = 1;
    function Ticket(origin, destination, clasa, baggage, calculatedPrice,isOneWay,classPrice,baggagePrice) {
        this.id = number++;
        this.isOneWay = isOneWay;
        this.destination = destination;
        this.origin = origin;
        this.class = clasa;
        this.baggage = baggage;
        this.totalPrice = 0;
        this.isOneWay = isOneWay;
    }
    Ticket.prototype.claculatedPrice = function (classPrice, baggagePrice) {
        if (this.isOneWay) {
            this.totalPrice = this.classPrice + this.baggagePrice;
        } else {
            this.totalPrice = 2 * (classPrice + baggagePrice);
        }
    }
    Ticket.prototype.addTicket = function (origin, destination, clasa, baggage, calculatedPrice,isOneWay) {
        this.isOneWay = isOneWay;
        this.destination = destination;
        this.origin = origin;
        this.class = clasa;
        this.baggage = baggage;
        this.isOneWay = isOneWay;
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

    return new Ticket();
})();