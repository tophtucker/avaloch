import { sanity, parseGallery } from '$lib/sanity.js';

const QUERY = `{
  "mainGallery": *[_type == "gallery" && name == "Main"][0] {
    _id,
    name,
    images[] {
      image,
      caption
    }
  }
}`;

export async function load() {
	const { mainGallery } = await sanity.fetch(QUERY);
	return {
		mainGallery: parseGallery(mainGallery).images.slice(0, 9)
	};
}
