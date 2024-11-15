<script>
    export let title;
    export let year;
    export let authors;
    export let link;
</script>

<div class="paper">
    <span class="title">
        {#if link}
            <a href="{link}">{title}</a>
        {:else}
            {title}
        {/if}
    </span> 
    <span class="year">({year})</span><br>
    <span class="authors">With {authors}</span>
</div>

<style>
    div.paper {
        text-align: left;
    }

    a {
        color: black!important;;
    }

    span.title {
        font-weight: bold;
    }

    span.authors {
        color: #777;
    }
</style>