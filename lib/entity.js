var Behavior = require('./behavior');

var idCounter = 0;

function Entity (options) {

    this.id = idCounter++;
    this.behaviors = [
        new Behavior()
    ];

    for (var key in options) {
        this[key] = options[key];
    }
}

module.exports = Entity;