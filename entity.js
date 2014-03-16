
var idCounter = 0;

function Entity () {
    this.id = idCounter++;
    console.log('creating entity with id ' + (idCounter - 1));
}

module.exports = Entity;