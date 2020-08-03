// this represents a corner with
// either a city or settlement
class Corner {
	static listToString(list) {
		return [...list].sort().join(';');
	}

	constructor(location, playerID, type) {
		this.location = location;
		this.playerID = playerID;
		this.type = type;
	}

	toString() {
		return Corner.listToString(this.location);
	}
}

module.exports.Corner = Corner;