const assert = require('assert');
const {config} = require('../config.js');

const actions = require('../actions.js');
const { Board } = require('../data/board.js')
const { Corner } = require('../data/corner.js')
const { Game } = require('../data');

// var gameInstance;
let board;

function setup() {
  board = new Board();
}

before(async () => {  
  await setup();
})

describe('Board', function () {
  describe ('constructor', function () {
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
    describe('corner list to string', function () {
      it("should change ['0,-1,1', '-1,0,1', '-1,-1,2'] into '-1,-1,2;-1,0,1;0,-1,1'", function() {
        const result = Corner.listToString(['0,-1,1', '-1,0,1', '-1,-1,2']);
        assert.equal(result, '-1,-1,2;-1,0,1;0,-1,1');
      });
    });
    describe('settlement placement', function () {
      it('should have a settlement at corner 0,-1,1; -1,0,1; -1,-1,2', function () {
        const playerId = 1;
        board.placeSettlement(['0,-1,1', '-1,0,1', '-1,-1,2'], playerId);
        assert(Corner.listToString(['0,-1,1', '-1,0,1', '-1,-1,2']) in board.occupiedCorners);
      });
    });
    describe('city placement', function () {
      it('should have a city at corner 0,-2,2; -1,2,-1; 2,-2,0', function () {
        const playerId = 2;
        board.placeCity(['0,-2,2', '-1,2,-1', '2,-2,0'], playerId);
        assert(Corner.listToString(['0,-2,2', '2,-2,0', '-1,2,-1']) in board.occupiedCorners);
      });
    });
  });
});
// describe('Game', function () {
//   describe ('constructor', function () {
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