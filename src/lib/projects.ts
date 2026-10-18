import yaml from 'js-yaml';
import { z } from 'zod';
import projectsYaml from '../data/projects.yaml?raw';

export const PROJECT_COLORS = [
	'slate',
	'blue',
	'green',
	'amber',
	'red',
	'purple',
	'pink',
	'orange',
	'teal'
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];

const LinkSchema = z.object({
	label: z.string().min(1),
	href: z.string().url()
});

const ProjectSchema = z.object({
	id: z.string().regex(/^[a-z0-9-]+$/, 'id must be kebab-case (lowercase + digits + hyphens)'),
	title: z.string().min(1),
	subtitle: z.string().optional(),
	description: z.string().min(1),
	color: z.enum(PROJECT_COLORS),
	date: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'date must be in YYYY-MM-DD format'),
	status: z.enum(['active', 'shipped', 'archived', 'experiment']),
	tech: z.array(z.string()).default([]),
	links: z.array(LinkSchema).default([])
});

export type Project = z.infer<typeof ProjectSchema>;

const ProjectsSchema = z.array(ProjectSchema);

export function loadProjects(): Project[] {
	const parsed = yaml.load(projectsYaml);
	const result = ProjectsSchema.safeParse(parsed);
	if (!result.success) {
		const issues = result.error.issues
			.map((i) => `  • ${i.path.join('.') || '<root>'}: ${i.message}`)
			.join('\n');
		throw new Error(`projects.yaml failed validation:\n${issues}`);
	}
	// Sort newest first; stable within date on id for determinism.
	return [...result.data].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || a.id.localeCompare(b.id)
	);
}
