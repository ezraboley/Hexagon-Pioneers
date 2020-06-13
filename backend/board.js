const {config} = require('./config.js');
const {Tile} = require( './tile.js');


const coordToStr = (x,y,z) => `${x},${y},${z}`;
const strToCoord = (str) => {
    const vals = str.split(',');
    return {
        x: parseInt(vals[0], 10),
        y: parseInt(vals[1], 10),
        z: parseInt(vals[2], 10)
    };
};

// Data structure for axial coordinates!
class Coordinate {
    constructor(x, y, z) {
        this.x =  x;
        this.y =  y;
        this.z =  z;
        this.type = "cube";
    }

    // Implement if needed
    convertToCube() {
        return null;
    }

    // Implement if needed
    convertToOffset() {
        return null;
    }


}

// Find corners by looking at common neighbors

// Singleton
class Board {
    constructor(size) {
        this.tiles = {};
        for (let i = -1 * size; i <= size; i++) {
            for (let j = -1 * size; j <= size; j++) {
                for (let k = -1 * size; k <= size; k++) {
                    if (i + j + k === 0) {
                        this.tiles[coordToStr(i,j,k)] = 
                            new Tile(config.WOOL);
                    }
                }
            }
        }
    }
}

module.exports.Board = Board
