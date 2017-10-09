var ticket = (function () {
    
    function Ticket(origin, destination, date, hour,isOneWay, classPrice, baggagePrice) {
        this.destination = destination;
        this.origin = origin;
        this.date = date;
        this.hour = hour;
        this.baggagePrice = baggagePrice;
        this.classPrice = classPrice;
        this.isOneWay = isOneWay;
        this.price = 0;
    }
    
    Ticket.prototype.claculatedPrice = function () {
        if (this.isOneWay == 'One way') {
            this.price = this.classPrice + this.baggagePrice;
        } else {
            this.price = 2 * (this.classPrice + this.baggagePrice);
        }
    }
    Ticket.prototype.addProperties = function (origin, destination, date, hour, isOneWay ,classPrice, baggagePrice) {
        this.destination = destination;
        this.origin = origin;
        this.date = date;
        this.hour = hour;
        this.baggagePrice = baggagePrice;
        this.classPrice = classPrice;
        this.isOneWay = isOneWay;
    }
    return new Ticket();
})();