<script>
    export let hed;
    export let subhed;
    export let entries;
    export let id;

    import Entry from "$lib/components/general/Entry.svelte";
</script>


<div class="entries-container" id="{id ?? ''}">
    {#if hed}
        <h2>{@html hed}</h2>
    {/if}
    {#if subhed}
        <h3>{@html subhed}</h3>
    {/if}
    <div class="entries">
        {#each entries as entry}
            <Entry props={entry} />
        {/each}
    </div>
</div>

<style>
    div.entries {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }

    h2 :global(a) {
        color: black!important;
    }

    div.entries-container:last-child {
        margin-bottom: 0px;
    }
</style>