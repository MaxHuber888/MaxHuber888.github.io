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
			I am an AI/ML engineer focused on building systems with clear real-world impact. My work is
			guided by a simple principle: effective technology should solve hard problems and make
			people's lives tangibly better.
		</p>
		<p>
			I recently completed a Master's degree in AI at Northeastern University, where I also did
			computational neuroscience research at the Movement Neuroscience Lab, modeling muscle
			synergies with network-theoretic methods to improve stroke recovery outcomes. Before that I
			built an open-source LLM agent framework at Blorm, an LLM-powered RAG chatbot and ETL
			pipelines as a full-stack co-op at CollX, and NLP and network analysis tooling as a research
			assistant at the Business &amp; Collective Intelligence Lab.
		</p>
		<p>
			This site indexes the projects I've built and mirrors recent write-ups from my Substack, where
			I walk through my deep learning projects in detail.
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
				<span class="text-muted-foreground">Writing up recent projects as Substack posts.</span>
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
