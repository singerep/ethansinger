import prompts from 'prompts'
import fs from 'fs'
import pkg from 'colors'

const routes = JSON.parse(fs.readFileSync('src/lib/cms/routes.json'))

async function deletePage() {
    const pages = Object.keys(routes)
        .sort((a, b) => {
            const na = a.split('/').length
            const nb = b.split('/').length
            if (na < nb) return -1
            if (nb < na) return 1
            if (a < b) return -1
            if (b < a) return 1
            return 0
        })

    // TODO: add search
    const { page } = await prompts({
        type: 'select',
        name: 'page',
        message: 'pick a page to delete',
        choices: pages.map(p => ({'value': p}))
    })

    const { confirm } = await prompts({
        type: 'select',
        name: 'confirm',
        message: `are you sure you want to delete ${page}?`,
        choices: [
            {title: 'yes', value: true},
            {title: 'no', value: false},
        ]
    })

    if (confirm) {
        fs.rmSync(routes[page].dirPath, {force: true, recursive: true})
        delete routes[page]
        fs.writeFileSync('src/lib/cms/routes.json', JSON.stringify(routes))
    }
}

deletePage()