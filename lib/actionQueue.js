function ActionQueue () {

    this.entities = {};
    this.actions = [];

}

ActionQueue.prototype.enqueue = function (entity, behavior) {

    var aq = this;

    var timer = setTimeout(function () {
        var result = behavior.action.call(entity);
        if (result) aq.enqueue(entity, behavior); // if the action returns true, set up another round
    }, behavior.period);

};

ActionQueue.prototype.register = function (entity) {

    var aq = this;

    entity.behaviors.forEach(function (behavior) {

        aq.enqueue(entity, behavior);

    });
};

module.exports = ActionQueue;