import { loadSubstackPosts } from '$lib/substack';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return await loadSubstackPosts(10);
};
