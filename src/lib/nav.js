export const BOOKING_URL = 'https://direct-book.com/properties/AvalochInndirect';
export const RESERVATIONS_URL = '#'; // 'https://tables.toasttab.com/restaurants/701827ce-60b2-4de3-a117-eeef40adcbe1/findTime';

export const nav = [
	{ title: 'Pop-Up Bar', slug: 'dining/pop-up-bar' },
	{ title: 'Gallery', slug: 'overview/gallery' },
	{ title: 'Property map', slug: 'overview/map' },
	{
		slug: 'weddings-events',
		title: 'Private events'
	},
	{
		title: 'Activities',
		slug: 'activities',
		children: [
			{ title: 'Amenities', slug: 'amenities' },
			{ title: 'Tanglewood', slug: 'tanglewood' },
			{ title: 'The Berkshires', slug: 'berkshires' },
			{ title: 'Pool', slug: 'pool' }
		]
	},
	{
		title: 'About',
		slug: 'about',
		children: [
			{ title: 'Renovations', slug: 'renovations' },
			{ title: 'History', slug: 'history' },
			{ title: 'Press', slug: 'press' },
			{ title: 'Newsletter', slug: 'newsletter' },
			{ title: 'Policies', slug: 'policies' }
		]
	}
];

// TODO — restore deeper nav when relaunching post-renovations
// const _nav = [
// 	{
// 		slug: 'overview',
// 		title: 'Overview',
// 		children: [
// 			{ title: 'Property map', slug: 'map' },
// 			{ title: 'Gallery', slug: 'gallery' },
// 			{ title: 'FAQ', slug: 'faq' }
// 		]
// 	},
// 	{
// 		slug: 'rooms',
// 		title: 'Rooms',
// 		color: 'var(--green)',
// 		children: [
// 			{ title: 'Main House', slug: 'main-house' },
// 			{ title: 'Lodge', slug: 'lodge' },
// 			{ title: 'Book a room', url: BOOKING_URL, disabled: true }
// 		]
// 	},
// 	{
// 		slug: 'dining',
// 		title: 'Dining',
// 		color: 'var(--red)',
// 		children: [
// 			{ title: 'Breakfast', slug: 'breakfast' },
// 			{ title: 'The Ostrich Room', slug: 'ostrich-room' },
// 			{ title: 'Make a reservation', url: RESERVATIONS_URL, disabled: true }
// 		]
// 	},
// 	{
// 		slug: 'music',
// 		title: 'Live music',
// 		color: 'var(--blue)'
// 	},
// 	{
// 		slug: 'weddings-events',
// 		title: 'Private events'
// 	},
// 	{
// 		slug: 'activities',
// 		title: 'Activities',
// 		color: 'var(--gold)',
// 		children: [
// 			{ title: 'Amenities', slug: 'amenities' },
// 			{ title: 'Tanglewood', slug: 'tanglewood' },
// 			{ title: 'The Berkshires', slug: 'berkshires' }
// 		]
// 	},
// 	{
// 		slug: 'about',
// 		title: 'About',
// 		footer: true,
// 		children: [
// 			{ title: 'About us', slug: 'about-us' },
// 			{ title: 'History', slug: 'history' },
// 			{ title: 'Renovations', slug: 'renovations' },
// 			{ title: 'Press', slug: 'press' },
// 			{ title: 'Newsletter', slug: 'newsletter' },
// 			{ title: 'Policies', slug: 'policies' },
// 			{ title: 'Jobs', slug: 'jobs' }
// 		]
// 	}
// ];

export const getCurrentPage = ($page) => {
	const pages = getNav($page).flatMap((section) => [
		...(section.children || []),
		{ ...section, section }
	]);
	return pages.find((d) => d.pathname === $page.url.pathname);
};

export const getNav = ($page) => {
	const clone = structuredClone(nav);
	for (const section of clone) {
		// The “overview” section homepage is just the overall homepage
		section.pathname = section.slug === 'overview' ? '/' : `/${section.slug}`;
		section.active = section.pathname === $page.url.pathname;
		if (section.children) {
			for (const page of section.children) {
				if (page.slug) {
					page.pathname = '/' + [section.slug, page.slug].join('/');
				}
				page.active = page.pathname === $page.url.pathname;
				page.section = section;
			}
		}
	}
	return clone;
};
