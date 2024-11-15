import { dev } from '$app/environment';
import axios from 'axios';
import fs from 'fs'

async function fetchPageData(id) {
    let response;
    let attempts;
    while (true) {
        if (attempts < 5) {
            throw new Error('Something is wrong!')
        } 
        try {
            attempts += 1
            response = await axios.get(`http://127.0.0.1:6006/${id}`)
            return response.data
        }
        catch (error) {
            if (error.code == 'ECONNREFUSED') {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            else {
                console.error(error)
            }
        }
    }
}

async function loadComponentFiles(slug) {
    return fs.readdirSync(`src/lib/pages/${slug}`);
}

async function loadAi2HtmlFiles(slug) {
    return fs.existsSync(`static/pages/${slug}/ai/ai2html-output`) ? fs.readdirSync(`static/pages/${slug}/ai/ai2html-output`).filter((f) => f.split('.')[1] == 'html') : [];
}

async function loadPageData(slug) {
    const page = JSON.parse(fs.readFileSync(`static/pages/${slug}/page.json`))
    if (page.type == 'gdoc') {
        if (true) {
            const fetchedPageData = await fetchPageData(page.id)
            page.pageData = fetchedPageData
            fs.writeFileSync(`static/pages/${slug}/page.json`, JSON.stringify(page))
            return page
        }
        else {
            return page
        }
    }
    else {
        // idk
    }
};

export async function genericPageLoad({ params }) {
    const slug = params.slug
    const page = await loadPageData(slug)
    const componentFiles = await loadComponentFiles(slug)
    const Ai2HtmlFiles = await loadAi2HtmlFiles(slug)
    return {
        slug: slug,
        pageType: page.type,
        pageData: page.pageData,
        componentFiles: componentFiles,
        Ai2HtmlFiles: Ai2HtmlFiles
    }
}