class Player {
	constructor(id) {
		this.id = id;
		this.resources = {
			ore: 0,
			wood: 0,
			brick: 0,
			wheat: 0,
			wool: 0
		}
	}
}

module.exports.Player = Player;