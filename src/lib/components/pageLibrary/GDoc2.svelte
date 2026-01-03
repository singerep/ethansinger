<script>
	import { onMount } from 'svelte';
    import Ai2Html from '$lib/components/pageLibrary/Ai2Html.svelte';
    import Img from '$lib/components/pageLibrary/Img.svelte';

    const { gdocId, pagePath } = $props();

    let blocks = $state([])
    const components = $state({})
    const assets = $state({})

    onMount(async () => {
        const gdoc = await fetch(`/gdoc/${gdocId}`);
        const gdocJson = await gdoc.json()
        blocks = gdocJson.blocks;
    })

    const genericComponents = Object.entries(import.meta.glob('$lib/components/generic/*.svelte'))
    const pageComponents = Object.entries(
        import.meta.glob('$lib/pages/**/*.svelte')
    ).filter(f => f[0].includes(`pages/${pagePath}`))
    
    const usedComponents = $derived(
        Object.fromEntries(
            [...new Set(blocks.filter(b => b.type == 'svelte').map(b => b.value.component))].map(c => 
                pageComponents.find(([f, load]) => f.split('/').pop().split('.')[0] == c) ?? // preference for page specific components
                genericComponents.find(([f, load]) => f.split('/').pop().split('.')[0] == c) ??
                null
            )
        )
    )

    $effect(() => {
        Object.entries(usedComponents).forEach(async ([f, load]) => {
            const name = f.split('/').pop().split('.')[0]
            load().then((mod) => {
                components[name] = mod.default
            })
        })

        // await data.assets.forEach(async (f) => {
    //     //     // should check for duplicate names here
    //     //     const name = f.split('/').pop().split('.')[0]
    //     //     const url = f.split('static').pop()
    //     //     if (name in assets) {
    //     //         console.error('Duplicate asset name:', name)
    //     //     }
    //     //     assets[name] = url
    //     // })
    })

    function componentProps(block) {
        const { component, ...rest } = block.value
        return rest;
    }

    function imgProps(block) {
        var { media, ...rest } = block.value
        rest.slug = data.slug
        return rest
    }
</script>

<div class="page-content">
    {#if blocks}
        {#each blocks as block}
            {#if block.type == 'h2'}
                <h2 id="{block.id ?? ''}">{@html block.value}</h2>
            {:else if block.type == 'h3'}
                <h3 id="{block.id ?? ''}">{@html block.value}</h3>
            {:else if block.type == 'hr'}
                <hr>
            {:else if block.type == 'text'}
                <p>{@html block.value}</p>
            {:else if block.type == 'graphic'}
                <Ai2Html graphic={block.value.graphic} pagePath={pagePath} />
            {:else if block.type == 'img'}
                {#if assets[block.value.media]}
                    <Img src={assets[block.value.media]} {...imgProps(block)} />
                {/if}
            {:else if block.type == 'svelte'}
                <svelte:component this={components[block.value.component]} {...componentProps(block)} />
            {/if}
        {/each}
    {/if}
</div>

<style>
    /* div.page-content {
        width: 100%;
        text-align: justify;
        line-height: calc(100% + 4px);
    }

    div.page-content :global(a) {
        color: var(--slate);
    }

    h2 :global(a) {
        color: black!important;
    }

    hr {
        background-color: rgb(237, 237, 237);
        border: none;
        height: 1.5px;
    } */
</style>