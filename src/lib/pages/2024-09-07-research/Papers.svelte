<script>
    export let papers;

    import Paper from "$lib/pages/2024-09-07-research/Paper.svelte";
</script>

<div class="paper-container">
    {#each papers as paper}
        <Paper {...paper} />
    {/each}
</div>

<style>
    div.paper-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>