<script>
    export let softwares;

    import Software from "$lib/pages/2024-09-08-software/Software.svelte";
</script>

<div class="software-container">
    {#each softwares as software}
        <Software {...software} />
    {/each}
</div>

<style>
    div.software-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>