#!/usr/local/bin/node

var Entity = require('./lib').entity;
var ActionQueue = require('./lib').actionQueue;

var aq = new ActionQueue();

var players = [];
for (var i = 0; i < 10 ; i++) {
    players[i] = new Entity({name: "Contestant #" + i});
    aq.register(players[i]);
}
//for (i = 0; i < 10 ; i++) {
//    setTimeout(players[i].behaviors[0].action.call(players[i]), players[i].behaviors[0].period);
//}
