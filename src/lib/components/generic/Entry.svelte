<script>
    export let props;
</script>

<div class="entry">
    <div class="hed">
        <span class="title">{@html props.title}</span>
        {#if props.year}
            <span class="year">({props.year})</span><br>
        {/if}
    </div>
    {#if props.byline}
        <div class="byline">
            <span class="byline">{@html props.byline}</span>
        </div>
    {/if}
    {#if props.description}
        <div class="description">
            <span class="description">{@html props.description}</span>
        </div>
    {/if}
    {#if props.other}
    <div class="other">
        {#each props.other as other}
           <span class="other">
            {#if other.link}
                <a href="{other.link}">{@html other.text}</a>
            {:else}
                {@html other.text}
            {/if}
           </span>
        {/each}
    </div>
    {/if}
</div>

<style>
    div.entry {
        text-align: left;
    }

    span.title {
        font-weight: bold;
        font-size: 17px;
    }

    span.title :global(a) {
        color: black!important;
    }

    div.byline {
        margin-top: 2px;
    }

    span.byline, span.byline :global(a) {
        color: #777;
    }

    div.description {
        margin-top: 5px;
    }

    span.description, span.description :global(a) {
        color: black!important;
    }

    span.other, span.other :global(a) {
        color: #777;
        font-weight: 400;
        font-size: 13px;
        /* text-decoration: none; */
    }
</style>