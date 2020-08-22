const assert = require('assert');
const {config} = require('../config.js');
const {locationListToString} = require('../utils.js');

const actions = require('../actions.js');
const { Board } = require('../game/internalComponents/board.js');
const { Corner } = require('../game/internalComponents/corner.js');
const { Edge } = require('../game/internalComponents/edge.js');
const { Game } = require('../game');

// var gameInstance;
const corner1 = [{x: 0, y: -1, z: 1},
                {x: -1, y: 0, z: 1},
                {x: -1, y: -1, z: 2}];
const corner2 = [{x: 0, y: -2, z: 2},
                {x: -1, y: 2, z: -1},
                {x: 2, y: -2, z: 0}];
const invaildCorner1 = [{x: 0, y: -1, z: 1},
                        {x: -1, y: 0, z: 1},
                        {x: -1, y: -1, z: 1}];

const invaildCorner2 = [{x: 0, y: -1, z: 1},
                        {x: -1, y: 0, z: 1},
                        {x: -1, y: -1, z: 3}];
const edge1 = [{x: -1, y: 1, z: 0,
                x: 0, y: 0, z: 0}];

let board;
let game;

function setup() {
  board = new Board();
  game = new Game("VALID", 3);
}

before(async () => {  
  await setup();
})

describe('Board', function () {
  describe ('#constructor()', function () {
    it('should create a board of default size', function () {
      assert.equal(board.size,config.BOARD_SIZE); 
    });
    it('should have a tile at 1,-2,1', function () {
      assert('1,-2,1' in board.tiles);
    });
    it('should not have a tile at 0,-2,3', function () {
      assert(!('0,-2,3' in board.tiles));
    });
  });
  describe('object placement action', function () {
    describe('#locationListToString()', function () {
      it(`should change ${corner1} into '-1,-1,2;-1,0,1;0,-1,1'`, function() {
        const result = locationListToString(corner1);
        assert.equal(result, '-1,-1,2;-1,0,1;0,-1,1');
      });
    });
    describe('#placeSettlement()', function () {
      it('should have a settlement at corner 0,-1,1; -1,0,1; -1,-1,2', function () {
        const playerId = 1;
        board.placeSettlement(corner1, playerId);
        assert(locationListToString(corner1) in board.occupiedCorners);
      });
    });
    describe('#placeCity()', function () {
      it('should have a city at corner 0,-2,2; -1,2,-1; 2,-2,0', function () {
        const playerId = 2;
        board.placeCity(corner2, playerId);
        assert(locationListToString(corner2) in board.occupiedCorners);
      });
    });
    describe('#placeRoad()', function () {
      it('should have a road at -1,1,0; 0,0,0', function () {
        const playerId = 3;
        board.placeRoad(edge1, playerId);
        assert(locationListToString(edge1) in board.roads);
      });
    });
  });
});
describe('Game', function () {
  describe ('#constructor()', function () {
    it('should create a game named VALID with 3 players', function () {
      const validGame = new Game("VALID", 3);

      assert.equal(validGame.gameName, "VALID");
      assert.equal(validGame.numPlayers, 3);
    });
    it('should throw an exeption with non-string input', function () {
      assert.throws(() => {
        return new Game(4, 3);
      });
    });
    it('should throw an exeption when numPlayers is out of range', function () {
      assert.throws(() => {
        return new Game("INVALID", 5);
      });
    });
    it('should throw an exeption when numPlayers is not a number', function () {
      assert.throws(() => {
        return new Game("INVALID", "four");
      });
    });
  });
  describe ("#tryBuildSettlement()", function () {
    // need to see player hand first
    // it('should add a settlement to the game at 0,-1,1; -1,0,1; -1,-1,2', function () {
    //   const validGame = new Game("VALID", 3);
    //   const playerId = 1;
    //   validGame.tryBuildSettlement(corner1, playerId);
    //   assert(locationListToString(corner1) in validGame.getOccupiedCorners());
    // });
    it('should throw an error when the settlement is placed at 0,-1,1; -1,0,1; -1,-1,1', function () {
      const validGame = new Game("VALID", 3);
      const playerId = 1;
      assert.throws(() => {
        validGame.tryBuildSettlement(invaildCorner1, playerId);
      });
    });
    it('should throw an error when the settlement is placed at 0,-1,1; -1,0,1; -1,-1,3', function () {
      const validGame = new Game("VALID", 3);
      const playerId = 1;
      assert.throws(() => {
        validGame.tryBuildSettlement(invaildCorner2, playerId);
      });
    });
  });
});
//     it('should create a board of default size', function () {
//       assert.equal(game.board.size,config.BOARD_SIZE); 
//     });
//     it('should have a tile at 1,-2,1', function () {
//       assert('1,-2,1' in game.board.tiles);
//     });
//     it('should not have a tile at 0,-2,3', function () {
//       assert(!('0,-2,3' in game.board.tiles));
//     });
//   });
// });
// describe('Actions', function () {
//   // describe('#validateNewSettlement()', function () {
//   //   it('should ')
//   // });
//   describe('hello', function () {
//     it('should return hello', function () {
//       assert.equal("Hello", "Hello");
//     });
//   });
// });