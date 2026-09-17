<script>
    import Ai2Html from '$lib/components/pageLibrary/Ai2Html.svelte';
    import Img from '$lib/components/pageLibrary/Img.svelte';

    // `blocks` now arrive from the prerendered page load, so the content is in
    // the initial HTML instead of being fetched on the client after hydration.
    const { blocks = [], pagePath } = $props();

    const assets = $state({})

    const toName = (path) => path.split('/').pop().split('.')[0]

    // Generic components are shared and lightweight — import them eagerly so they
    // render during SSR/prerender (their content ships in the static HTML).
    const genericModules = import.meta.glob('$lib/components/generic/*.svelte', { eager: true })
    const genericByName = Object.fromEntries(
        Object.entries(genericModules).map(([f, mod]) => [toName(f), mod.default])
    )

    // Page-specific components can be heavy (e.g. image galleries), so keep them
    // lazily code-split per page and hydrate them on the client after mount.
    const pageModules = import.meta.glob('$lib/pages/**/*.svelte')
    const pageLoaders = Object.entries(pageModules).filter(([f]) => f.includes(`/pages/${pagePath}/`))
    const pageComponentNames = new Set(pageLoaders.map(([f]) => toName(f)))

    const components = $state({})

    const usedPageLoaders = $derived(
        [...new Set(blocks.filter(b => b.type === 'svelte').map(b => b.value.component))]
            .map(name => pageLoaders.find(([f]) => toName(f) === name))
            .filter(Boolean)
    )

    $effect(() => {
        usedPageLoaders.forEach(([f, load]) => {
            const name = toName(f)
            if (components[name]) return
            load().then((mod) => { components[name] = mod.default })
        })
    })

    // A page-specific component (if one exists for this name) always wins; it
    // loads lazily, so it's null until mounted. Otherwise use the eager generic.
    function resolveComponent(name) {
        if (pageComponentNames.has(name)) return components[name] ?? null
        return genericByName[name] ?? null
    }

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
                {#if resolveComponent(block.value.component)}
                    <svelte:component this={resolveComponent(block.value.component)} {...componentProps(block)} />
                {/if}
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
