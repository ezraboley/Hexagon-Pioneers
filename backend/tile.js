const {config} = require("./config.js");
const {Resource} = require("./resource.js");

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
        this.pos = pos;
        this.neighbors = [
            {x: this.pos.x + 1, y: this.pos.y - 1, z: this.pos.z},
            {x: this.pos.x + 1, y: this.pos.y, z: this.pos.z - 1},
            {x: this.pos.x, y: this.pos.y + 1, z: this.pos.z - 1},
            {x: this.pos.x - 1, y: this.pos.y + 1, z: this.pos.z},
            {x: this.pos.x - 1, y: this.pos.y, z: this.pos.z + 1},
            {x: this.pos.x, y: this.pos.y - 1, z: this.pos.z + 1},
        ];
    }

}

module.exports.Tile = Tile;
