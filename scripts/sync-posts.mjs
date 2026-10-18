// Refresh the committed Substack snapshot. Run locally (`pnpm sync-posts`) whenever a new
// post goes live. GitHub's runners get a 403 from Substack, so the build falls back to
// src/data/substack-posts.json when the live fetch fails.
import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

const feed = process.env.PUBLIC_SUBSTACK_FEED ?? 'https://maxhuber888.substack.com/feed';
const parser = new Parser({ headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-svelte sync)' } });
const strip = (s) =>
	s
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const result = await parser.parseURL(feed);
const posts = (result.items ?? []).map((item) => ({
	title: item.title ?? 'Untitled',
	link: item.link ?? '',
	pubDate: item.isoDate ?? item.pubDate ?? '',
	summary: strip(item.contentSnippet ?? item.content ?? '').slice(0, 280)
}));
const out = { fetchedAt: new Date().toISOString(), feed, posts };
writeFileSync(
	new URL('../src/data/substack-posts.json', import.meta.url),
	JSON.stringify(out, null, '\t') + '\n'
);
console.log(`Wrote ${posts.length} posts to src/data/substack-posts.json`);
