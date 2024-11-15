import { gDoc } from './gDoc.mjs';
import prompts from 'prompts'
import fs from 'fs'

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

async function createPage() {
    const { slug } = await prompts({
        type: 'text',
        name: 'slug',
        message: 'Enter a page slug:',
        onRender() {
            if (this.firstRender) {
                const date = new Date().toISOString().slice(0, 10) + '-';
                this.value = date;
                this.rendered = date;
                this.cursor = date.length;
            }
        }
    })

    if (!fs.existsSync(`src/lib/pages/${slug}`)) {
        console.log(`Creating directory for ${slug}`)
        fs.mkdirSync(`src/lib/pages/${slug}`);
        fs.mkdirSync(`static/pages/${slug}`);
        fs.mkdirSync(`static/pages/${slug}/ai`);
        fs.mkdirSync(`static/pages/${slug}/assets`);
    } else {
        throw new Error(`${slug} already exists`);
    }
    
    const { pageType } = await prompts({
        type: 'select',
        name: 'pageType',
        message: 'Select what type of page you want to use:',
        choices: [
            {
                title: 'gdoc',
                value: 'gdoc'
            },
            {
                title: 'standalone',
                value: 'standalone'
            },
        ]
    });

    if (pageType == 'gdoc') {
        gDoc(slug)
    }
}

createPage()