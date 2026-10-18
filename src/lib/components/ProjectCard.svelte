<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import type { Project, ProjectColor } from '$lib/projects';

	// Static maps so Tailwind's JIT picks up every variant. Never build class names dynamically.
	const accent: Record<ProjectColor, string> = {
		slate: 'bg-slate-500',
		blue: 'bg-blue-500',
		green: 'bg-green-500',
		amber: 'bg-amber-500',
		red: 'bg-red-500',
		purple: 'bg-purple-500',
		pink: 'bg-pink-500',
		orange: 'bg-orange-500',
		teal: 'bg-teal-500'
	};

	const wash: Record<ProjectColor, string> = {
		slate: 'hover:bg-slate-500/5',
		blue: 'hover:bg-blue-500/5',
		green: 'hover:bg-green-500/5',
		amber: 'hover:bg-amber-500/5',
		red: 'hover:bg-red-500/5',
		purple: 'hover:bg-purple-500/5',
		pink: 'hover:bg-pink-500/5',
		orange: 'hover:bg-orange-500/5',
		teal: 'hover:bg-teal-500/5'
	};

	const statusVariant: Record<
		Project['status'],
		'default' | 'secondary' | 'outline' | 'destructive'
	> = {
		active: 'default',
		shipped: 'secondary',
		experiment: 'outline',
		archived: 'outline'
	};

	let { project }: { project: Project } = $props();

	const formatDate = (dateString: string) => {
		const [year, month, day] = dateString.split('-');
		return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString(
			undefined,
			{ month: 'short', year: 'numeric' }
		);
	};
</script>

<Card.Root
	class="group relative flex h-full flex-col overflow-hidden transition-colors {wash[
		project.color
	]}"
>
	<span class="absolute inset-y-0 left-0 w-1 {accent[project.color]}"></span>
	<Card.Header>
		<div class="flex items-start justify-between gap-3">
			<div>
				<Card.Title class="text-base">{project.title}</Card.Title>
				{#if project.subtitle}
					<Card.Description class="mt-0.5 text-xs">{project.subtitle}</Card.Description>
				{/if}
			</div>
			<Badge variant={statusVariant[project.status]} class="shrink-0 text-[10px] uppercase">
				{project.status}
			</Badge>
		</div>
	</Card.Header>
	<Card.Content class="flex-grow space-y-3 text-sm">
		<p class="text-muted-foreground">{project.description}</p>
		{#if project.tech.length}
			<div class="flex flex-wrap gap-1">
				{#each project.tech as t (t)}
					<span class="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
						{t}
					</span>
				{/each}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex items-center justify-between text-xs text-muted-foreground">
		<span>{formatDate(project.date)}</span>
		{#if project.links.length}
			<div class="flex gap-2">
				{#each project.links as link (link.href)}
					<Button
						variant="outline"
						size="xs"
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
					>
						{link.label}
					</Button>
				{/each}
			</div>
		{/if}
	</Card.Footer>
</Card.Root>
