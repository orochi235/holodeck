#!/usr/local/bin/node

var Entity = require('./lib').entity;
var ActionQueue = require('./lib').actionQueue;
var behaviors = require('./lib').behaviors;

var aq = new ActionQueue();

var players = [];
for (var i = 0; i < 10 ; i++) {
    players[i] = new Entity({
        behaviors: [behaviors.RussianRoulette],
        context: players,
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
    name: "Referee" + i
});
aq.register(referee);