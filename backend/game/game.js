const {Board} = require('./internalComponents/board.js');
const {config}  = require('../config.js');
const {Validate} = require('./validate.js');
// entry point for game, should include validation
class Game {
	constructor(gameName, numPlayers) {
		Validate.gameName(gameName);
		Validate.numPlayers(numPlayers);

		this.gameName = gameName;
		this.numPlayers = numPlayers;
		this.board = new Board();
	}

	getOccupiedCorners = () => {
		return this.board.getOccupiedCorners();
	}

	tryBuildSettlement(loc, playerID) {
		Validate.buildSettlement(this, ...arguments);

		this.board.placeSettlement(...arguments);
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

	// ADD VALIDATION CLASS
	toString() {
		return this.numPlayers;
	}
}

module.exports.Game = Game; 
