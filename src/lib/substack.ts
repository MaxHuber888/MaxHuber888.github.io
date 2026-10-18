import Parser from 'rss-parser';
import { site } from './config';
import snapshot from '../data/substack-posts.json';

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

/**
 * Fetches the Substack RSS feed at build time. If the live fetch fails (GitHub's runners get
 * a 403 from Substack), falls back to the committed snapshot in `src/data/substack-posts.json`.
 * Refresh the snapshot locally with `pnpm sync-posts` after publishing a post.
 */
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
		const fallback = (snapshot.posts as SubstackPost[]).slice(0, limit);
		if (fallback.length > 0) {
			console.warn(`Substack feed fetch failed, using snapshot from ${snapshot.fetchedAt}`);
			return { posts: fallback, error: null };
		}
		return { posts: [], error: err instanceof Error ? err.message : 'Unknown feed error' };
	}
}

function stripHtml(s: string): string {
	return s
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}
