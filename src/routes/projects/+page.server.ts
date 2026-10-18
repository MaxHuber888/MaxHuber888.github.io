import { loadProjects } from '$lib/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { projects: loadProjects() };
};
