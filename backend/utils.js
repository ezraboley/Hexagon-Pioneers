exports.locationListToString = (list) => {
	const strList = [];
	list.forEach(loc => {
      strList.push(exports.coordinateToString(loc));
    });
	return [...strList].sort().join(';');
}

exports.coordinateToString = (loc) => {
	return `${loc.x},${loc.y},${loc.z}`;
}

// assume it has a equals(o)
exports.objectInObjects = (obj, objs) => {
  objs.forEach( o => {
  	console.log(o.x);
    if (o.equals(obj) == true)
    	return true;
  });
  return false;
}