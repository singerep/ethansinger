// Prerender the home page to static HTML on the CDN — no serverless function
// and no client-side content fetch at runtime. In dev the same `/gdoc/:id`
// endpoint still runs (live Google Docs refresh + JSON rewrite); at build time
// it serves the committed JSON, which gets baked into the prerendered page.
export const prerender = true;

const gdocId = '1zC_PSiZo3XL0XUz8qwVVCbm7wIsvkKVf2B8uCwdfau8';

export async function load({ fetch }) {
    const res = await fetch(`/gdoc/${gdocId}`);
    const { blocks } = await res.json();
    return { blocks, gdocId, pagePath: 'index' };
}
