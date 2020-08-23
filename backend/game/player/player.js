const {config} = require('../../config.js');

class Player {
	constructor(id) {
		this._id = id;
		this._hand = {};
		this._hand[config.ORE] = 0;
		this._hand[config.WOOD] = 0;
		this._hand[config.BRICK] = 0;
		this._hand[config.WHEAT] = 0;
		this._hand[config.WOOL] = 0;
	}

	getPlayerState = () => {
    const playerCopy = {
      id: JSON.parse(JSON.stringify(this._id)),
      hand: JSON.parse(JSON.stringify(this._hand))
    };
    return playerCopy;
  }

  takeResource = (type, num) => {
  	this._hand[type] += num;
  }
}

module.exports.Player = Player;