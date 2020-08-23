const {locationListToString, coordinateToString, objectInObjects} = require('../utils.js');

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
    testLogicalPosition(loc, game.getBoardState().tiles);
    testCornerAvailable(loc, game.getBoardState().occupiedCorners);
    // testPlayerCanCompleteAction(cost, game.getPlayer(playerID).hand);
    const hand = game.getPlayerState(playerID).hand;
    if (hand.wood < 1 && hand.brick < 1 && hand.wheat < 1 && hand.wool < 1)
      throw new Error ("Player does not have the resources");
  }
}

function testPlayerID (numPlayers, id) {
  if (!(1 <= id && id <= numPlayers))
    throw new Error(`Player id must be between 1 and ${numPlayers}`);
}

function testLogicalPosition (loc, tiles) {
  const neighboringTiles = [];
  let i = 0;
  loc.forEach(tile => {
    const tileName = coordinateToString(tile);
    if (tileName in tiles)
      neighboringTiles[i++] = tiles[tileName];
    else
      throw new Error("Invalid tile location");
  });
  for (i=0; i<neighboringTiles.length; i++) {
    let posString = coordinateToString(neighboringTiles[(i+1)%neighboringTiles.length].pos);
    if (!posStringInNeighbors(posString, neighboringTiles[i].neighbors))
      throw new Error("Tiles are not next to each other");
  }
}

function posStringInNeighbors(posString, neighbors) {
  for (i=0;i<neighbors.length;i++) {
    if (posString === neighbors[i])
      return true;
  }
  return false;
}

function testCornerAvailable (loc, occupiedCorners) {
  if (locationListToString(loc) in occupiedCorners) {
    throw new Error("Corner already occupied");
  }
}

module.exports.GameRules = GameRules;