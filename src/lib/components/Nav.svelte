<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { site } from '$lib/config';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { theme, toggleTheme } from '$lib/theme';
	import robotIcon from '$lib/assets/robot.png';

	const isActive = (href: string) => {
		const current = page.url.pathname.replace(/\/$/, '') || '/';
		const target = href.replace(/\/$/, '') || '/';
		return current === target;
	};
</script>

<nav class="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
	<div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
		<a
			href="{base}/"
			class="flex items-center gap-3 font-heading text-base font-semibold tracking-tight"
		>
			<img src={robotIcon} alt="" class="size-7 rounded-full" />
			{site.name}
		</a>
		<div class="flex items-center gap-1">
			<ul class="flex items-center gap-1 text-sm">
				{#each site.nav as item (item.href)}
					<li>
						<a
							href={base + item.href}
							class={cn(
								'rounded-md px-3 py-1.5 transition-colors',
								isActive(item.href)
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<Button
				variant="ghost"
				size="icon-sm"
				class="ml-1"
				onclick={toggleTheme}
				aria-label="Toggle theme"
			>
				<!-- Sun icon -->
				<svg
					class={cn('size-4', $theme === 'dark' ? 'inline' : 'hidden')}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</svg>
				<!-- Moon icon -->
				<svg
					class={cn('size-4', $theme === 'light' ? 'inline' : 'hidden')}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</svg>
			</Button>
		</div>
	</div>
</nav>
