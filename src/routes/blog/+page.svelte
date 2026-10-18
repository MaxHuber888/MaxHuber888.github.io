<script lang="ts">
	import { site } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const fmt = (iso: string) => {
		if (!iso) return '';
		const d = new Date(iso);
		if (Number.isNaN(d.getTime())) return '';
		return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
	};
</script>

<section class="space-y-8">
	<header class="space-y-2">
		<h1 class="font-heading text-3xl font-semibold tracking-tight">Blog</h1>
		<p class="text-sm text-muted-foreground">
			Recent posts from <a
				class="underline underline-offset-4 hover:text-foreground"
				href={site.links.substack}>Substack</a
			>, fetched at build time.
		</p>
	</header>

	{#if data.error}
		<div class="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
			<p class="font-medium">Couldn't load the Substack feed.</p>
			<p class="mt-1 text-xs text-muted-foreground">{data.error}</p>
		</div>
	{:else if !site.substackFeed}
		<div class="rounded-md border border-border bg-muted/40 p-4 text-sm">
			<p>
				No Substack feed configured yet. Set <code class="text-xs">PUBLIC_SUBSTACK_FEED</code>
				in your <code class="text-xs">.env</code> to a publication feed URL.
			</p>
		</div>
	{:else if data.posts.length === 0}
		<p class="text-sm text-muted-foreground">No posts yet.</p>
	{:else}
		<ul class="divide-y divide-border/60">
			{#each data.posts as post (post.link)}
				<li class="py-5 first:pt-0">
					<a
						href={post.link}
						target="_blank"
						rel="noopener noreferrer"
						class="group block space-y-2"
					>
						<div class="flex items-baseline justify-between gap-4">
							<h2 class="text-base font-medium transition-colors group-hover:text-primary">
								{post.title}
							</h2>
							<span class="shrink-0 text-xs text-muted-foreground">{fmt(post.pubDate)}</span>
						</div>
						{#if post.summary}
							<p class="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
