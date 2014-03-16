function Behavior (action, period) {

    this.period = period || 1000;
    this.action = action || function () {};

}

module.exports = Behavior;
