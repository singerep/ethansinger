<script>
	import { slide } from "svelte/transition";

    let { name, date, description, thumbnail, children } = $props()

    let isOpen = $state(false)
</script>

<div class="project">
    <div class="title-block">
        <div class="title">
            {name}
        </div>
        <div class="date">
            {date}
        </div>
        <div class="description">
            {description}
        </div>
    </div>
    <div class="thumbnail">
        <enhanced:img src={thumbnail} alt="{name}" />
    </div>
    {#if isOpen}
        <div class="content">
            {@render children()}
        </div>
    {/if}
</div>

<button onclick={isOpen = !isOpen}>see {isOpen ? 'less' : 'more'}</button>

<style>
    div.title-block {
        margin-bottom: 10px;
    }

    div.title {
        font-size: 30px;
        font-weight: 700;
    }

    div.project :global(img) {
        width: 100%;
        padding: 4px 0px 4px;
    }

    button {
        background-color: transparent;
        border: none;
        padding: 0px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        text-decoration: underline;
        color: black !important;
    }
</style>