<script>
    import * as cheerio from 'cheerio'; 
	import { onMount } from 'svelte';
    
    export let graphic;
    export let pagePath;

    const htmls = import.meta.glob('$lib/pages/**/*.html', {
        query: '?raw',
        import: 'default'
    })
    const jpgs = import.meta.glob('$lib/pages/**/*.jpg', {
        query: '?url',
        import: 'default',
        eager: true
    })

    let mounted = false;
    let containerWidth;

    let htmlRaw;
    let htmlToRender;
    let doc;

    onMount(async () => {
        const key = Object.keys(htmls).find(
            (f) => f.includes(`pages/${pagePath}`) && f.endsWith(`${graphic}.html`)
        )
        const path = key.split('/').slice(0, -1).join('/')
        await htmls[key]().then((mod) => {
            htmlRaw = mod
        })

        doc = cheerio.load(htmlRaw);

        doc('img').each(function() {
            const originalSrc = doc(this).attr('src');
            doc(this).attr('src', jpgs[path + `/${originalSrc}`]);
        });
        htmlToRender = doc.html()
        mounted = true
        resize()
    })

    function resize() {
        if (!mounted) {
            return
        }
        if (containerWidth) {
            doc('div .g-artboard').each(function() {
                const minWidth = parseInt(doc(this).attr('data-min-width'));
                const maxWidth = parseInt(doc(this).attr('data-max-width'));

                const existingStyles = doc(this).attr('style').split(';').filter((s) => s != '' && !s.includes('display'))
                const newStyles = `${existingStyles.join(';')};display: ${((containerWidth >= minWidth) && (containerWidth <= maxWidth)) || ((containerWidth >= minWidth) && !maxWidth) ? 'block' : 'none'};`
                doc(this).attr('style', newStyles)
            });
            htmlToRender = doc.html()
        }
    }

    $: containerWidth, resize()

</script>

<div class="graphic-container" bind:clientWidth={containerWidth}>
    {@html htmlToRender}
</div>

<style>
    div.graphic-container {
        width: 100%;
    }
</style>