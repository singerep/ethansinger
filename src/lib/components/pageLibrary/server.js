import { dev } from '$app/environment';
import { read } from '$app/server';
import axios from 'axios';
import fs from 'fs'
import path from 'path';

const staticFiles = import.meta.glob('../../../../static/**')

console.log(staticFiles)

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

async function loadGeneralComponentFiles(slug) {
    return fs.readdirSync(`src/lib/components/general`);
}

async function loadPageComponentFiles(slug) {
    return fs.readdirSync(`src/lib/pages/${slug}`);
}

async function loadAi2HtmlFiles(slug) {
    return fs.existsSync(`static/pages/${slug}/ai/ai2html-output`) ? fs.readdirSync(`static/pages/${slug}/ai/ai2html-output`).filter((f) => f.split('.')[1] == 'html') : [];
}

async function loadPageData(slug) {
    // fs.readFileSync(`/pages/${slug}/page.json`)
    // console.log('Current directory: ' + process.cwd());
    // console.log('Current directory: ' + path.join(process.cwd(), '/pages/2024-09-04-home/page.json'));
    // console.log(fs.readFileSync(`static/pages/2024-09-04-home/page.json`))
    // fs.readFileSync(path.join(process.cwd(), '/pages/2024-09-04-home/page.json'))
    // const page = JSON.parse(fs.readFileSync(`static/pages/${slug}/page.json`))
    // if (page.type == 'gdoc') {
    //     if (false) {
    //         const fetchedPageData = await fetchPageData(page.id)
    //         page.pageData = fetchedPageData
    //         fs.writeFileSync(`static/pages/${slug}/page.json`, JSON.stringify(page))
    //         return page
    //     }
    //     else {
    //         return page
    //     }
    // }
    // else {
    //     // idk
    // }
    return {pageType: 'gDoc', pageData: {blocks: []}}
};

export async function genericPageLoad({ params }) {
    const slug = params.slug
    const page = await loadPageData(slug)
    // const page = await {pageType: 'gDoc', pageData: {blocks: []}}
    // const generalComponentFiles = await loadGeneralComponentFiles()
    const generalComponentFiles = await []
    // const pageComponentFiles = await loadPageComponentFiles(slug)
    const pageComponentFiles = await []
    // const Ai2HtmlFiles = await loadAi2HtmlFiles(slug)
    const Ai2HtmlFiles = await []
    return {
        slug: slug,
        pageType: page.type,
        pageData: page.pageData,
        generalComponentFiles: generalComponentFiles,
        pageComponentFiles: pageComponentFiles,
        Ai2HtmlFiles: Ai2HtmlFiles
    }
}