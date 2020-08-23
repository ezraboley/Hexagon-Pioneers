const {coordinateToString} = require('../../utils.js');

// Data structure for cubic coordinates!
class Coordinate {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = "cube";
  }

  // Implement if needed
  convertToAxial() {
    return null;
  }

  // Implement if needed
  convertToOffset() {
    return null;
  }

  toString() {
    return coordinateToString(this);
  }

}

function equals(t, other) {
  if (t.x == other.x &&
      t.y == other.y &&
      t.z == other.z)
    return true;
  return false;
}

module.exports.Coordinate = Coordinate;
module.exports.coordEquals = equals;