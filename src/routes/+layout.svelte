<script>
    import '../styles/app.css'

    import Navbar from '$lib/components/navbar/Navbar.svelte'
    import Footer from '$lib/components/footer/Footer.svelte'

    function handleError() {
        console.log('here')
    }
</script>

<svelte:window on:error={handleError}/>

<Navbar />

<div class="root">
    <div class="main-content">
        <slot></slot>
    </div>
</div>

<Footer />

<style>
    div.root {
        width: 100%;
        min-height: calc(100vh - 190px);
    }
    div.main-content {
        width: 100%;
        max-width: var(--body-width);
        padding: 20px;
        margin: auto;
        box-sizing: border-box;
        position: relative;
    }
</style>