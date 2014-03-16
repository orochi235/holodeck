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
    behaviors: [{
        action: function (context) {

            var count = 0;
            var last = null;
            for (var i = 0; i < context.length; i++) {
                if (!context[i].dead) {
                    last = context[i];
                    count++;
                }
            }

            if (count > 1) {
//                console.log(count + ' players remain.');
                return true;
            }

            if (count === 1) {
                console.log(last.name + " is the winner!");
                aq.remove(last); // prevent the last contestant from continuing to pull the trigger
                return false;
            }

            if (count === 0) {
                console.log("Oh shit, everybody's dead!");
                return false;
            }

        },
        period: 400
    }],
    context: players,
    name: "Contestant #" + i
});
aq.register(referee);

//for (i = 0; i < 10 ; i++) {
//    setTimeout(players[i].behaviors[0].action.call(players[i]), players[i].behaviors[0].period);
//}
