export const INN_COORDINATES = { latitude: 42.35333212075441, longitude: -73.31689264984297 };

export function getPlacesFromItinerary(itinerary) {
	return Object.values(
		itinerary.body
			.flatMap((block) => block.markDefs ?? [])
			.filter((m) => m._type === 'placeReference' && m.place?.coordinates)
			.reduce((acc, m) => {
				acc[m.place._id] = m.place;
				return acc;
			}, {})
	);
}

function toRad(deg) {
	return (deg * Math.PI) / 180;
}

// Haversine distance in miles
export function distanceMiles(a, b) {
	const R = 3958.8;
	const dLat = toRad(b.latitude - a.latitude);
	const dLon = toRad(b.longitude - a.longitude);
	const sinDLat = Math.sin(dLat / 2);
	const sinDLon = Math.sin(dLon / 2);
	const h =
		sinDLat * sinDLat +
		Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * sinDLon * sinDLon;
	return R * 2 * Math.asin(Math.sqrt(h));
}

// Bearing in degrees clockwise from north (0–360)
export function bearingDeg(from, to) {
	const lat1 = toRad(from.latitude);
	const lat2 = toRad(to.latitude);
	const dLon = toRad(to.longitude - from.longitude);
	const y = Math.sin(dLon) * Math.cos(lat2);
	const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
	return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const COMPASS_POINTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export function bearingLabel(deg) {
	const i = Math.round(deg / 45) % 8;
	return COMPASS_POINTS[i];
}

export function getPlaceUrl(place) {
	return (
		place.gmaps ||
		`https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`
	);
}

export function groupPlaces(places) {
	const groups = {};
	for (const place of places) {
		const tags = place.tags?.length ? place.tags : ['Other'];
		for (const tag of tags) {
			if (!groups[tag]) groups[tag] = [];
			groups[tag].push(place);
		}
	}

	return Object.entries(groups).sort(([a], [b]) => {
		if (a === 'Other') return 1;
		if (b === 'Other') return -1;
		return a.localeCompare(b);
	});
}
