const {config} = require("./config.js");

class Tile {
    constructor(res) {
        if (!this.isResource(res)) {
            console.log("invalid res");
            return null;
        }

        this.res = res;
    }

    isResource(res) {
        return res === config.ORE || res === config.WOOD || 
            res === config.WOOL || res === config.BRICK || 
            res === config.WHEAT;
    }
}

module.exports.Tile = Tile;
