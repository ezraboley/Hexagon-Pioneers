const {config} = require("../../config.js");
const {Resource} = require("./resource.js");
const {Coordinate} = require('./coordinate.js');
const {coordinateToString} = require('../../utils.js');

class Tile {
    // pos is an object in this case!
    constructor(res, pos) {
        if (!(res instanceof Resource)) {
            throw "Invalid Resource";
            return null;
        }

        this.res = res;

        // IMPORTANT:
        // pos = {
        //  x: int
        //  y: int
        //  z: int
        // };
        this.pos = new Coordinate(pos.x, pos.y, pos.z);
        this.neighbors = [
            new Coordinate(this.pos.x + 1,  this.pos.y - 1, this.pos.z),
            new Coordinate(this.pos.x + 1,  this.pos.y,     this.pos.z - 1),
            new Coordinate(this.pos.x,      this.pos.y + 1, this.pos.z - 1),
            new Coordinate(this.pos.x - 1,  this.pos.y + 1, this.pos.z),
            new Coordinate(this.pos.x - 1,  this.pos.y,     this.pos.z + 1),
            new Coordinate(this.pos.x,      this.pos.y - 1, this.pos.z + 1),
        ];
    }

    toString() {
        return coordinateToString(this.pos);
    }

}

module.exports.Tile = Tile;
