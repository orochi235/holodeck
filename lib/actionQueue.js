var PeriodicBehavior = require('./periodicBehavior');
var TriggeredBehavior = require('./triggeredBehavior');

function ActionQueue () {

    this.actions = [];
    this.queued = {};
    this.triggers = {};
}

ActionQueue.prototype.enqueue = function (entity, behavior) {

    var aq = this;

    if (behavior instanceof PeriodicBehavior) {

        // make an entry in our queued list for actions triggered by this entity
        if (!this.queued[entity.id]) this.queued[entity.id] = [];

        this.queued[entity.id].push(setTimeout(function () {
            var result = behavior.action.call(entity, entity.context);
            if (result) aq.enqueue(entity, behavior); // if the action returns true, set up another round
        }, behavior.period));

        return;
    }

    if (behavior instanceof TriggeredBehavior) {

        var handlers = this.registerEvent(behavior.eventType);

        // TODO: should we be checking for duplicates here?
        // TODO: HACK: this is a hacky way of storing event-handling "frames"

        handlers.push([entity, behavior]);

        return;
    }

    throw new Error("A behavior was enqueued that wasn't a recognized Behavior subclass.");

};

ActionQueue.prototype.register = function (entity) {

    var aq = this;

    entity.behaviors.forEach(function (behavior) {
        aq.enqueue(entity, behavior);
    });
};

ActionQueue.prototype.registerEvent = function (eventName) {

    // TODO: MIKE: this is named poorly. as it stands, it's an accessor whose secondary job is instantiation, but the name reflects the opposite

    if (this.triggers[eventName] === undefined) this.triggers[eventName] = [];
    return this.triggers[eventName];
};

ActionQueue.prototype.remove = function (entity) {
    if (this.queued[entity.id]) {
        this.queued[entity.id].forEach(function (timeoutHandle) {
            clearTimeout(timeoutHandle);
        });
    }
};

ActionQueue.prototype.trigger = function (eventName, args) {
    if (this.triggers[eventName] === undefined) {
        console.warn('Event "' + eventName + '" was triggered but no handlers exist for it.');
    } else {
        this.triggers[eventName].forEach(function (frame) {
            var entity = frame[0], behavior = frame[1];

            behavior.action.call(entity, entity.context);
            // TODO: MIKE: remove handler if false is returned from event handler?
        })
    }
};

module.exports = ActionQueue;