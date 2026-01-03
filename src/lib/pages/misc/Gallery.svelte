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
    const captions = {}

    imgUrls.forEach((imgUrl) => {
        const img = new Image()
        img.src = imgUrl;
        img.onload = async () => {
            const exif = await exifr.parse(img)
            exifs[imgUrl] = generateExifCaption(exif)
        }
    })

    function generateExifCaption(exif) {
        const {
            Make,
            Model,
            FocalLength,
            FNumber,
            ExposureTime,
            ISO,
            LensModel
        } = exif;

        // 1. Format Shutter Speed (e.g., 0.008 -> 1/125)
        let shutterSpeed = ExposureTime;
        if (ExposureTime && ExposureTime < 1) {
            shutterSpeed = `1/${Math.round(1 / ExposureTime)}`;
        } else if (ExposureTime >= 1) {
            shutterSpeed = `${ExposureTime}s`;
        }

        // 2. Build the parts array (filtering out missing values)
        const parts = [];

        // if (Model) parts.push(Model);
        if (FocalLength) parts.push(`${FocalLength}mm`);
        if (FNumber) parts.push(`f/${FNumber}`);
        if (shutterSpeed) parts.push(shutterSpeed);
        if (ISO) parts.push(`ISO ${ISO}`);

        // Join with a stylish separator like a middle dot or pipe
        return parts.join('  |  ');
        }

    console.log(captions);
</script>

<div id="gallery-container">
    {#each imgUrls as imageUrl}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div class="img-container" role="figure">
            <img src={imageUrl} alt="test">
            <div class="caption">
                <div class="location-time">
                    Mount Olympus, Washington | July, 2025
                </div>
                <div class="exif">
                    {exifs[imageUrl]}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    div#gallery-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    div.img-container {
        width: 100%;
        position: relative;
    }
    img {
        width: 100%;
    }
    div.caption {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    }

    div.location-time {
        font-size: 16px;
    }

    div.exif {
        font-size: 12px;
    }
</style>