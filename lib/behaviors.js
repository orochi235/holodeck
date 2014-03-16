var Behavior = require('./behavior');

var out = {};

var rr = new Behavior();
rr.action = function () {

    if (this.wins === undefined) this.wins = 0;

    var roll = Math.random();

    if (roll >= 1/6) {
        this.dead = false;
        this.wins++;
        console.log(this.name + " survived round " + this.wins);
        return true;
    } else {
        this.dead = true;
        console.log(this.name + " died!");
        return false;
    }
};
out.RussianRoulette = rr;

module.exports = out;