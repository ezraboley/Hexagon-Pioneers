const {Board} = require('./board.js');
const {config}  = require('../config.js');
// no validation, setters and getter
class Game {
	constructor() {
		this.board = new Board();
	}
	// var board;
		// static tiles
		// dynamic settlements, roads, cities, robber, l army, l road, cards played, last roll
	// players
		// static id
		// dynamic resource c, dev c, v points

	// init()
	// getBoard()
	// getPlayer(id) // validation?
}

module.exports.Game = Game; 