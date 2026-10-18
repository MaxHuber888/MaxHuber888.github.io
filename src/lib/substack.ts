import Parser from 'rss-parser';
import { site } from './config';

export type SubstackPost = {
	title: string;
	link: string;
	pubDate: string; // ISO string
	summary: string;
};

const parser = new Parser({
	headers: {
		// Substack rate-limits anonymous requests with a default UA.
		'User-Agent': 'Mozilla/5.0 (portfolio-svelte build)'
	}
});

export async function loadSubstackPosts(limit = 10): Promise<{
	posts: SubstackPost[];
	error: string | null;
}> {
	if (!site.substackFeed) {
		return { posts: [], error: null };
	}
	try {
		const feed = await parser.parseURL(site.substackFeed);
		const posts: SubstackPost[] = (feed.items ?? []).slice(0, limit).map((item) => ({
			title: item.title ?? 'Untitled',
			link: item.link ?? '',
			pubDate: item.isoDate ?? item.pubDate ?? '',
			summary: stripHtml(item.contentSnippet ?? item.content ?? '').slice(0, 280)
		}));
		return { posts, error: null };
	} catch (err) {
		return { posts: [], error: err instanceof Error ? err.message : 'Unknown feed error' };
	}
}

function stripHtml(s: string): string {
	return s
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}
