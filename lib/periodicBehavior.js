import Behavior from './behavior';

var PeriodicBehavior = function (options) {

    if (options === undefined) options = {};

    Behavior.call(this, options.action);
    this.period = options.period || 1000;
    this.type = "periodic";

};
PeriodicBehavior.prototype = new Behavior();
PeriodicBehavior.prototype.constructor = PeriodicBehavior;

export default PeriodicBehavior;
