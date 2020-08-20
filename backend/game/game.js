const {Board} = require('./board.js');
const {config}  = require('../config.js');
// entry point for game, should include validation
class Game {
	constructor(gameName, numPlayers) {
		this.gameName = this.validateGameName(gameName);
		this.numPlayers = this.validateNumPlayers(numPlayers);
		this.board = new Board();
	}

	validateGameName = (name) => {
		if (typeof name !== 'string')
			throw new Error("Game name must be a string");
		return name;
	}

	validateNumPlayers = (num) => {
		if (2 <= num && num <= 4)
			return num;
		else
			throw new Error("Number of players must  be between 2 and 4");
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
	toString() {
		return this.numPlayers;
	}
}

module.exports.Game = Game; 
