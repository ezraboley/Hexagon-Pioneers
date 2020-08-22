// returns the arguments or throws an error
class Validate {
	static gameName (name) {
	if (typeof name !== 'string')
		throw new Error("Game name must be a string");
	}

  static numPlayers (num) {
    if (!(2 <= num && num <= 4))
      throw new Error("Number of players must  be between 2 and 4");
  }

  static buildSettlement (game, loc, playerID) {
    testPlayerID(game.numPlayers, playerID);
    testLogicalCorner(loc, game.board.size);
    //testCornerAvailable(loc, game.board.size);
    //testPlayerCanCompleteAction(game.)
  }
}

function testPlayerID (numPlayers, id) {
  if (!(1 <= id && id <= numPlayers))
    throw new Error("Player id must be between 1 and ${numPlayers}");
}

function testLogicalCorner (loc, boardSize) {
  loc.forEach(tile => {
    this.testTile(tile, boardSize);
  });
}

function testTile (tile, boardSize) {
  if (!((tile.x + tile.y + tile.z) == 0))
    throw new Error("Illogical tile location");
  Object.values(tile).forEach(val => {
    if (!(-boardSize < val || val < boardSize))
      throw new Error("Tile outside board");
  });
}

//function testCornerAvailable ()

module.exports.Validate = Validate;