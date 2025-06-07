<script>
    import exifr from 'exifr';
    import { fade, slide } from 'svelte/transition';

    const gallery = import.meta.glob('$lib/gallery/*.(jpg|jpeg|png|gif|webp)', {
        eager: true,
        query: '?url',
        import: 'default'
    });

    const imgUrls = Object.values(gallery)
    const hovering = {}
    const showingExif = {}
    const exifs = {}

    imgUrls.forEach((imgUrl) => {
        const img = new Image()
        img.src = imgUrl;
        img.onload = async () => {
            const exif = await exifr.parse(img)
            exifs[imgUrl] = {
                make: exif.Make,
                model: exif.Model
            }
        }
    })

    // console.log(images)
</script>

<div id="gallery-container">
    {#each imgUrls as imageUrl}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div class="img-container" on:mouseover={() => hovering[imageUrl] = true} on:mouseout={() => hovering[imageUrl] = false} role="figure">
            <img src={imageUrl} alt="test">
            {#if exifs[imageUrl] && hovering[imageUrl] && showingExif[imageUrl]}
                <div class="exif" transition:fade={{duration: 100}}>
                    testing
                </div>
            {/if}
            {#if exifs[imageUrl] && hovering[imageUrl]}
                <button transition:fade={{duration: 100}} on:click={() => showingExif[imageUrl] = showingExif[imageUrl] == null ? true : !showingExif[imageUrl]} >{showingExif[imageUrl] ? "❌" : "📄"}</button>
            {/if}
        </div>
    {/each}
</div>

<style>
    div.img-container {
        width: 100%;
        position: relative;
    }
    img {
        width: 100%;
    }
    div.exif {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: 0.8;
    }
    button {
        
        width: 20px;
        height: 20px;
        position: absolute;
        right: 10px;
        bottom: 15px;
        border: none;
        /* border-radius: 50%; */
        background-color: transparent;
        /* box-sizing: border-box; */
        color: #ddd;
        cursor: pointer;
        /* line-height: 30px; */
        /* padding: 0px;
        margin: 0px; */
        padding: 0px;
        margin: 0px;
        font-size: 16px;
        text-align: center;
        vertical-align: top;
    }
</style>