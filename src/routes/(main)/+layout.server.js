import { sanity, parsePerformance, parseBulletin, parseRestaurant } from '$lib/sanity.js';

// TODO: bang on this logic for when there's no listed end time; see also music/+page.svelte
const QUERY = `{
  "nextPerformance": *[_type == "performance" && (endTime > now() || (!endTime && startTime > now()))] | order(startTime asc) [0] {
    _id,
    startTime,
    endTime,
    noTime,
    note,
    act->{
      _id,
      name,
      genre,
      description,
      image,
      youtube
    }
  },
  "bulletins": *[_type == "bulletin" && startTime < now() && endTime > now()] | order(startTime desc) {
    _id,
    startTime,
    text,
    details,
    urgent
  },
  "ostrichRoom": *[_type == "restaurant" && name == "The Ostrich Room"][0] {
    hours,
    hourOverrides,
    "menus": menus[]{ name, "url": asset->url }
  },
  "summerPopupBar": *[_type == "restaurant" && name == "Summer Pop-up Bar"][0] {
    hours,
    hourOverrides,
    startDate,
    endDate,
    "menus": menus[]{ name, "url": asset->url }
  },
  "pool": *[_type == "restaurant" && name == "Pool"][0] {
    hours,
    hourOverrides,
    startDate,
    endDate,
    "menus": menus[]{ name, "url": asset->url }
  }
}`;

export async function load() {
	const { nextPerformance, bulletins, ostrichRoom, summerPopupBar, pool } =
		await sanity.fetch(QUERY);
	return {
		nextPerformance: parsePerformance(nextPerformance),
		bulletins: bulletins.map(parseBulletin),
		ostrichRoom: parseRestaurant(ostrichRoom),
		summerPopupBar: parseRestaurant(summerPopupBar),
		pool: parseRestaurant(pool)
	};
}
