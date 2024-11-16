<script>
    export let works;

    import ListEntry from "$lib/components/pageLibrary/ListEntry.svelte";
</script>

<div class="work-container">
    {#each works as w}
        <ListEntry {...w} />
    {/each}
</div>

<style>
    div.work-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>