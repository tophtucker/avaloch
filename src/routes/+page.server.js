import { sanity, parseGallery, parseRestaurant } from '$lib/sanity.js';

const QUERY = `{
  "mainGallery": *[_type == "gallery" && name == "Main"][0] {
    _id,
    name,
    images[] {
      image,
      caption
    }
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
	const { mainGallery, summerPopupBar, pool } = await sanity.fetch(QUERY);
	return {
		mainGallery: parseGallery(mainGallery).images.slice(0, 9),
		summerPopupBar: parseRestaurant(summerPopupBar),
		pool: parseRestaurant(pool)
	};
}
