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

var ref = new Behavior({period: 400});
ref.action = function (context) {

    var players = context.players;
    var aq = context.aq;

    var count = 0;
    var last = null;
    for (var i = 0; i < players.length; i++) {
        if (!players[i].dead) {
            last = players[i];
            count++;
        }
    }

    if (count > 1) {
//        console.log(count + ' players remain.');
        return true;
    }

    if (count === 1) {
        console.log(last.name + " is the winner!");
        aq.remove(last); // prevent the last contestant from continuing to pull the trigger
        return false;
    }

    if (count === 0) {
        console.log("Oh shit, everybody's dead!");
        return false;
    }
};
out.Referee = ref;

module.exports = out;