<script>
    import GDoc from '$lib/components/pageLibrary/GDoc.svelte';

    export let data;
</script>

{#if data.pageType == 'gdoc'}
    <GDoc data={data} />
{/if}
