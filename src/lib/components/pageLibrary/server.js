import { dev } from '$app/environment';
import { read } from '$app/server';
import axios from 'axios';
import fs from 'fs'
import path from 'path';

const staticFiles = import.meta.glob('../../../../static/pages/**/*.json')
const pageComponentFiles = import.meta.glob('../../pages/**/*.svelte')
const generalComponentFiles = import.meta.glob('../general/*.svelte')
const assetFiles = import.meta.glob('../../../../static/pages/*/assets/**/*')

const supportAssetTypes = ['html', 'jpeg', 'jpg', 'png']

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

async function loadGeneralComponentFiles() {
    return Object.keys(generalComponentFiles)
}

async function loadPageComponentFiles(slug) {
    return Object.keys(pageComponentFiles).filter((f) => f.includes(slug))
}

async function loadAssetFiles(slug) {
    return Object.keys(assetFiles).filter((f) => f.includes(slug) & supportAssetTypes.some((t) => f.includes('.' + t)))
}

async function loadPageData(slug) {
    return staticFiles[`../../../../static/pages/${slug}/page.json`]().then(async (module) => {
        const page = module.default
        if (page.type == 'gdoc') {
            if (dev) {
                const fetchedPageData = await fetchPageData(page.id)
                if (JSON.stringify(page.pageData) != JSON.stringify(fetchedPageData)) {
                    page.pageData = fetchedPageData
                    fs.writeFileSync(`static/pages/${slug}/page.json`, JSON.stringify(page))
                }
                return page
            }
            else {
                return page
            }
        }
        else {
            // idk
        }
    })
};

export async function genericPageLoad({ params }) {
    const slug = params.slug
    const page = await loadPageData(slug)
    const generalComponentFiles = await loadGeneralComponentFiles()
    const pageComponentFiles = await loadPageComponentFiles(slug)
    const assetFiles = await loadAssetFiles(slug)
    return {
        slug: slug,
        pageType: page.type,
        pageData: page.pageData,
        generalComponentFiles: generalComponentFiles,
        pageComponentFiles: pageComponentFiles,
        assetFiles: assetFiles
    }
}