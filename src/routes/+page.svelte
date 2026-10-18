<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { site } from '$lib/config';
</script>

<section class="space-y-6">
	<header class="space-y-2">
		<h1 class="font-heading text-3xl font-semibold tracking-tight">{site.name}</h1>
		<p class="text-base text-muted-foreground">{site.tagline}</p>
	</header>

	<div class="space-y-4 text-sm leading-relaxed">
		<p>
			I build machine learning systems that move beyond benchmarks and into the real world. My work
			focuses on applied AI — taking models from research to production, designing pipelines that
			are robust and maintainable, and measuring success by the problems actually solved.
		</p>
		<p>
			I care deeply about the gap between what AI systems can do in a paper and what they can do
			reliably at scale. That means thinking hard about data quality, evaluation, deployment, and
			the feedback loops between users and models.
		</p>
		<p>
			This site indexes the projects I've shipped and mirrors recent essays from my Substack, where
			I write about AI engineering, systems thinking, and whatever else captures my attention.
		</p>
	</div>

	<section class="space-y-3">
		<h2 class="font-heading text-sm font-semibold tracking-wide uppercase">Currently working on</h2>
		<ul class="space-y-2 text-sm">
			<li class="flex items-baseline gap-3">
				<Badge variant="default" class="text-[10px] uppercase">now</Badge>
				<span>This site — a Svelte rebuild with a self-documenting harness.</span>
			</li>
			<li class="flex items-baseline gap-3">
				<Badge variant="secondary" class="text-[10px] uppercase">soon</Badge>
				<span class="text-muted-foreground">Placeholder. Replace with whatever's next.</span>
			</li>
		</ul>
	</section>

	<section class="space-y-3 pt-4">
		<h2 class="font-heading text-sm font-semibold tracking-wide uppercase">Elsewhere</h2>
		<ul class="space-y-1 text-sm text-muted-foreground">
			<li>
				<a class="underline underline-offset-4 hover:text-foreground" href={site.links.github}>
					GitHub
				</a>
			</li>
			<li>
				<a class="underline underline-offset-4 hover:text-foreground" href={site.links.substack}>
					Substack
				</a>
			</li>
			<li>
				<a
					class="underline underline-offset-4 hover:text-foreground"
					href="mailto:{site.links.email}"
				>
					{site.links.email}
				</a>
			</li>
		</ul>
	</section>
</section>
