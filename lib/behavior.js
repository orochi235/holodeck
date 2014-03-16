
function Behavior (action, period) {

    this.period = period || 1000;
    this.action = action || function () {

        if (this.wins === undefined) this.wins = 0;

        var roll = Math.random();

        if (roll >= .5) {
            this.wins++;
            console.log(this.name + " survived round " + this.wins);
            return true;
        } else {
            console.log(this.name + " died!");
            return false;
        }

    };


}

module.exports = Behavior;