<script>
    import * as cheerio from 'cheerio'; 
    
    export let slug;
    export let htmlContent;

    let htmlToRender;

    const doc = cheerio.load(htmlContent);
    doc('img').each(function() {
        const originalSrc = doc(this).attr('src');
        doc(this).attr('src', `/pages/${slug}/ai/ai2html-output/` + originalSrc);
    });
    htmlToRender = doc.html()

    function resize() {
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

    let containerWidth;

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