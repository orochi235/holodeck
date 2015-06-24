import Behavior from './behavior';

var TriggeredBehavior = function (options) {

    if (options === undefined) options = {};

    Behavior.call(this, options);
    this.type = "triggered";
    this.eventType = options.eventType;

};
TriggeredBehavior.prototype = new Behavior();
TriggeredBehavior.prototype.constructor = TriggeredBehavior;

export default TriggeredBehavior;

