import { genericPageLoad } from '$lib/components/pageLibrary/server.js';

const slugMappings = {
    'research': '2024-09-07-research',
    'pages': '2024-09-08-projects-blog',
    'software': '2024-09-08-software'
}

export async function load({ params }) {
    params.slug = slugMappings[params.slug]
    return await genericPageLoad({params})
}