import prompts from 'prompts'
import axios from 'axios';
import fs from 'fs'
import { exec } from 'child_process'

const delay = ms => new Promise(res => setTimeout(res, ms));

export async function getPageData(id) {
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
                throw new Error(error)
            }
        }
    }
}

export async function gDoc(slug) {
    const { gDocID } = await prompts({
        type: 'text',
        name: 'gDocID',
        message: 'Enter your Google Doc ID:',
    })

    try {
        const page = {
            "slug": slug,
            "type": "gdoc",
            "id": gDocID,
            "pageData": []
        }

        fs.writeFileSync(`static/pages/${slug}/page.json`, JSON.stringify(page))
    }
    catch (error) {
        console.log('Exited with error:', error)
    }
}