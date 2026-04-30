import { sanity } from '$lib/sanity.js';

const ITINERARY_QUERY = `*[_type == "itinerary"] {
  title,
  body[] {
      ...,
      markDefs[] {
        ...,
        "place": place-> { _id, name, address, gmaps, website, coordinates }
      }
    }
}
`;

const PLACES_QUERY = `*[_type == "place"] | order(name asc) {
  _id,
  name,
  address,
  gmaps,
  website,
  coordinates,
  description,
  tags
}
`;

export async function load() {
	const [itineraries, places] = await Promise.all([
		sanity.fetch(ITINERARY_QUERY),
		sanity.fetch(PLACES_QUERY)
	]);
	return {
		itineraries,
		places
	};
}
