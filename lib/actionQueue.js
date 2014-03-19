var _ = require('underscore');
var PeriodicBehavior = require('./periodicBehavior');
var TriggeredBehavior = require('./triggeredBehavior');

function ActionQueue () {

    this.actions = [];
    this.queued = {};
    this.triggers = {};
}

ActionQueue.prototype.enact = function (entity, behavior) {

    var aq = this;

    if (behavior instanceof PeriodicBehavior) {

        // make an entry in our queued list for actions triggered by this entity
        if (!this.queued[entity.id]) this.queued[entity.id] = [];

        this.queued[entity.id].push(setTimeout(function () {
            var result = behavior.action.call(entity, entity.context);
            if (result) aq.enact(entity, behavior); // if the action returns true, set up another round
        }, behavior.period));

        return;
    }

    if (behavior instanceof TriggeredBehavior) {

        var handlers = this.getHandlersForEvent(behavior.eventType);

        // TODO: should we be checking for duplicates here?
        // TODO: HACK: this is a hacky way of storing event-handling "frames"

        handlers.push([entity, behavior]);

        return;
    }

    throw new Error("A behavior was enacted that wasn't a recognized Behavior subclass.");

};

ActionQueue.prototype.getHandlersForEvent = function (eventName) {

    if (this.triggers[eventName] === undefined) this.triggers[eventName] = [];
    return this.triggers[eventName];
};

ActionQueue.prototype.register = function (entity) {

    var aq = this;

    entity.behaviors.forEach(function (behavior) {
        aq.enact(entity, behavior);
    });
};

ActionQueue.prototype.remove = function (entity) {

    // remove associated periodic behaviors
    if (this.queued[entity.id]) {
        this.queued[entity.id].forEach(function (timeoutHandle) {
            clearTimeout(timeoutHandle);
        });
    }

    // remove associated triggered behaviors
    _.each(this.triggers, function (handlers) {
        handlers.forEach(function (handler, i) {
            if (handler[0] === entity) handlers.splice(i, 1);
        })
    });
};

ActionQueue.prototype.repeal = function (behavior) {
    // TODO: write this
}

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