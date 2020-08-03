exports.locationListToString = (list) => {
	return [...list].sort().join(';');
}