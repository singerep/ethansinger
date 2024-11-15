import { genericPageLoad } from '$lib/components/pageLibrary/server.js';

export async function load({ params }) {
    return await genericPageLoad({params})
}