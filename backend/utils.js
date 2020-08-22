exports.locationListToString = (list) => {
	const strList = [];
	list.forEach(loc => {
      strList.push(coordinateToString(loc));
    });
	return [...strList].sort().join(';');
}

exports.coordinateToString = (loc) => {
	return `${loc.x},${loc.y},${loc.z}`;
}