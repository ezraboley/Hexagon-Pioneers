const {locationListToString} = require('../utils.js');

class Edge {
	constructor(location, playerID) {
		this.location = location;
		this.playerID = playerID;
	}

	toString() {
		return locationListToString(this.location);
	}
}

module.exports.Edge = Edge;