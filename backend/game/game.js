const {Board} = require('./board');
const {Player} = require('./player');
const {config}  = require('../config.js');
const {GameRules} = require('./gameRules.js');

// entry point for game, should include validation
class Game {
	constructor(gameName, numPlayers) {
		GameRules.gameName(gameName);
		GameRules.numPlayers(numPlayers);

		this.gameName = gameName;
		const players = {};
		let i;
		for (i = 1; i <= numPlayers; i++) {
			players[i] = new Player(i);
		}
		this.players = players;
		this.board = new Board();
	}

	getBoardState = () => {
		return this.board.getBoardState();
	}

	getNumPlayers = () => {
		return Object.keys(this.players).length;
	}

	tryBuildSettlement(loc, playerID) {
		GameRules.buildSettlement(this, ...arguments);

		this.board.placeSettlement(...arguments);
	}
	// var board;
		// static tiles
		// dynamic settlements, roads, cities, robber, l army, l road, cards played, last roll
	// players
		// static id
		// dynamic resource c, dev c, v points
	toString() {
		return this.gameName;
	}
}

module.exports.Game = Game; 
