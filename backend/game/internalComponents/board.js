const {config} = require('../../config.js');
const {Tile} = require( './tile.js');
const {Resource} = require('./resource.js');
const {Corner} = require('./corner.js');
const {Edge} = require('./edge.js');

const strToCoord = (str) => {
    const vals = str.split(',');
    return new Coordinate(vals[0], vals[1], vals[2]);
};

// Data structure for cubic coordinates!
class Coordinate {
    constructor(x, y, z) {
        this.x =  x;
        this.y =  y;
        this.z =  z;
        this.type = "cube";
    }

    // Implement if needed
    convertToAxial() {
        return null;
    }

    // Implement if needed
    convertToOffset() {
        return null;
    }
    
    toString() {
        return `${this.x},${this.y},${this.z}`;
    }

}

// Find corners by looking at common neighbors

// Singleton
class Board {
    constructor() {
        this.constructBoard(config.BOARD_SIZE);
    }

    constructBoard(size) {
        this.tiles = {};
        this.size = size;
        this.occupiedCorners = {};
        this.roads = {};
        this.generateBoard(this.size);
    }

    getOccupiedCorners = () => {
        return this.occupiedCorners;
    }

    generateBoard(size) {
        const testColors = [
            config.WOOL, config.ORE,
            config.BRICK, config.WOOD,
            config.WHEAT
        ];
            
        let rando = 0;
       // Follow this algo to improve speed to O(n^2)
       // https://www.redblobgames.com/grids/hexagons/implementation.html#shape-hexagon
        for (let i = -1 * size; i <= size; i++) {
            for (let j = -1 * size; j <= size; j++) {
                for (let k = -1 * size; k <= size; k++) {
                    if (i + j + k === 0) {
                        this.tiles[new Coordinate(i,j,k)] = 
                            new Tile(new Resource(testColors[rando++ % testColors.length]), {x: i, y: j, z: k});
                    }
                }
            }
        }
    }

    placeSettlement(location, playerID) {
        this.placeOnCorner(...arguments, 'settlement');
    }

    placeCity(location, playerID) {
        this.placeOnCorner(...arguments, 'city');
    }

    placeRoad(location, playerID) {
        const road = new Edge(...arguments);
        this.roads[road] = road;
    }

    placeOnCorner(location, playerID, type) {
        const corner = new Corner(...arguments);
        this.occupiedCorners[corner] = corner;
    }
}

module.exports.Board = Board
