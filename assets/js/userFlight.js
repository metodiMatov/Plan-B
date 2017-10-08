var ticket = (function () {
    var number = 1;
    function Ticket(origin, destination, clasa, baggage,isOneWay,classPrice,baggagePrice) {
        this.id = number++;
        this.isOneWay = isOneWay;
        this.destination = destination;
        this.origin = origin;
        this.class = clasa;
        this.baggage = baggage;
        this.totalPrice = 0;
        this.isOneWay = isOneWay;
    }
    Ticket.prototype.claculatedPrice = function () {
        if (this.isOneWay) {
            this.totalPrice = this.classPrice + this.baggagePrice;
        } else {
            this.totalPrice = 2 * (this.classPrice + this.baggagePrice);
        }
    }
    Ticket.prototype.addProperties = function (origin, destination, clasa, baggage, calculatedPrice,isOneWay) {
        this.isOneWay = isOneWay;
        this.destination = destination;
        this.origin = origin;
        this.class = clasa;
        this.baggage = baggage;
        this.isOneWay = isOneWay;
    }
    return new Ticket();
})();