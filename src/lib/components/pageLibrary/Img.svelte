<script>
	import { onMount } from "svelte";

    export let src;
    export let alt;
    export let caption;
    export let maxWidth = 600;

    let innerWidth;

    let width;

    function resize() {
        if (innerWidth <= 600) {
            width = '100%'
        }
        else {
            width = maxWidth + 'px'
        }
    }

    $: innerWidth, resize()
</script>

<svelte:window bind:innerWidth />

<div class="img-container" style="width: 100%">
    <img src="{src}" alt="{alt}">
    {#if caption}
        <div class="caption">
            {@html caption}
        </div>
    {/if}
</div>

<style>
    div.img-container {
        margin-left: 50%;
        transform: translateX(-50%);
        position: relative;
    }
    img {
        width: 100%;
    }

    div.caption {
        font-size: 12px;
        color: #777;
    }
</style>