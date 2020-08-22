exports.locationListToString = (list) => {
	const strList = [];
	list.forEach(loc => {
      strList.push(`${loc.x},${loc.y},${loc.z}`);
    });
	return [...strList].sort().join(';');
}