function User(firstName, lastName, phone, mail, password, money) {
    if (typeof firstName == "string" && firstName.trim().length > 0 && typeof lastName == "string" && lastName.trim().length > 0 &&
        typeof phone == "string" && phone.startsWith("08") && phone.length == 10 && password.length >= 5) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.mail = mail;
        this.password = password;
        this.money = money;
        this._tickets = [];
    } else {
        throw new Error("Invalid data");
        alert("Invalid data!");
    }
}
function UsersList() {
    if (localStorage.getItem('users') != null)
        this._users = JSON.parse(localStorage.getItem('users'));
    else {
        this._users = [];
        localStorage.setItem('users', JSON.stringify(this._users));
    }
}

UsersList.prototype.addUser = function (firstName, lastName, phone, mail, password, money) {
    if (!(this._users.some(user => user.mail === mail))) {
        this._users.push(new User(firstName, lastName, phone, mail, password, money));
        localStorage.setItem('users', JSON.stringify(this._users));
    }
}

UsersList.prototype.findUser = function (mail, pass) {
    return this._users.find(user => user.mail === mail && user.password === pass);
}

UsersList.prototype.deleteUser = function (mail, pass) {
    var userIndex = this._users.findIndex(user => user.mail === mail && user.password === pass);
    if (userIndex > -1) {
        this._users.splice(userIndex, 1);
    }
}
UsersList.prototype.buyTicket = function (ticket, user) {
    
    var userIndex = this._users.findIndex(us => us.mail === user.mail);
    if(!(this._users[userIndex]._tickets.some((fl1, fl2)=>fl1.date==fl2.date && fl1.destination==fl2.destination))){
     if (this._users[userIndex].money > ticket.price) {
        this._users[userIndex]._tickets.push(ticket);
        this._users[userIndex].money -= ticket.price;
        localStorage.setItem("users", JSON.stringify(this._users));
    }
}
}
UsersList.prototype.removeTicket = function (user, ticket) {
    var userIndex = this._users.findIndex(us => us.mail === user.mail);
    var ticketIndex = this._users[userIndex]._tickets.findIndex(t => t.date == ticket.date && t.destination==ticket.destination);
    this._users[userIndex].money += this._users[userIndex]._tickets[ticketIndex].price;
    this._users[userIndex]._tickets.splice(ticketIndex,1);
    localStorage.setItem("users", JSON.stringify(this._users));
}
var users = new UsersList;
users.addUser("Yoana", "Grigorova", "0886392532", "grigorova@gmail.com", "12345", 1000);