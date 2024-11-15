import { genericPageLoad } from '$lib/components/pageLibrary/server.js';

export async function load({ params }) {
    params.slug = '2024-09-04-home'
    return await genericPageLoad({params})
}