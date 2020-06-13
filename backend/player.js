

let ID = 0;

class Player {
    constructor() {
        this._id = ID++;
    }
}

module.exports.Player = Player;
