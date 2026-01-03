import pkg from 'archieml'
import { dev } from '$app/environment';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import routes from '$lib/cms/routes.json'
import { error } from '@sveltejs/kit';
import { isEqual } from 'lodash-es';

const blockFiles = import.meta.glob('$lib/cms/blocks/*.json')

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


export async function GET({ url, params, locals }) {
	const gdocId = params.gdocId;
    const blockFile = join('/src', 'lib', 'cms', 'blocks', `${gdocId}.json`)

    let blocks;
    if (blockFile in blockFiles) {
        blocks = await blockFiles[blockFile]().then((mod) => {
            return mod.default
        })
    }

	if (dev) {
		// TODO: this should check if page is a gdoc first
		const document = await locals.docsClient.documents.get({
			documentId: gdocId
		});

        // console.log(document);

		const text = `[+blocks]\n${readElements(document.data)}\n[]`;
		const newBlocks = pkg.load(text).blocks

        if (!isEqual(newBlocks, blocks)) {
            console.log('writing');
            blocks = newBlocks
            writeFileSync(blockFile.slice(1), JSON.stringify(blocks))
        }
	}

	return Response.json({ blocks });
	// return {test: 5}
}