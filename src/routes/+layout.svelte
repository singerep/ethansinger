<script>
    import '../styles/app.css'
    import { dev } from '$app/environment';

    import { injectAnalytics } from '@vercel/analytics/sveltekit'

    import Navbar from '$lib/components/navbar/Navbar.svelte'
    import Footer from '$lib/components/footer/Footer.svelte'

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    function handleError() {
        console.log('here')
    }
</script>

<svelte:window on:error={handleError}/>


<div class="root">
    <Navbar />
    <div class="main-content">
        <slot></slot>
    </div>
    <Footer />
</div>


<style>
    div.root {
        width: 100%;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    div.main-content {
        width: 100%;
        max-width: var(--body-width);
        padding: 20px;
        padding-top: 80px;
        margin: auto;
        box-sizing: border-box;
        position: relative;
        flex: 1 0 auto;
    }
</style>