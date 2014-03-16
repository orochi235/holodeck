function ActionQueue () {

    this.entities = {};
    this.actions = [];
    this.queued = {};

}

ActionQueue.prototype.enqueue = function (entity, behavior) {

    var aq = this;

    // make an entry in our queued list for actions triggered by this entity
    if (!this.queued[entity.id]) this.queued[entity.id] = [];

    this.queued[entity.id].push(setTimeout(function () {
        var result = behavior.action.call(entity, entity.context);
        if (result) aq.enqueue(entity, behavior); // if the action returns true, set up another round
    }, behavior.period));

};

ActionQueue.prototype.register = function (entity) {

    var aq = this;

    entity.behaviors.forEach(function (behavior) {

        aq.enqueue(entity, behavior);

    });
};

ActionQueue.prototype.remove = function (entity) {
    if (this.queued[entity.id]) {
        this.queued[entity.id].forEach(function (timeoutHandle) {
            clearTimeout(timeoutHandle);
        });
    }
};

module.exports = ActionQueue;