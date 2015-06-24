import assert from 'assert';
//var assert = require('assert');

import CoreStat from './coreStat';
import Entity from '../entity';
import Facet from './facet';
//var CoreStat = require('./coreStat');
//var Entity = require('../entity');
//var Facet = require('./facet');

var Agent = function (options) {

    if (options === undefined) options = {};

    Entity.call(this, options);

    // initialize local collections; they'll mostly be fleshed out in facets
    this.actions = {};
    this.attributes = {};
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

Agent.prototype.addAction = function (action) {

    // TODO: there should probably be _some_ interface enforcement here

    assert(this.actions[action.id] === undefined, 'Duplicate action specified: ' + action.id);
    this.actions[action.id] = action.handler;

    return this;
}

Agent.prototype.addAttribute = function (attrib) {

    // TODO: we're specifying type but there's no type checking. this was done with an eye on performance, but we'll have to see where things go

    assert(this.attributes[attrib.id] === undefined, 'Duplicate attribute specified: ' + attrib.id);
    this.attributes[attrib.id] = attrib.initial;

    return this;
};

Agent.prototype.addCoreStat = function (coreStat) {

    assert(this.coreStats[coreStat.id] === undefined, 'Duplicate coreStat specified: ' + coreStat.id);

    this.coreStats[coreStat.id] = new CoreStat(coreStat);

    return this;
};

Agent.prototype.getStat = function (id) {
    return this.coreStats[id].value;
};

Agent.prototype.integrateFacet = function (facet) {

    var self = this;

    facet.actions.forEach(function (action) {
        self.addAction(action);
    });

    facet.attributes.forEach(function (attrib) {
        self.addAttribute(attrib);
    });

    facet.coreStats.forEach(function (coreStat) {
        self.addCoreStat(coreStat);
    });

    return this;
};

Agent.prototype.perform = function (actionId, args) {

    return this.actions[actionId].apply(this, arguments.slice(1));

};

export default Agent;
