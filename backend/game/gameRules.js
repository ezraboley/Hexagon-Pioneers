const {locationListToString, coordinateToString, objectInObjects} = require('../utils.js');
const {coordEquals} = require('./board/coordinate.js')

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

// fixme doesnt have to be just a corner
function testLogicalCorner (loc, tiles) {
  const neighboringTiles = [];
  let i = 0;
  loc.forEach(tile => {
    const tileName = coordinateToString(tile);
    if (tileName in tiles)
      neighboringTiles[i++] = tiles[tileName];
    else
      throw new Error("Invalid tile location");
  });
  // console.log(neighboringTiles[1].pos);
  // console.log(neighboringTiles[0].neighbors);
  // console.log(neighboringTiles[1].pos in neighboringTiles[0].neighbors);
  // make sure the tiles are neighbors
  // no compareTo overloading!! smh. figure out a different way
  console.log(coordEquals(neighboringTiles[1].pos, neighboringTiles[2].pos));
  // if (!(
  //   objectInObjects(neighboringTiles[1].pos, neighboringTiles[0].neighbors) &&
  //   objectInObjects(neighboringTiles[2].pos, neighboringTiles[1].neighbors) &&
  //   objectInObjects(neighboringTiles[0].pos, neighboringTiles[2].neighbors)
  //   ))
  //   throw new Error("Selected tiles are not neighbors");
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