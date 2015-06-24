#!/usr/local/bin/node

import lib from './lib';
//var lib = require('./lib');

var Entity = lib.Entity;
var ActionQueue = lib.ActionQueue;
var behaviors = lib.behaviors;

var aq = new ActionQueue();

var players = [];
for (var i = 0; i < 10 ; i++) {
    players[i] = new Entity({
        behaviors: [behaviors.RussianRoulette],
        context: {
            aq: aq,
            players: players
        },
        name: "Contestant #" + i
    });
    aq.register(players[i]);
}

var referee = new Entity({
    behaviors: [behaviors.Referee],
    context: {
        aq: aq,
        players: players
    },
    name: "Referee"
});
aq.register(referee);

var agent = new lib.Agent({
    facets: [lib.agent.facets.Mortal]
});
console.log("Just made a dude, and he has " + agent.getStat('hp') + " HP. Now on with the bloodsport!");

// NEXT STEPS:
// TODO: convert RussianRoulette and Referee from Behaviors to Facets
// TODO: convert players and ref from Entity to Agent
// TODO: implement support for types exposed by agent and facet (e.g. actions, needs, etc.)
// TODO: implement and test the Mortal facet.
