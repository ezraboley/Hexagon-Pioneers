const {locationListToString} = require('../utils.js');

class GameRules {
	static gameName (name) {
	if (typeof name !== 'string')
		throw new Error("Game name must be a string");
	}

  static numPlayers (num) {
    if (!(2 <= num && num <= 4))
      throw new Error("Number of players must  be between 2 and 4");
  }

  static buildSettlement (game, loc, playerID) {
    testPlayerID(game.getNumPlayers(), playerID);
    testLogicalCorner(loc, game.getBoardState().tiles);
    testCornerAvailable(loc, game.getBoardState().occupiedCorners);
    //testPlayerCanCompleteAction(game);
  }
}

function testPlayerID (numPlayers, id) {
  if (!(1 <= id && id <= numPlayers))
    throw new Error(`Player id must be between 1 and ${numPlayers}`);
}

function testLogicalCorner (loc, tiles) {
  const neighboringTiles = [];
  let i = 0;
  loc.forEach(tile => {
    console.log(tile);
    console.log(tiles);
    if (tile in tiles)
      neighboringTiles[i++] = tiles[tile];
    else
      throw new Error("Invalid tile location");
  });
  // make sure the tiles are neighbors
  if (!(neighboringTiles[1] in neighboringTiles[0].neighbors &&
    neighboringTiles[2] in neighboringTiles[1].neighbors &&
    neighboringTiles[0] in neighboringTiles[2].neighbors))
    throw new Error("Selected tiles are not neighbors");
}

// function testTile (tile, boardSize) {
//   if (!((tile.x + tile.y + tile.z) == 0))
//     throw new Error("Illogical tile location");
//   Object.values(tile).forEach(val => {
//     if (!(-boardSize < val || val < boardSize))
//       throw new Error("Tile outside board");
//   });
// }

function testCornerAvailable (loc, occupiedCorners) {
  if (locationListToString(loc) in occupiedCorners) {
    throw new Error("Corner already occupied");
  }
}

module.exports.GameRules = GameRules;