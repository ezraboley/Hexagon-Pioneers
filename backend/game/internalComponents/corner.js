const {locationListToString} = require('../utils.js');
// this represents a corner with
// either a city or settlement
class Corner {
	constructor(location, playerID, type) {
		this.location = location;
		this.playerID = playerID;
		this.type = type;
	}

	toString() {
		return locationListToString(this.location);
	}
}

module.exports.Corner = Corner;