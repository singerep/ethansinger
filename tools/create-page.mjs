import prompts from 'prompts'
import fs from 'fs'
import pkg from 'colors'

const routes = JSON.parse(fs.readFileSync('src/lib/cms/routes.json'))

async function createGdocDirectory(path) {
    fs.mkdirSync(`${path}/assets`)
    fs.mkdirSync(`${path}/assets/ai`)
    fs.writeFileSync(`${path}/blocks.json`, '[]')
}

async function createTopLevelPath() {
    const { label } = await prompts({
        type: 'text',
        name: 'label',
        message: 'enter a page label:'
    })

    return `${label}`
}

async function createProjectPath() {
    const { label } = await prompts({
        type: 'text',
        name: 'slug',
        message: 'enter a page label: ',
        onRender() {
            if (this.firstRender) {
                const date = new Date().toISOString().slice(0, 10) + '-';
                this.value = date;
                this.rendered = date;
                this.cursor = date.length;
            }
        }
    })
}

async function createCustomPath() {
    const { path } = await prompts({
        type: 'text',
        name: 'path',
        message: 'enter a custom url path:'
    })

    return `${path}`
}

const createPathMap = {
    'top level': createTopLevelPath,
    'other/custom': createCustomPath,
}

async function createPage() {
    const { pathType } = await prompts({
        type: 'select',
        name: 'pathType',
        message: 'pick a path type',
        choices: [
          { value: 'top level'},
        // will add more things like blog, project etc. here   
          { value: 'other/custom' },
        ]
    })

    const urlPath = await createPathMap[pathType]()

    if (`/${urlPath}` in routes) {
        console.log(`a route for the ${pathType} path "${urlPath}" already exists`.red)
        const { overwrite } = await prompts({
            type: 'select',
            name: 'overwrite',
            message: `do you wish to overwrite it?`,
            choices: [
              { title: 'yes', value: true},
              { title: 'no', value: false}
            ]
        })

        if (overwrite) {
            fs.rmSync(routes[`/${urlPath}`].dirPath, { force: true, recursive: true })
        }
        else {
            console.log('quitting 👋')
            return
        }
    }

    const { pathMatch } = await prompts({
        type: 'select',
        name: 'pathMatch',
        message: 'should the url path and local directory path match?',
        choices: [
            { title: 'yes', value: true},
            { title: 'no', value: false}
          ]
    })

    let dirPath;
    if (pathMatch) {
        dirPath = `src/lib/pages/${urlPath}`
    }
    else {
        const { altPath } = await prompts({
            type: 'text',
            name: 'altPath',
            message: 'enter an alternate directory path:',
            onRender() {
                if (this.firstRender) {
                    this.value = 'src/lib/pages/';
                    this.rendered = 'src/lib/pages/';
                    this.cursor = 'src/lib/pages/'.length;
                }
            }
        })
        dirPath = altPath
    }
    fs.mkdirSync(dirPath, {recursive: true})

    routes[`/${urlPath}`] = {
        dirPath: dirPath
    }

    const { pageType } = await prompts({
        type: 'select',
        name: 'pageType',
        message: 'pick a page type',
        choices: [
          { value: 'google doc'},
          { value: 'custom' }
        ]
    })

    if (pageType == 'google doc') {
        await createGdocDirectory(dirPath)
        const { gdocId } = await prompts({
            type: 'text',
            name: 'gdocId',
            message: 'enter the google doc id:'
        })
        routes[`/${urlPath}`].type = 'gdoc'
        routes[`/${urlPath}`].gdocId = gdocId
    }
    else {
        console.error('unhandled');
    }

    fs.writeFileSync('src/lib/cms/routes.json', JSON.stringify(routes))
}

createPage()