<script>
	import { onMount } from 'svelte';
    import Ai2Html from '$lib/components/pageLibrary/Ai2Html.svelte';

    export let data;
    
    $: components = {}
    $: Ai2HtmlFiles = {}

    onMount(async () => {
        await data.generalComponentFiles.forEach(async (f) => {
            const module = await import(`../../../lib/components/general/${f.split('.')[0]}.svelte`);
            components[f.split('.')[0]] = module.default;
        })

        await data.pageComponentFiles.forEach(async (f) => {
            if (data.generalComponentFiles.includes(f)) {
                console.error('Duplicate component name:', f.split('.')[0])
            }
            const module = await import(`../../../lib/pages/${data.slug}/${f.split('.')[0]}.svelte`);
            components[f.split('.')[0]] = module.default;
        })

        await data.Ai2HtmlFiles.forEach(async (f) => {
            const file = await fetch(`/pages/${data.slug}/ai/ai2html-output/${f.split('.')[0]}.html`)
            Ai2HtmlFiles[f.split('.')[0]] = await file.text()
        })
    })

    function componentProps(block) {
        const { component, ...rest } = block.value
        return rest;
    }

    function graphicProps(block) {
        var { graphic, ...rest } = block.value
        rest.slug = data.slug
        return rest
    }
</script>

<div class="page-content">
    {#if data.pageData.blocks}
        {#each data.pageData.blocks as block}
            {#if block.type == 'h2'}
                <h2 id="{block.id ?? ''}">{@html block.value}</h2>
            {:else if block.type == 'h3'}
                <h3 id="{block.id ?? ''}">{@html block.value}</h3>
            {:else if block.type == 'hr'}
                <hr>
            {:else if block.type == 'text'}
                <p>{@html block.value}</p>
            {:else if block.type == 'graphic'}
                {#if Ai2HtmlFiles[block.value.graphic]}
                    <Ai2Html htmlContent={Ai2HtmlFiles[block.value.graphic]} {...graphicProps(block)} />
                {/if}
            {:else if block.type == 'svelte'}
                <svelte:component this={components[block.value.component]} {...componentProps(block)} />
            {/if}
        {/each}
    {/if}
</div>

<style>
    div.page-content {
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
    }
</style>