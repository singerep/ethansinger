import { page } from '$app/stores'; 
import pkg from 'archieml'
import { dev } from '$app/environment';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import routes from '$lib/cms/routes.json'
import { error } from '@sveltejs/kit';

const blockFiles = import.meta.glob('$lib/pages/**/blocks.json')

function readParagraphElement(element) {
    const textRun = element.textRun;

    if (textRun) {
        var content = textRun.content || '';

        if (!textRun.textStyle) return content;

        if (textRun.textStyle.italic) {
            content = content.replace(/([^\n]+)(\n)?/,'<i>$1</i>$2');
        }

        if (textRun.textStyle.bold) {
            content = content.replace(/([^\n]+)(\n)?/,'<b>$1</b>$2');
        }

        if (!textRun.textStyle.link) return content;
        if (!textRun.textStyle.link.url) return content;

        const url = textRun.textStyle.link.url;

        if (url) {
            return `<a href="${url}">${content}</a>`;
        } else {
            return content;
        }
    } else {
        return '';
    }
}

function readElements(document) {
    let text = '';

    if (!document.body) return text;
    if (!document.body.content) return text;

    document.body.content.forEach(element => {
        if (element.paragraph) {
            const paragraph = element.paragraph;

            const needsBullet = paragraph.bullet != null;

            if (paragraph.elements) {
                const values = paragraph.elements;

                values.forEach((value, idx) => {
                    const isFirstValue = idx === 0;

                    const prefix = needsBullet && isFirstValue ? '* ' : '';

                    text += `${prefix}${readParagraphElement(value)}`;
                });
            }
        }
    });
    return text;
}

export async function load({ url, route, params, locals }) {
    if (!(`/${params.path}` in routes)) {
        throw error(404, 'Page not found');
    }

    const pagePathParts = params.path.split('/').map(p => p == '' ? 'index' : p)
    let blocks;

    if (dev) {
        // TODO: this should check if page is a gdoc first
        const documentId = routes[`/${params.path}`].gdocId
        const document = await locals.docsClient.documents.get({
            documentId
        });

        const text = `[+blocks]\n${readElements(document.data)}\n[]`;
        blocks = pkg.load(text).blocks

        const path = join('src', 'lib', 'pages', ...pagePathParts)
        if (!existsSync(path)) {
            mkdirSync(path, {recursive: true})
        }

        // only should do this if it has changed
        writeFileSync(join(path, 'blocks.json'), JSON.stringify(blocks))
    }
    else {
        const path = Object.keys(blockFiles).find(f => f.includes(`pages/${pagePathParts.join('/')}`))
        blocks = await blockFiles[path]().then((mod) => {
            return mod.default
        })
    }

    return {
        'blocks': blocks,
        'pagePath': params.path
    }
}