import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { competition } from '$lib/utils/DummyData';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { slug } = params;

    const data = competition.find((item) => item.id.toString() === slug);
    if (!data) {
        throw redirect(303, '/student-competition/list/'); 
    }
    return {
        data
    };
};