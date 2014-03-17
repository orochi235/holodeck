var World = function (width, height, depth) {

    this.width = width || 256;
    this.height = height || 16;
    this.depth = depth || 256;

    this.initialize();

};

World.prototype.initialize = function () {

    this.contents = [];

};
//
//World.prototype.hashLocalCoord = function (x, y, z) {
//
//    return x * this.width
//
//}