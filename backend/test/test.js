const assert = require('assert');
const {config} = require('../config.js');

const actions = require('../actions.js');
const { Game } = require('../data');

// var gameInstance;
let game;

function setup() {
  game = new Game();
}

before(async () => {  
  await setup();
})

describe('Game', function () {
  describe ('constructor', function () {
    it('should create a board of default size', function () {
      assert.equal(game.board.size,config.BOARD_SIZE); 
    });
    // it('should create a board with tiles', function () {
    //   game.board.
    // });
  });
});
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