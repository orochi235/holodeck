#!/usr/local/bin/node

var lib = require('./lib');

var Entity = lib.Entity;
var ActionQueue = lib.ActionQueue;
var behaviors = lib.behaviors;

var aq = new ActionQueue();

var players = [];
for (var i = 0; i < 3 ; i++) {
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