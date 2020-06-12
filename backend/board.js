/*import Tile from './tile.js';*/


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

// Singleton
class Board {
    constructor(size) {
        this.tiles = {};
        for (let i = -1 * size; i <= size; i++) {
            for (let j = -1 * size; j <= size; j++) {
                for (let k = -1 * size; k <= size; k++) {
                    if (i + j + k === 0) {
                        this.tiles[`${i},${j},${k}`] = "res";
                    }
                }
            }
        }
    }
}

module.exports.Board = Board
