<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="space-y-8">
	<header class="space-y-2">
		<h1 class="font-heading text-3xl font-semibold tracking-tight">Projects</h1>
		<p class="text-sm text-muted-foreground">Things I've built, in various states of completion.</p>
	</header>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each data.projects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>
