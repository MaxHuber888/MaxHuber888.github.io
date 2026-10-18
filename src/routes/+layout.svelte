<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';
	import { site } from '$lib/config';
	import { base } from '$app/paths';
	import { theme } from '$lib/theme';

	let { children } = $props();
</script>

<svelte:head>
	<script>
		(function () {
			var stored = localStorage.getItem('theme');
			if (!stored) {
				stored = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}
			if (stored === 'dark') {
				document.documentElement.classList.add('dark');
			}
		})();
	</script>

	<link rel="icon" href="{base}/favicon.ico" />
	<title>{site.name}</title>
	<meta name="description" content={site.description} />

	<!-- Open Graph -->
	<meta property="og:title" content={site.name} />
	<meta property="og:description" content={site.description} />
	<meta property="og:image" content="{site.url}{base}/og.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={site.name} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content="{site.url}{base}/og.png" />
</svelte:head>

<div class="min-h-screen text-foreground">
	{#if $theme === 'dark'}
		<div class="bg-dark fixed inset-0 -z-10"></div>
	{:else}
		<div class="bg-light fixed inset-0 -z-10"></div>
	{/if}
	<Nav />
	<main class="mx-auto max-w-3xl px-6 py-12">
		{@render children()}
	</main>
	<footer class="mt-16 border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
		<div class="mx-auto max-w-3xl px-6">
			© {new Date().getFullYear()}
			{site.author}
		</div>
	</footer>
</div>
