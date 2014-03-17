var assert = require('assert');

var CoreStat = require('./coreStat');
var Entity = require('../entity');
var Facet = require('./facet');

var Agent = function (options) {

    if (options === undefined) options = {};

    Entity.call(this, options);

    // initialize local collections; they'll mostly be fleshed out in facets
    this.coreStats = {};

    var self = this;

    if (options.facets) {
        options.facets.forEach(function (facet) {
            self.integrateFacet(facet);
        });
    }

};
Agent.prototype = new Entity();
Agent.prototype.constructor = Agent;


Agent.prototype.addCoreStat = function (coreStat) {

    assert(this.coreStats[coreStat.id] === undefined, 'Duplicate coreStat specified: ' + coreStat.id);

    this.coreStats[coreStat.id] = new CoreStat(coreStat);

};

Agent.prototype.getStat = function (id) {
    return this.coreStats[id].value;
};

Agent.prototype.integrateFacet = function (facet) {

    var self = this;

    facet.coreStats.forEach(function (coreStat) {
        self.addCoreStat(coreStat);
    });


};

module.exports = Agent;