<script>
    import GDoc2 from "../lib/components/pageLibrary/GDoc2.svelte";

    let { data } = $props();
</script>

<GDoc2 blocks={data.blocks} gdocId={data.gdocId} pagePath={data.pagePath} />

<style>

</style>
