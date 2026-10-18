import { env } from '$env/dynamic/public';

export const site = {
	name: 'Max Huber',
	tagline:
		'AI/ML engineer focused on building systems with clear, tangible, and positive real-world impact.',
	description: 'Personal site, project index, and links to recent writing.',
	author: 'Max Huber',
	url: 'https://maxhuber888.github.io',
	links: {
		github: 'https://github.com/MaxHuber888',
		substack: 'https://substack.com/@maxhuber888',
		email: 'huber.max888@gmail.com'
	},
	substackFeed: env.PUBLIC_SUBSTACK_FEED ?? '',
	nav: [
		{ href: '/', label: 'About' },
		{ href: '/projects/', label: 'Projects' },
		{ href: '/blog/', label: 'Blog' }
	]
} as const;
