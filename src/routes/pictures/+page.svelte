<!-- <script>
    const gallery = import.meta.glob(
		'$lib/gallery/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	)

    console.log(gallery)

</script>

{#each Object.entries(gallery) as [_path, module]}
	<enhanced:img src={module} alt="some alt text" />
{/each}

testing -->

<script>
    import MyImage from '$lib/gallery/P7030785.jpeg?enhanced';
</script>

<enhanced:img src="$lib/gallery/P7030785.jpeg" />