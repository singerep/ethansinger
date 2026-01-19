<script>
    const imageModules = import.meta.glob('/src/lib/pages/photos/images/*.jpg', {
        query: { enhanced: true },
        eager: true
    });

    const images = {
        "P1192358": {
            location: "Cambridge, MA", // winter tree
            date: "January 2026"
        },
        "P1192340": {
            location: "Cambridge, MA", // winter lake
            date: "January 2026"
        },
        "PB112174": {
            location: "Cambridge, MA", // fall trees
            date: "November 2025"
        },
        "PA171700": {
            location: "Bethlehem, NH", // merline bird ID
            date: "October 2025"
        },
        "PA171707": {
            location: "Bethlehem, NH", // fall tree
            date: "October 2025"
        },
        "PA171711": {
            location: "Sugar Hill, NH", // pollys pancake parlor
            date: "October 2025"
        },
        "PA182045": {
            location: "Bethlehem, NH", // no kings
            date: "October 2025"
        },
        "P7030644": {
            location: "Mt. Rainier, WA", // mountain through trees
            date: "July 2025"
        },
        "P7030662": {
            location: "Mt. Rainier, WA", // mountain from ridge
            date: "July 2025"
        },
        "P7040843": {
            location: "Mt. Rainier, WA", // mountain + lake
            date: "July 2025"
        },
        "P7050882": {
            location: "Seattle, WA", // mountain + needle
            date: "July 2025"
        },
        "P7070898": {
            location: "Hurrican Ridge, WA", // mountain range
            date: "July 2025"
        },
        "P7070898": {
            location: "Hurrican Ridge, WA", // deer
            date: "July 2025"
        },
        "P7071012": {
            location: "Lake Crescent, WA", // kayak
            date: "July 2025"
        },
        "P7070898": {
            location: "Hoh Rain Forest, WA", // mossy tree
            date: "July 2025"
        },
        "P7221525": {
            location: "Grand Marais, MN", // lake
            date: "July 2025"
        },
        "PC130379": {
            location: "New York, NY", // squirrel
            date: "December 2024"
        },
        "PC130384": {
            location: "New York, NY", // building
            date: "December 2024"
        },
    }

</script>

<div id="gallery">
    {#each Object.entries(images) as [imageKey, imageInfo]}
        <div class="entry">
            <div class="image">
                <enhanced:img src={imageModules[`/src/lib/pages/photos/images/${imageKey}.jpg`].default} alt={`Picture taken in ${imageInfo.location}`} />
            </div>
            <div class="caption">
                {imageInfo.location} · {imageInfo.date}
            </div>
        </div>
    {/each}
</div>

<style>
    div#gallery {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }

    div.entry {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        font-size: 14px;
    }

    :global(picture img) {
        width: 100%;
        /* max-width: 100%; */
        height: auto;
        display: block;
    }
</style>